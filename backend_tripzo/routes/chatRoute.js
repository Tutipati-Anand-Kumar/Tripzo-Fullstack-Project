// routes/chatRoute.js

const express = require("express");
const router = express.Router();
require("dotenv").config();

const { getWeatherByCity } = require("../utils/weather");
const { getDistance } = require("../utils/distance");
const Trip = require("../models/Trip");
const Hotel = require("../models/Hotel");

router.post("/", async (req, res) => {
    const { intent, data } = req.body;

    try {
        if (intent === "weather") {
            const weatherData = await getWeatherByCity(data.city);
            if (!weatherData)
                return res.json({ reply: "I couldn't find weather info for that city." });

            return res.json({
                reply: `⛅ Weather in ${weatherData.city}
            🌡 Temp      : ${weatherData.temperature}
            💧 Humidity  : ${weatherData.humidity}%
            💨 Wind      : ${weatherData.windSpeed ?? "N/A"} m/s
            📖 Condition : ${weatherData.description}`,
                        });
        }

        if (intent === "distance") {
            const distanceKm = await getDistance(data.origin, data.destination);
            return res.json({
                reply: `📍 Distance from ${data.origin} to ${data.destination} is ${distanceKm.toFixed(2)} km.`,
            });
        }

        if (intent === "flights") {
            const trip = await Trip.findOne({
                destination: { $regex: data.destination, $options: "i" },
            });
            if (!trip) return res.json({ reply: "No flights found." });

            const flights = trip.flights.map((f) => `${f.name} - $${f.price}`).join(", ");
            return res.json({ reply: `✈️ Flights to ${trip.destination}: ${flights}` });
        }

        if (intent === "hotels") {
            const hotels = await Hotel.find({
                destination: { $regex: data.destination, $options: "i" },
            });
            if (!hotels || hotels.length === 0) return res.json({ reply: "No hotels found." });

            const hotelList = hotels
                .map((h) => `${h.name} (${h.roomType}) - $${h.pricePerNight}/night`)
                .join(", ");
            return res.json({ reply: `🏨 Hotels in ${data.destination}: ${hotelList}` });
        }

        return res.status(400).json({ reply: "No specific intent found." });

    } catch (err) {
        console.error("❌ Chat intent error:", err.message);
        return res.status(500).json({ reply: "Something went wrong." });
    }
});

module.exports = router;