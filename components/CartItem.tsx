import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

type Props = {
  id: string;
  quantity: number;
};

const CartItem = ({ id, quantity }: Props) => {
  const appContext = useContext(AppContext);
  return (
    <div className="flex justify-between items-center border my-2 pl-4">
      <p className="w-[240px]">{id}</p>
      <div className="flex items-center">
        <button
          onClick={() => appContext?.decreaseAmount(id)}
          className="p-2 bg-blue-200 mr-2"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => appContext?.increaseAmount(id)}
          className="p-2 bg-blue-200 ml-2"
        >
          +
        </button>
      </div>
      <button
        className="p-4 border bg-red-200"
        onClick={() => {
          appContext?.handleRemoveFromCart(id);
        }}
      >
        Remove from cart
      </button>
    </div>
  );
};

export default CartItem;
