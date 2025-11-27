const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.MY_GEMINI_KEY);
console.log("Current API Key being used:", process.env.MY_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" || "gemini-1.5-flash"}); 

const { getWeatherByCity } = require("../utils/weather");
const { getDistance } = require("../utils/distance");
const Trip = require("../models/Trip");
const Hotel = require("../models/Hotel");

router.post("/", async (req, res) => {
    const { intent, data } = req.body;

    try {
        // --- 1. WEATHER ---
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

        // --- 2. DISTANCE ---
        if (intent === "distance") {
            const distanceKm = await getDistance(data.origin, data.destination);
            return res.json({
                reply: `📍 Distance from ${data.origin} to ${data.destination} is ${distanceKm.toFixed(2)} km.`,
            });
        }

        // --- 3. FLIGHTS ---
        if (intent === "flights") {
            const trip = await Trip.findOne({
                destination: { $regex: data.destination, $options: "i" },
            });
            if (!trip) return res.json({ reply: "No flights found." });

            const flights = trip.flights.map((f) => `${f.name} - $${f.price}`).join(", ");
            return res.json({ reply: `✈️ Flights to ${trip.destination}: ${flights}` });
        }

        // --- 4. HOTELS ---
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

        // --- 5. GENERAL AI CHAT (The New Part) ---
        if (intent === "general_chat") {
            const prompt = data.message; 
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return res.json({ reply: text });
        }

        return res.status(400).json({ reply: "I didn't understand that request." });

    } catch (err) {
        console.error("❌ Chat intent error:", err.message);
        return res.status(500).json({ reply: "Something went wrong with the AI." });
    }
});

module.exports = router;