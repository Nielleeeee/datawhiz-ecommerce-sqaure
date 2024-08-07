"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useState } from "react";
import { Minus, Add, Cart, Heart } from "@/components/ui/svg";
import { toast } from "react-toastify";
import Link from "next/link";
// import { generateCartCheckoutToken } from "@/app/action/checkout/checkout";
import { useRouter } from "next/navigation";
import { CatalogItem, CatalogObject } from "square";

export default function ProductDetails({
  itemID,
  itemData,
  image,
}: {
  itemID: string;
  itemData: CatalogItem;
  image?: CatalogObject;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const itemPrice =
    itemData.variations?.[0]?.itemVariationData?.priceMoney?.amount != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency:
            itemData.variations[0].itemVariationData.priceMoney.currency ||
            "USD",
        }).format(
          Number(itemData.variations[0].itemVariationData.priceMoney.amount) /
            100
        )
      : "Price not available";

  // const addQuantity = () => {
  //   setQuantity(
  //     quantity < productData.inventory.available
  //       ? quantity + 1
  //       : productData.inventory.available
  //   );
  // };

  // const minusQuantity = () => {
  //   setQuantity(quantity > 1 ? quantity - 1 : 1);
  // };

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (isNaN(value) || value < 1) {
  //     setQuantity(1);
  //   } else if (value > productData.inventory.available) {
  //     setQuantity(productData.inventory.available);
  //   } else {
  //     setQuantity(value);
  //   }
  // };

  // const handleAddToCartClick = async () => {
  //   try {
  //     if (quantity > 1 && quantity <= productData.inventory.available) {
  //       setLoading(true);

  //       const response = addToCart(productData.id, quantity);

  //       await toast.promise(response, {
  //         pending: "Adding to Cart... 🙄",
  //         success: "Item Added to Cart. 👌",
  //         error: "Something went wrong. 😱",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //     setQuantity(1);
  //   }
  // };

  // const handleCheckout = async () => {
  //   try {
  //     const token = generateCartCheckoutToken(productData.id, "product_id");

  //     await toast
  //       .promise(token, {
  //         pending: "Checking out... 🙄",
  //         success: "Redirecting. 👌",
  //         error: "Something went wrong. 😱",
  //       })
  //       .then((token) => {
  //         router.push(`/checkout?token=${token.id}`);
  //       });
  //   } catch (error) {
  //     console.error("Handle Checkout Error: ", error);
  //     throw Error;
  //   }
  // };

  return (
    <section className="relative py-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
          <div className="img">
            <div className="img-box h-full max-lg:mx-auto ">
              <Image
                src={`${image?.imageData?.url}`}
                alt={itemData.name as string}
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
                {/* {productData.categories[0].name} */}
              </p>
              <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                {itemData.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                  {itemPrice}
                </h6>
                <div className="flex items-center gap-2">
                  <span className="pl-2 font-normal leading-7 text-gray-600">
                    {/* {productData.inventory.available} Available */}
                  </span>
                </div>
              </div>

              {itemData.descriptionHtml && (
                <div className="text-black text-base font-normal mb-5">
                  {parse(itemData.descriptionHtml)}
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
                    // onClick={minusQuantity}
                    disabled={quantity <= 1}
                    className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 disabled:cursor-not-allowed"
                  >
                    <Minus />
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    // onChange={handleQuantityChange}
                    className="remove-arrow font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                    min={"1"}
                    // max={productData.inventory.available}
                  />

                  <button
                    // onClick={addQuantity}
                    // disabled={quantity >= productData.inventory.available}
                    className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 disabled:cursor-not-allowed"
                  >
                    <Add />
                  </button>
                </div>
                <button
                  // onClick={handleAddToCartClick}
                  disabled={loading}
                  className="group py-4 px-5 rounded-full bg-indigo-200 disabled:bg-gray-200 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                >
                  <Cart />
                  Add to cart
                </button>
              </div>
              <div className="flex items-center gap-3">
                {/* <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                  <Heart />
                </button> */}
                <button
                  // onClick={handleCheckout}
                  className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
                >
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
