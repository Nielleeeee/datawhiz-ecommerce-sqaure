"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { useCart } from "@/lib/cartContext";

const navigationList = [
  { label: "Home", path: "/" },
  { label: "Shops", path: "/shop" },
];

export default function Header() {
  // const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleActive = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  const NavigationItems = () => {
    return navigationList.map((navigation, index) => (
      <Link
        key={index}
        href={navigation.path}
        className={`relative group transition-colors duration-300 capitalize transform  hover:text-blue-500 ${
          pathname === navigation.path ? "text-blue-500" : "text-gray-700"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {navigation.label}{" "}
      </Link>
    ));
  };

  return (
    <header className="fixed w-full z-30 top-0 text-white">
      <nav className="relative bg-blue-100/60 backdrop-blur-md">
        <div className="container px-4 py-2 mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <div
            className={`w-auto px-4 py-2 transition-all duration-300 ease-in-out bg-transparent relative flex items-center`}
          >
            {/* Desktop */}
            <div className="hidden md:flex gap-4 md:gap-6 mx-6 items-center">
              <NavigationItems />

              <Link
                className="relative text-gray-700 transition-colors duration-300 transform  hover:text-gray-600"
                href="/cart"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* {cart &&
                  cart.total_unique_items !== undefined &&
                  cart.total_unique_items > 0 && (
                    <span className="absolute -top-2 -left-4 px-2 py-1 text-xs text-white bg-blue-500 rounded-full">
                      {cart.total_unique_items}
                    </span>
                  )} */}
              </Link>
            </div>

            <label className="burger md:hidden block z-40" htmlFor="burger">
              <input
                type="checkbox"
                id="burger"
                onChange={handleActive}
                checked={isOpen}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>

            {/* Mobile */}
            {isOpen && (
              <div className="fixed h-screen inset-0  bg-blue-100 z-30 flex justify-center items-center p-8 transform translate-x-0 transition-transform duration-300 ease-in-out">
                <div className="text-xl text-center flex flex-col gap-5 text-white text-shadow font-medium">
                  <NavigationItems />

                  <Link
                    className="relative text-gray-700 transition-colors duration-300 transform hover:text-gray-600 flex items-center justify-center"
                    href="/cart"
                  >
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* {cart &&
                      cart.total_unique_items !== undefined &&
                      cart.total_unique_items > 0 && (
                        <span className="absolute -top-2 -left-4 px-2 py-1 text-xs text-white bg-blue-500 rounded-full">
                          {cart.total_unique_items}
                        </span>
                      )} */}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
