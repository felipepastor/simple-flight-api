// index.js
const v4 = require("uuid").v4;
const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/flights/promotion", (req, res) => {
  const flights = [];
  for (let i = 0; i < 2; i++) {
    flights[i] = [];

    for (let index = 0; index < 10; index++) {
      const type = Math.random() < 0.5 ? "outgoing" : "return";

      flights[i].push({
        origin: "FRA",
        destination: "FCO",
        departureDate: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2023-01-01T00:00:00.000Z",
        }),
        returnDate: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2023-01-01T00:00:00.000Z",
        }),
        seatAvailability: faker.number.int(99),
        price: {
          amount: faker.finance.amount(),
          currency: "EUR",
        },
        offerType: "BestPrice",
        uuid: v4(),
        type,
      });
    }
  }

  res
    .status(200)
    .json({ ongoingFlights: flights[0], returnFlights: flights[1] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
