"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { CatalogItem } from "square/dist/types/models/catalogItem";
import { CatalogObject } from "square";
import { useCart } from "@/lib/cartContext";
import { CartItem } from "../../../type";

export default function ProductCard({
  itemID,
  itemData,
  image,
  variationStocks
}: {
  itemID: string;
  itemData: CatalogItem;
  image?: CatalogObject;
  variationStocks: Record<string, number>;
}) {
  const [loading, setLoading] = useState(false);
  const { addToCart, cart } = useCart();

  const itemOnCart = cart?.items.find(
    (item) => item.variantID === itemData?.variations?.[0]?.id!
  );

  const itemOnCartQuantity = itemOnCart?.quantity ?? 0;

  const imageUrl = image?.imageData?.url;

  const rawPrice = Number(
    itemData.variations?.[0]?.itemVariationData?.priceMoney?.amount
  );

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

  const permalink = itemData.name
    ? `${itemData.name.toLowerCase().replace(/\s+/g, "-")}-${itemID}`
    : null;

  const availableStock = variationStocks[itemData.variations![0].id];

  const handleAddToCartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      if (itemOnCartQuantity < availableStock) {
        setLoading(true);

        const cartItem: CartItem = {
          id: itemID,
          name: itemData.name ?? "",
          price: rawPrice,
          quantity: 1,
          image: imageUrl ?? "",
          variantID: itemData?.variations?.[0]?.id!,
        };

        const response = addToCart(cartItem);

        if (response.status) {
          toast.success("Item Added to Cart. 👌");
        } else {
          toast.error("Something went wrong. 😱");
        }

        setLoading(false);
      } else {
        toast.error("Insufficient stock available. 😞");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link
      href={`/shop/${permalink}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <Image
        src={imageUrl ?? ""}
        alt="some image"
        className="h-64 w-full object-cover transition duration-500 scale-[1.2] group-hover:scale-100 sm:h-72"
        width={500}
        height={500}
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
          {" "}
          New{" "}
        </span> */}

        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {itemData.name}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700">{itemPrice}</p>

        <form className="mt-4">
          <button
            onClick={handleAddToCartClick}
            disabled={loading}
            className="block w-full rounded bg-blue-500 disabled:bg-gray-500 text-white p-4 text-sm font-medium transition hover:scale-105"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
}

// WishList button
{
  /* <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button> */
}
