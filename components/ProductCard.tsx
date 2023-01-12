import Link from "next/link";
import React from "react";
import AddToCartButton from "./AddToCartButton";

type Props = {
  brand: string;
  gallery: string[];
  id: string;
  name: string;
  prices: { amount: number }[];
};

const ProductCard = ({ brand, gallery, id, name, prices }: Props) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="flex flex-col items-center border p-4">
        <img
          className="w-[320px] h-[320px] object-contain"
          src={gallery[0]}
          alt={name}
        />
        <div className="flex flex-col items-center">
          <p className="text-xl mb-4">
            {brand} {name}
          </p>
          <p className="text-2xl mb-4">${prices[0].amount}</p>
          <AddToCartButton id={id} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
