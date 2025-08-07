from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
import os

stripe.api_key = "sk_test_51RtTFBDsF3l93BGzj9Pw3ayDOFsy4amKrS125OW5iyCyoPR0zIHwK6AMHx1SW87Mil0qWahkLVKkY71wuM8bINVC00sUSXWHkl"

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PaymentRequest(BaseModel):
    amount: int

@app.post("/create-payment-intent")
def create_payment_intent(payment: PaymentRequest):
    try:
        intent = stripe.PaymentIntent.create(
            amount=payment.amount,
            currency="usd",
            payment_method_types=["card"]
        )
        return intent.client_secret
    except Exception as e:
        return {"error": str(e)}