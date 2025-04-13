import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ProductList from "../Components/ProductList";

function Paintings({ toggleCartVisibility, cart, addToCart, totalQuantity }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header
          toggleCartVisibility={toggleCartVisibility}
          cart={cart}
          totalQuantity={totalQuantity}
        />
        <main className="flex-grow">
          <ProductList addToCart={addToCart} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Paintings;
