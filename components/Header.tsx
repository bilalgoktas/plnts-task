import Link from "next/link";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

type Props = {};

const Header = (props: Props) => {
  const appContext = useContext(AppContext);
  return (
    <header className="w-[1200px] flex justify-between items-center mx-auto py-4">
      <Link className="uppercase py-2 px-4 border hover:border-black" href="/">
        HOME
      </Link>
      <div className="flex items-center">
        <div className="mr-4 p-2 border rounded-full">
          {appContext?.productsInCart
            .map((i) => i.quantity)
            .reduce((a, b) => a + b, 0)}
        </div>
        <Link
          className="uppercase py-2 px-4 border hover:border-black"
          href="/cart"
        >
          Go to cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
