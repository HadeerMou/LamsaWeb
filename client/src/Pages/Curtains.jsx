import React, { useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ProductList from "../Components/ProductList";
import { useTranslation } from "../TranslationContext";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Curtains({ toggleCartVisibility, cart, addToCart, totalQuantity }) {
  const [showColors, setShowColors] = useState(false);
  const { translations } = useTranslation();
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header
          toggleCartVisibility={toggleCartVisibility}
          cart={cart}
          totalQuantity={totalQuantity}
        />
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
                  className={`${color} w-8 h-8 hover:border-2! active:border-2! cursor-pointer`}
                ></div>
              ))}
            </div>
          )}
        </div>
        <main className="flex-grow">
          <ProductList addToCart={addToCart} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Curtains;
