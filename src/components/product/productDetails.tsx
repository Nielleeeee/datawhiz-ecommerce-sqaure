"use client";

import { Product } from "@chec/commerce.js/types/product";
import Image from "next/image";
import parse from "html-react-parser";
import { useCart } from "@/lib/cartContext";
import { useState } from "react";
import { Minus, Add, Cart, Heart } from "@/components/ui/svg";

export default function ProductDetails(productData: Product) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity(quantity < productData.inventory.available ? quantity + 1 : productData.inventory.available);
  };

  const minusQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) && value < 1) {
      setQuantity(1);
    } else if (value > productData.inventory.available) {
      setQuantity(productData.inventory.available);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCartClick = async () => {
    if (quantity > 1 && quantity <= productData.inventory.available) {
      const response = await addToCart(productData.id, quantity);
      console.log(response);
    } else {
      alert(`Only ${productData.inventory.available} items are available`);
    }
  };

  return (
    <section className="relative py-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
          <div className="img">
            <div className="img-box h-full max-lg:mx-auto ">
              <Image
                src={`${productData.image?.url}`}
                alt={productData.name}
                // className="max-lg:mx-auto lg:ml-auto h-full"
                className="h-auto w-full rounded-md"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
            <div className="data w-full max-w-xl">
              <p className="text-lg font-medium leading-8 text-blue-700 mb-4">
                {productData.categories[0].name}
              </p>
              <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                {productData.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                  {productData.price.formatted_with_symbol}
                </h6>
                <div className="flex items-center gap-2">
                  <span className="pl-2 font-normal leading-7 text-gray-600">
                    {productData.inventory.available} Available
                  </span>
                </div>
              </div>

              {productData.description && (
                <div className="text-black text-base font-normal mb-5">
                  {parse(productData.description)}
                </div>
              )}

              {/* <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                Size
              </p>
              <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                  <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                    S
                  </button>
                  <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                    M
                  </button>
                  <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                    L
                  </button>
                  <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                    XL
                  </button>
                  <button className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                    XXL
                  </button>
                </div>
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                <div className="flex sm:items-center sm:justify-center w-full">
                  <button
                    onClick={minusQuantity}
                    className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  >
                    <Minus />
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="remove-arrow font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                    min={"1"}
                    max={productData.inventory.available}
                  />

                  <button
                    onClick={addQuantity}
                    className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                  >
                    <Add />
                  </button>
                </div>
                <button
                  onClick={handleAddToCartClick}
                  className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                >
                  <Cart />
                  Add to cart
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                  <Heart />
                </button>
                <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
