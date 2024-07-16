import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
        <Link href="#">
          <Image
            className="w-auto h-7"
            src="https://merakiui.com/images/full-logo.svg"
            alt="some image"
            width={100}
            height={100}
          />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Overview
          </Link>

          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Features
          </Link>

          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Careers
          </Link>

          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Help
          </Link>

          <Link
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 "
          >
            Privacy
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500 lg:mt-0">
          © Copyright 2023 Meraki UI.{" "}
        </p>
      </div>
    </footer>
  );
}
