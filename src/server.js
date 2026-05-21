require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const auctionRoutes = require("./routes/auctionRoutes");

const {
  swaggerUi,
  specs,
} = require("./config/swagger");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("LotFlow Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
