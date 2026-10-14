import { useCallback, useEffect, useState } from "react";
import { createOrderApi, verifyOrderApi } from "../api/client";
import type { RazorpayOptions } from "../utils/types";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let isActive = true;

    verifyOrderApi()
      .then((res) => {
        if (isActive && res.isPremium) {
          setIsPremium(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const verifyPaymentData = useCallback(async () => {
    try {
      const res = await verifyOrderApi();
      if (res.isPremium) {
        setIsPremium(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const premiumHandler = async (membershipType: string) => {
    const paymentData = await createOrderApi(membershipType);
    const { amount, currency, orderId, notes } = paymentData.orderData;

    //open razorpay dialog box
    const options: RazorpayOptions = {
      key: paymentData.keyId,
      amount,
      currency,
      name: "DevPair",
      description: "Coneect with developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + notes.lastName,
        email: notes.key1,
        contact: "8291758813",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPaymentData,
    };

    if (!window.Razorpay) {
      throw new Error("Razorpay checkout script failed to load");
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isPremium ? (
    "You are already a premium member"
  ) : (
    <div className="relative min-h-screen overflow-hidden bg-[#071a29] text-white">
      <div className="relative flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="text-center">
            <h1 className="text-1xl font-black tracking-[-0.07em] text-slate-100 sm:text-5xl lg:text-[4.5rem]">
              DevPair Premium
            </h1>

            <div className="mt-7 flex items-center justify-center gap-4 text-slate-200">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-[0_0_24px_rgba(59,130,246,0.5)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-16 w-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 7 3 12l5 5" />
                  <path d="M16 7l5 5-5 5" />
                  <path d="M14 3 10 21" />
                </svg>
              </div>
              <p className="max-w-[620px] text-sm font-medium text-slate-200 sm:text-lg">
                Send unlimited requests to friends and chat with them and lot
                more!!!
              </p>
            </div>

            <button
              onClick={() => premiumHandler("gold")}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.45)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_20px_52px_rgba(59,130,246,0.6)] focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              Gold
            </button>
            <button
              onClick={() => premiumHandler("silver")}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.45)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_20px_52px_rgba(59,130,246,0.6)] focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            >
              Silver
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Premium;
