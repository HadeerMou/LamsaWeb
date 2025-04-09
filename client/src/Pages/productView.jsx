import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../TranslationContext";
import Footer from "../Components/footer";
import Header from "../Components/header";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductView({
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
  showProducts,
  addToCart,
  totalQuantity,
}) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations } = useTranslation();
  const location = useLocation();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [productImages, setProductImages] = useState([]);
  const [bigImage, setBigImage] = useState("");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null); // Track hovered product ID

  // State for tracking touch start and end positions
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Function to render product cards
  const renderProductCard = (product) => {
    // Find the default image if available, otherwise use the first image
    const defaultImage = product.productImages?.find((img) => img.isDefault);
    const imagePath = defaultImage
      ? defaultImage.imagePath
      : product.productImages?.[0]?.imagePath;

    // Construct the full URL for the image
    const images =
      product.productImages?.length > 0
        ? product.productImages.map((img) => `https://${img.imagePath}`) // Ensure proper formatting
        : ["/path/to/default/image.jpg"];

    return (
      <Link to={`/product/${product.id}`} key={product.id}>
        <div className="rproduct flex-shrink-0 w-[300px] snap-start p-4">
          <div className="img">
            <img
              src={
                hoveredProduct === product.id && images.length > 1
                  ? images[1]
                  : images[0]
              }
              alt={product.name}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="content max-w-[250px] mx-auto mt-2">
            <h4 className="font-bold text-lg">{product.name}</h4>
            <p className="desc text-sm text-gray-600 max-w-[150px]">
              {product.description}
            </p>
            <p className="price text-red-500 font-bold mt-2">
              {product.price} EGP
            </p>
            <div className="productIcon bg-gray-700 text-white rounded-full p-2 mt-2 mx-auto">
              <i
                className="bi bi-cart-plus text-lg"
                onClick={() => addToCart(product)}
              ></i>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching product details for ID:", productId);

        const productResponse = await axios.get(
          `${API_BASE_URL}/products/${productId}`
        );
        console.log("Full API Response:", productResponse.data);

        if (
          !productResponse.data ||
          Object.keys(productResponse.data).length === 0
        ) {
          throw new Error("Invalid product data");
        }

        setProduct(productResponse.data);

        // Fetch related products by category only after setting the product
        await fetchRelatedProducts(productResponse.data.categoryId);
        await fetchRecommendedProducts();
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedProducts = async (categoryId) => {
      try {
        const relatedResponse = await axios.get(
          `${API_BASE_URL}/category/${categoryId}`
        );

        // Fetch product details for each related product to get images
        const relatedProductsWithImages = await Promise.all(
          relatedResponse.data.products.map(async (product) => {
            const productDetails = await axios.get(
              `${API_BASE_URL}/products/${product.id}`
            );
            return productDetails.data;
          })
        );

        setRelatedProducts(relatedProductsWithImages);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    const fetchRecommendedProducts = async () => {
      try {
        const allProductsResponse = await axios.get(`${API_BASE_URL}/products`);
        const allProducts = allProductsResponse.data;

        if (!Array.isArray(allProducts) || allProducts.length === 0) {
          throw new Error("No products found");
        }
        // Filter out the current product from recommendations
        const filteredProducts = allProducts.filter((p) => p.id !== productId);
        // Shuffle the array and pick 4 random products
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);

        setRecommendedProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Fetch product images
  const fetchProductImages = async (productId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product-images/product/${productId}`
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Extract image paths correctly
        const imageUrls = response.data.map(
          (img) => `https://${img.imagePath}`
        );

        console.log("Extracted Image URLs:", imageUrls);

        // Set images in state
        setProductImages(imageUrls);
        setBigImage(imageUrls[0]); // Set first image as default
      } else {
        console.error("Invalid API response format", response.data);
        setBigImage("/assets/default.jpg"); // Fallback image
      }
    } catch (error) {
      console.error("Error fetching product images:", error);
      setBigImage("/assets/default.jpg"); // Fallback image
    }
  };

  useEffect(() => {
    if (product && product.id) {
      fetchProductImages(product.id);
    }
  }, [product]); // ✅ Always runs in the same order

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const newTouchEndX = e.changedTouches[0].clientX;
    setTouchEndX(newTouchEndX);
    handleSwipe(touchStartX, newTouchEndX);
  };

  const handleSwipe = (startX, endX) => {
    if (startX === null || endX === null) return;

    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const currentIndex = productImages.indexOf(bigImage);
    if (
      startX - endX > swipeThreshold &&
      currentIndex < productImages.length - 1
    ) {
      // Swipe left (➡️) → Next image
      setBigImage(productImages[currentIndex + 1]);
    } else if (endX - startX > swipeThreshold && currentIndex > 0) {
      // Swipe right (⬅️) → Previous image
      setBigImage(productImages[currentIndex - 1]);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <div className="flex flex-col lg:flex-row justify-between w-[95%] mx-auto px-5 pb-5">
        {/* Small Images */}
        <div className="flex flex-row lg:flex-col gap-4">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              onClick={() => setBigImage(img)}
              className="w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] mt-4 cursor-pointer border-2 border-transparent hover:border-gray-400"
            />
          ))}
        </div>
        {/* Big Image */}
        <div
          className="flex justify-center items-center w-full lg:w-[60%] mt-4 lg:mt-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={bigImage}
            alt={product.name}
            className="w-full h-[500px] lg:h-[900px] object-contain"
          />
        </div>
        {/* Description */}
        <div className="flex flex-col font-medium text-lg max-w-[400px] !m-4 lg:mt-0">
          <div className="">
            <h4 className="font-bold">{product.name}</h4>
          </div>
          <p className="text-sm !mt-2">{product.description}</p>
          <p className="font-bold text-xl !mt-4">
            {selectedCurrency === "egp" ? "E£" : "$"}
            {convertAmount(product.price).toFixed(2)}
          </p>
          <div className="!mt-8 justify-end flex">
            <button
              className="w-[100px] lg:w-[250px] h-[40px] lg:h-[50px] !bg-green-900 text-white rounded-full text-sm lg:text-base font-bold hover:bg-gray-700"
              onClick={() => addToCart(product)}
            >
              {translations.addtocart}
            </button>
          </div>
        </div>
      </div>
      <hr className="hr" />
      {/* Related Products Section */}
      <div className="">
        <section className="max-w-full">
          <div className="">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-center !py-10">
              {translations.relatedname}
            </h1>
          </div>
          <div className="flex gap-5 overflow-x-auto whitespace-nowrap px-5 py-2 scroll-snap-x snap-mandatory">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(renderProductCard)
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Recommended Products Section */}

      <div className="!mb-8">
        <section className="max-w-full">
          <div className="">
            <h1 className="text-lg sm:text-2xl lg:text-3xl text-center font-bold px-5 py-10">
              {translations.recommendedname}
            </h1>
          </div>
          <div className="productss flex gap-5 overflow-x-auto whitespace-nowrap px-5 py-2 scroll-snap-x snap-mandatory">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map(renderProductCard)
            ) : (
              <p>No recommended products found.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ProductView;
