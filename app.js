// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const cors = require('cors');
const originUrl = process.env.ORIGIN || "http://localhost:5173";

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://kiez-local.netlify.app" // Add your Netlify frontend URL here
];
app.use(cors({
    origin: function (origin, callback) {
        // Check if the incoming origin is in the allowedOrigins array
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // credentials: true // Allow credentials if needed
}));



// app.use(cors({
//     origin: [originUrl],
//   }));

//   app.use(express.json());


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handlinrg routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const eventsRouter = require("./routes/event.routes");
app.use('/api/events', eventsRouter);

const kiezRouter = require("./routes/kiez.routes");
app.use('/api/kiez', kiezRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);






module.exports = app;
