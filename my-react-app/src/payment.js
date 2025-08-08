import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function Payment(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try{
            const { data } = await axios.post(
                "http://127.0.0.1:8000/api/create-payment-intent/",
                { amount: 5000 }
            );
            const clientSecret = data.client_secret;

            const result = await stripe.confirmCardPayment(clientSecret, {payment_method: {card: elements.getElement(CardElement),},});
            if (result.error){
                setMessage(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded"){
                    setMessage("Payment Successful")
                }
            }
        } catch (err) {
            setMessage("Payment Failed");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing…" : "Pay"}
          </button>
          <div>{message}</div>
        </form>
      );
}