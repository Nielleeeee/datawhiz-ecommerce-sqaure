import { getSubscriptionData } from "@/app/action/subscription/getSubscriptionData";
import SubscriptionCards from "@/components/subscription/subscriptionCards";

export default async function Subscription() {
  const { subscriptionItems, subscriptionData } = await getSubscriptionData();

  return (
    <main className="bg-white pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
      <section className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                Pricing Table
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        {subscriptionItems && subscriptionData && (
          <SubscriptionCards subscriptionData={subscriptionData} subscriptionItems={subscriptionItems} />
        )}
      </section>
    </main>
  );
}
