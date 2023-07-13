const onRequest = require("firebase-functions/v2/https/onRequest");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NRCsaSHDfdRTEQWg9tmFjQZXkrrWHJBfg9hamCcWO4vr1tjziMW5SxhGXbazMN6PNeGeqIdQuJy6lvJRemwXkNt00nSdvIPVy"
);

// API

// - APP Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get("/", (request, response) => response.status(200).send("Hello word"));
app.get("/debu", (request, response) =>
  response.status(200).send("Hello devda")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = onRequest(app);

// Example of Endpoints
//  http://127.0.0.1:5001/clone-acec2/us-central1/api
