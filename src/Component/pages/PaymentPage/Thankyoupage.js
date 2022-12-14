import React from "react";
import { useEffect } from "react";
import { getPaymentId } from "../../helper/backend_helpers";
import { useQuery } from "../../helper/hook/useQuery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
const Thankyoupage = () => {
  const query = useQuery();
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // console.log("paymentIntent : ",paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  useEffect(() => {
    console.log("Getting payment");
    const getUserPaymentData = async () => {
      const res = await getPaymentId({ pi: query.get("payment_intent") });
      if(res.success){
      toastr.success(`Your Property Details Display "Soon"`, "Success");
    }
      // console.log("Got payment",res)
    };
    getUserPaymentData();
  }, []);

  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p class="text-gray-600 my-2">
            {" "}
            Transaction ID {query.get("payment_intent")}.
          </p>
          <p> Have a great day! </p>
          <div class="py-10 text-center">
            <a
              href="/"
              class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyoupage;
