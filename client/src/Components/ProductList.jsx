import { useTranslation } from "../TranslationContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";

function ProductList({ addToCart }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [hoveredProduct, setHoveredProduct] = useState(null); // Track hovered product ID

  // Retrieve category info from state or localStorage
  const categoryId =
    location.state?.categoryId || localStorage.getItem("categoryId") || null;
  const categoryName =
    location.state?.categoryName ||
    localStorage.getItem("categoryName") ||
    "All Products";

  useEffect(() => {
    if (categoryId) {
      localStorage.setItem("categoryId", categoryId);
      localStorage.setItem("categoryName", categoryName);
    } else {
      localStorage.removeItem("categoryId");
      localStorage.removeItem("categoryName");
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {});
        if (response.data && response.data.length > 0) {
          const filteredProducts = categoryId
            ? response.data.filter(
                (product) => String(product.categoryId) === String(categoryId)
              )
            : response.data;

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
          setProduct(productsWithImages);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="py-10! !p-3 sm:p-10 lg:px-6!">
      <div className="">
        <h1 className="text-5xl sm:text-xl font-bold text-center !mb-7">
          {categoryName}
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <div
              key={product.id}
              className="card p-4 bg-white rounded-lg shadow-md"
            >
              <div className="img bg-gray-100 p-5! lg:p-18! sm:p-10! flex justify-center items-center rounded-md">
                <img
                  className="rounded-md shadow-[-4px_4px_15px_rgba(0,0,0,0.488)] max-w-[250px]"
                  src="\assets\Untitled-10-03.jpg"
                  alt={product.name}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                />
              </div>
              <div className="desc !py-2 text-center">
                <h3>{product.name}</h3>
                <p>
                  {selectedCurrency === "egp" ? "E£" : "$"}
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
  );
}

export default ProductList;
