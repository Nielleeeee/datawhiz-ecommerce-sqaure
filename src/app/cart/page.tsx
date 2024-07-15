import CartItems from "@/components/cart/cartList";

export default function Cart() {
  return (
    <main className="pt-16 ">
      <h1 className="text-center py-5 md:py-10 text-3xl md:text-5xl font-bold text-blue-500">
        Cart
      </h1>

      <section className="container h-max mx-auto px-4 pt-5 md:pt-10 pb-10 md:pb-20">
        <CartItems />
      </section>
    </main>
  );
}
