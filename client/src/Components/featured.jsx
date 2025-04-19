import React, { useEffect, useState } from "react";
import { useTranslation } from "../TranslationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Featured() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState();
  const { translations, language } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {});
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [language]);

  return (
    <>
      <div className="featured lg:mt-20! mt-8! lg:mb-20! !p-5 sm:p-10">
        <h2 className="text-2xl! sm:text-4xl! lg:text-5xl! font-bold text-center !mb-7">
          {translations.featured}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {products &&
            products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="card p-4 bg-white rounded-lg shadow-md"
              >
                <div className="img bg-gray-100 p-5! lg:p-18! sm:p-10! flex justify-center items-center rounded-md">
                  <img
                    className="rounded-md max-w-[250px] shadow-[-4px_4px_15px_rgba(0,0,0,0.488)] cursor-pointer"
                    src={`https://${product.productImages[0].imagePath}`}
                    alt="Product"
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: { product } })
                    }
                  />
                </div>

                <div className="desc !py-2 text-center">
                  <h5 className="lg:text-lg font-bold">
                    {language === "ar" ? product.nameAr : product.nameEn}
                  </h5>
                  <p className="text-[8px] lg:text-sm text-gray-600">
                    {language === "ar"
                      ? product.descriptionAr
                      : product.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="inspire items-center !p-15 lg:mb-8! sm:flex !gap-30">
        <div className="img !p-10 rounded-md bg-black/8">
          {" "}
          <img
            className="max-w-[500px] rounded-md shadow-[-4px_4px_15px_rgba(0,0,0,0.488)]"
            src="assets\9008 mockup.jpg"
            alt=""
          />
        </div>
        <div className="text py-5! lg:py-10!">
          <h2 className="text-3xl! sm:text-2xl! lg:text-5xl! !max-w-[400px] mb-5! lg:mb-10!">
            {translations.ourpassion}{" "}
            <span className="text-red-300/80">{translations.inspairation}</span>
          </h2>
          <p className="max-w-120 !mb-6">{translations.passioncont}</p>
          <button
            onClick={() => navigate("/curtains")}
            className="px-6! py-3! bg-[rgb(163,92,92)]! text-white rounded-md"
          >
            {translations.shopnow}
          </button>
        </div>
      </div>
    </>
  );
}

export default Featured;
