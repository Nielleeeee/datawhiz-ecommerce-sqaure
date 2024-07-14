import TruckLoading from "@/components/loaders/truckLoading";

export default function Loading() {
  return (
    <main className="pt-16 min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)] flex items-center justify-center">
      <TruckLoading />
    </main>
  );
}
