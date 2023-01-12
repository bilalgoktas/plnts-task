import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

type Props = {
  id: string;
};

const AddToCartButton = ({ id }: Props) => {
  const appContext = useContext(AppContext);
  //   const handleClick = appContext?.handleAddToCart;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        appContext?.handleAddToCart(id);
      }}
      className="px-4 py-2 bg-amber-500 text-xl text-white"
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
