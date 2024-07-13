import CartItems from "@/components/cart/cartList";

export default function Cart() {
  return (
    <main className="pt-16 min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)]">
      <h1 className="text-center py-10 text-5xl font-bold text-blue-500">
        Cart
      </h1>

      <section className="container mx-auto px-4 pt-10 pb-20">
        <CartItems />
      </section>
    </main>
  );
}
