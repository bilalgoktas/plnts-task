import { useRouter } from "next/router";
import React, { useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import client from "../../services/graphqlService";
import { productIdsQuery, productQuery } from "../../services/queries";

type Props = {
  data: {
    data: {
      product: {
        brand: string;
        name: string;
        id: string;
        gallery: string[];
        description: string;
        prices: {
          amount: number;
        }[];
      };
    };
  };
};

const ProductDetail = ({ data }: Props) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { product } = data.data;

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[1200px] mx-auto flex justify-between items-start mt-12">
      <div>
        {product.gallery.map((g: string, index: number) => (
          <img
            key={index}
            className={`w-[96px] h-[96px] object-contain my-4 cursor-pointer border ${
              activeImageIndex === index && "border-2 border-black"
            }`}
            src={g}
            alt={product.name}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
      <img
        className="w-[480px] object-contain"
        src={product.gallery[activeImageIndex]}
        alt={product.name}
      />
      <div>
        <p className="text-xl mb-4">
          <span className="text-2xl">{product.brand}</span> {product.name}
        </p>
        <p className="text-3xl mb-4">
          <span className="text-2xl">$</span>
          {product.prices[0].amount}
        </p>

        <AddToCartButton id={product.id} />
        <div
          className="w-[320px] mt-4"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({ query: productIdsQuery });
  const paths = data.category.products.map((p: { id: string }) => p.id);
  return {
    paths: paths.map((id: string) => ({ params: { id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const { id = "" } = params;
  const data = await client.query({ query: productQuery, variables: { id } });
  return {
    props: { data },
  };
}

export default ProductDetail;
