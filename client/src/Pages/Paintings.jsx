import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import ProductList from "../Components/ProductList";

function Paintings({ toggleCartVisibility, cart, addToCart, totalQuantity }) {
  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <ProductList addToCart={addToCart} />
      <Footer />
    </>
  );
}

export default Paintings;
