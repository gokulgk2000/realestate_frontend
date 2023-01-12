import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import Thankyoupage from './Thankyoupage';
const stripePromise = loadStripe("pk_test_51MAWn8SIJemEdI6N3T3qJbqf0mzcuvEVVM2l2gOBHwvRBIljSDHJDjZUIhBGZiskN1C0WteZqmkW3sNz3xxeBg5c00GCmrimhA");

const PSwrapper = () => {
  return (
    <Elements stripe={stripePromise}>
        <Thankyoupage/>
    </Elements>
  )
}

export default PSwrapper