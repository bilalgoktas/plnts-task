import { stringify } from "querystring";
import React, { useState } from "react";

type AppContextProps = {
  children: React.ReactNode;
};

type AppContextType = {
  handleAddToCart: (id: string) => void;
  handleCartClear: () => void;
  handleRemoveFromCart: (id: string) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  productsInCart: { id: string; quantity: number }[] | [];
};

export const AppContext = React.createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [productsInCart, setProductsInCart] = useState<
    { id: string; quantity: number }[]
  >([]);
  const handleAddToCart = (id: string) => {
    const indexOfItem = productsInCart.findIndex(
      (item: { id: string; quantity: number }) => item.id === id
    );
    if (indexOfItem !== -1) {
      const newArray = [...productsInCart];
      newArray[indexOfItem].quantity++;
      setProductsInCart(newArray);
      console.log(productsInCart);
    } else {
      setProductsInCart([...productsInCart, { id, quantity: 1 }]);
    }
  };
  const handleRemoveFromCart = (id: string) => {
    const newArray = productsInCart.filter(
      (p: { id: string; quantity: number }) => p.id !== id
    );
    setProductsInCart(newArray);
  };
  const handleCartClear = () => {
    setProductsInCart([]);
  };
  const increaseAmount = (id: string) => {
    const indexOfItem = productsInCart.findIndex(
      (item: { id: string; quantity: number }) => item.id === id
    );
    const newArray = [...productsInCart];

    newArray[indexOfItem].quantity++;
    setProductsInCart(newArray);
  };

  const decreaseAmount = (id: string) => {
    const indexOfItem = productsInCart.findIndex(
      (item: { id: string; quantity: number }) => item.id === id
    );
    const newArray = [...productsInCart];
    if (newArray[indexOfItem].quantity > 1) {
      newArray[indexOfItem].quantity--;
      setProductsInCart(newArray);
    } else {
      const filteredArray = productsInCart.filter(
        (p: { id: string; quantity: number }) => p.id !== id
      );
      setProductsInCart(filteredArray);
    }
  };

  const value: AppContextType = {
    handleAddToCart,
    handleCartClear,
    handleRemoveFromCart,
    increaseAmount,
    decreaseAmount,
    productsInCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
