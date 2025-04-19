import { useTranslation } from "../TranslationContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function ProductList({ addToCart }) {
  const { translations, language } = useTranslation();
  const navigate = useNavigate();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [allProducts, setAllProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null); // Track hovered product ID
  const [categoryName, setCategoryName] = useState("All Products");
  const [colors, setColors] = useState([]); // State for unique colors
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColors, setShowColors] = useState(false);

  // Retrieve category info from state or localStorage
  const categoryId =
    location.state?.categoryId || localStorage.getItem("categoryId") || null;
  const storedCategoryId = localStorage.getItem("categoryId");

  useEffect(() => {
    // Extract unique colors from products
    const uniqueColors = [
      ...new Set(allProducts.map((product) => product.color)),
    ].filter(Boolean); // Filter out null or undefined values
    setColors(uniqueColors);
  }, [allProducts]); // Recalculate colors whenever `products` changes
  useEffect(() => {
    if (categoryId) {
      localStorage.setItem("categoryId", categoryId);
      axios.get(`${API_BASE_URL}/category/${categoryId}`).then((response) => {
        setCategoryName(
          language === "ar" ? response.data.nameAr : response.data.nameEn
        );
      });
    } else {
      localStorage.removeItem("categoryId");
      localStorage.removeItem("categoryName");
      setCategoryName(translations.allProducts);
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {});
        if (response.data && response.data.length > 0) {
          const allProducts = response.data;
          setAllProducts(allProducts); // Save full list for color extraction
          let filteredProducts = allProducts;

          // Filter by categoryId
          if (categoryId) {
            filteredProducts = filteredProducts.filter(
              (product) => String(product.categoryId) === String(categoryId)
            );
          }

          // Filter by selectedColor
          if (selectedColor) {
            filteredProducts = filteredProducts.filter(
              (product) => product.color === selectedColor
            );
          }

          // Fetch product images
          const productsWithImages = await Promise.all(
            filteredProducts.map(async (product) => {
              const imageResponse = await axios.get(
                `${API_BASE_URL}/product-images/product/${product.id}`
              );

              const images =
                imageResponse.data && imageResponse.data.length > 0
                  ? imageResponse.data.map((img) => `https://${img.imagePath}`)
                  : ["/path/to/default/image.jpg"]; // Fallback image if none exists

              return {
                ...product,
                images,
              };
            })
          );
          setProducts(productsWithImages);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, language, selectedColor]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return (
    <>
      <div className="w-full px-3!">
        <div className="flex items-center">
          <p className="text-lg">{translations.choosecolor}</p>
          <span
            className="ml-2! cursor-pointer"
            onClick={() => setShowColors(!showColors)}
          >
            {showColors ? (
              <IoIosArrowDown size={15} />
            ) : (
              <IoIosArrowUp size={15} />
            )}
          </span>
        </div>

        {showColors && (
          <div className="flex space-x-3! mt-3!">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`${
                  selectedColor === color ? "border-2!" : ""
                } w-8 h-8 hover:border-2! cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() =>
                  setSelectedColor((prevColor) =>
                    prevColor === color ? null : color
                  )
                }
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="py-10! !p-3 sm:p-10 lg:px-6!">
        <div className="">
          <h1 className="text-5xl sm:text-xl font-bold text-center !mb-7">
            {categoryName}
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="card p-4 bg-white rounded-lg shadow-md"
              >
                <div className="img bg-gray-100 p-5! lg:p-18! sm:p-10! flex justify-center items-center rounded-md">
                  <img
                    className="rounded-md shadow-[-4px_4px_15px_rgba(0,0,0,0.488)] max-w-[250px]"
                    src={product.images[0]}
                    alt={language === "ar" ? product.nameAr : product.nameEn}
                    /* onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)} */
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: { product } })
                    }
                  />
                </div>
                <div className="desc !py-2 text-center">
                  <h3>{language === "ar" ? product.nameAr : product.nameEn}</h3>
                  <p>
                    {selectedCurrency === "egp" ? `${translations.egp}` : "$"}
                    {product.price && !isNaN(product.price)
                      ? convertAmount(Number(product.price)).toFixed(2)
                      : "N/A"}
                  </p>
                  <h4 className="text-success">{translations.prodOndm}</h4>
                  <div className="bottom p-2! lg:p-4!">
                    <button
                      className="bg-red-300! text-xs lg:text-base text-white px-3! lg:px-5! !py-2 rounded-md hover:bg-red-700! cursor-pointer"
                      onClick={() => {
                        addToCart(product);
                      }}
                    >
                      {translations.addtocart}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
