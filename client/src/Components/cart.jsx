import { useCurrency } from "../CurrencyContext";
import "./cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../TranslationContext";
import { calculateTotalPrice } from "../Utils/CartUtils";

export default function Cart({
  toggleCartVisibility,
  isCartVisible,
  products,
  cart,
  fetchUserCart,
  totalQuantity,
}) {
  const navigate = useNavigate();
  const { selectedCurrency, convertAmount } = useCurrency();
  const { translations, language } = useTranslation();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleCheckout = () => {
    const cartWithDetails = cart.map((item) => {
      const productInfo = getProductInfo(item.productId); // Fetch product details
      return {
        ...item,
        name: productInfo.name,
        image: `https://${productInfo.image}`, // Ensure full image URL
        price: productInfo.price,
      };
    });

    navigate("/checkout", { state: { cart: cartWithDetails, totalPrice } });
  };

  // Update item quantity in the cart
  const updateQuantityInCart = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");
      // Find the current item in the cart
      const item = cart.find((cartItem) => cartItem.productId === productId);
      if (!item) {
        console.error("Item not found in cart");
        return;
      }
      // Calculate the new quantity
      let newQuantity =
        action === "plus" ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity < 1) newQuantity = 1; // Prevent negative or zero quantity

      const response = await axios.put(
        `${API_BASE_URL}/cart-items`,
        { product_id: productId, quantity: newQuantity },

        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserCart(); // Refresh cart
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/cart-items/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getProductInfo = (productId) => {
    if (!products || products.length === 0) return {}; // Ensure products exist

    const product = products.find((product) => product.id === productId);
    if (!product)
      return { name: "Unknown", image: "/placeholder.png", price: 0 };
    // Extract image from productImages array (assuming the first one is default)
    const imagePath =
      product.productImages?.length > 0
        ? product.productImages[0].imagePath
        : "/placeholder.png";

    return { ...product, image: imagePath };
  };

  const totalPrice = parseInt(
    calculateTotalPrice(cart, getProductInfo, convertAmount)
  );

  return (
    <>
      {/* Overlay */}
      {isCartVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleCartVisibility}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg flex flex-col !p-5 transform transition-transform duration-300 z-50  ${
          isCartVisible ? "translate-x-0" : "translate-x-full"
        } md:w-[400px] sm:w-full`}
      >
        <div className="cart-header flex justify-between items-center !mb-6 bg-pink-100 rounded-sm !p-1.5">
          <div className="close flex gap-3">
            <button
              className="font-bold !px-3 cursor-pointer"
              onClick={toggleCartVisibility}
            >
              X
            </button>
            <h2 className="font-semibold">Cart</h2>
          </div>

          <div className="cart-total flex font-bold gap-4">
            <span>
              {translations.totalItems}:{totalQuantity}
            </span>
            <span>
              {" "}
              {translations.totalPrice}:{`${totalPrice}`}
            </span>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {cart && cart.length > 0 ? (
            cart.map((item) => {
              const productInfo = getProductInfo(item.productId); // Get product details
              const convertedPrice = convertAmount(productInfo?.price || 0); // Convert price
              return (
                <div
                  key={item.id}
                  className="cart-item flex justify-between items-center !p-3 !mb-2 bg-gray-100"
                >
                  <img
                    className="max-w-15 max-h-16 rounded"
                    src={`https://${productInfo?.image}`}
                    alt={productInfo?.name || "Product"}
                  />
                  <div className="name">
                    {language === "ar"
                      ? productInfo?.nameAr
                      : productInfo?.nameEn}
                  </div>
                  <div className="total-price text-red">
                    {selectedCurrency === "egp" ? `${translations.egp}` : "$"}
                    {(convertedPrice * (item.quantity || 0)).toFixed(2)}
                  </div>
                  <div className="quantity space-x-1 flex items-center gap-2">
                    <button
                      className="bg-red-700! text-white font-bold text-sm rounded-full !px-2"
                      onClick={() =>
                        updateQuantityInCart(item.productId, "minus")
                      }
                    >
                      -
                    </button>
                    <span className="m-2">{item.quantity}</span>
                    <button
                      className="bg-red-700! text-white font-bold text-sm rounded-full !px-2"
                      onClick={() =>
                        updateQuantityInCart(item.productId, "plus")
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="delete bg-red-500! text-white text-xs !p-2 rounded-sm cursor-pointer"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    {translations.remove}
                  </button>
                </div>
              );
            })
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="cart-footer text-center">
          <button
            className="bg-green-500! text-white w-full h-11 hover:bg-green-700! transition cursor-pointer"
            onClick={() => {
              handleCheckout();
              toggleCartVisibility();
            }}
          >
            {translations.checkout}
          </button>
        </div>
      </div>
    </>
  );
}
