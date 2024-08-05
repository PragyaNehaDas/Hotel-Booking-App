const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require("./config/db.js");
const roomRoutes = require("./routes/roomRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware.js");

const port = process.env.PORT || 5000;

//connect to database
connectDB();

//setup midlewares
app.use(cookieParser());
app.use(express.json());

//setup routes
app.use("/api/rooms", roomRoutes)

//booking routes
app.use("/api/bookings", bookingRoutes)

//user routes
app.use("/auth", auth)
app.use("/api/users", userRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`listening on port ${port}`));
