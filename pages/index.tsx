import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import client from "../services/graphqlService";
import { categoriesQuery } from "../services/queries";

type HomeProps = {
  data: {
    data: {
      categories: {
        name: string;
        products: {
          id: string;
          brand: string;
          name: string;
          gallery: string[];
          prices: {
            amount: number;
          }[];
        }[];
      }[];
    };
  };
};

const Home: NextPage<HomeProps> = ({ data }) => {
  const { categories } = data.data;
  console.log(categories);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-[1200px] mx-auto mt-12 ">
        {categories.map(
          (
            c: {
              name: string;
              products: {
                id: string;
                brand: string;
                name: string;
                gallery: string[];
                prices: {
                  amount: number;
                }[];
              }[];
            },
            index: number
          ) => (
            <button
              className={`p-4 uppercase ${
                activeCategoryIndex === index && "border-b-2 border-red-800"
              }`}
              key={index}
              onClick={() => setActiveCategoryIndex(index)}
            >
              {c.name}
            </button>
          )
        )}

        <div className="grid grid-cols-3 gap-8 mt-20">
          {categories[activeCategoryIndex].products.map(
            (product: {
              id: string;
              brand: string;
              name: string;
              gallery: string[];
              prices: {
                amount: number;
              }[];
            }) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                gallery={product.gallery}
                id={product.id}
                name={product.name}
                prices={product.prices}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const data = await client.query({ query: categoriesQuery });
  return {
    props: { data },
  };
}

export default Home;
