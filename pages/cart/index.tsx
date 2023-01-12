import React, { useContext } from "react";
import CartItem from "../../components/CartItem";
import { AppContext } from "../../context/AppContext";
import client from "../../services/graphqlService";
import { categoriesQuery, productQuery } from "../../services/queries";

type Props = {};

const Cart = ({}: Props) => {
  const appContext = useContext(AppContext);

  return (
    <div className="w-[1200px] mx-auto">
      {appContext?.productsInCart.map((p) => (
        <CartItem id={p.id} quantity={p.quantity} />
      ))}
      <button
        onClick={appContext?.handleCartClear}
        className="p-4 border bg-red-200"
      >
        Clear cart
      </button>
    </div>
  );
};

export default Cart;
