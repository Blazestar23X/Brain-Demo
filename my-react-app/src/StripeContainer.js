import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./payment";

const stripePromse = loadStripe("pk_test_51RtTFBDsF3l93BGzKJzXLkf4qq5QjQCnkbIEKTALmfxsuTeGppJrxqF4GNvoW9cE2yCbXwfuF6eTArV2iVW4hqH500TGb2wjYn")

export default function StripeContainer(){
    return (
        <Elements stripe = {stripePromise}>
            <Payment />
        </Elements>
    );
}
