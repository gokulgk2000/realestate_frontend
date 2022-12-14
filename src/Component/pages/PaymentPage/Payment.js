import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {SERVER_URL} from "../../helper/configuration";
import CheckoutForm from "./CheckoutForm";
import "./checkoutform.css";
import { getProById } from "../../helper/backend_helpers";
import { useQuery } from "../../helper/hook/useQuery";
const BASE_URL = `${SERVER_URL}/api`
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MAWn8SIJemEdI6N3T3qJbqf0mzcuvEVVM2l2gOBHwvRBIljSDHJDjZUIhBGZiskN1C0WteZqmkW3sNz3xxeBg5c00GCmrimhA");

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("authUser"))

  const query = useQuery();
  const id = query.get("id");
//   console.log("gokuyl:",query.get("id"))
//   console.log("gokul2:",id)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BASE_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: [{ id: "Coimbatore Real Estate" }],
        user:id
    }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="justify-content-center">
   
    <div className="paymentcontent">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </div>
  );
}
