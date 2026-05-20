const express = require("express");

const router = express.Router();

const {
  getAuctions,
  createAuction,
  deleteAuction,
} = require("../controllers/auctionController");

const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/auctions:
 *   get:
 *     summary: Get all auctions
 *     tags: [Auctions]
 *     responses:
 *       200:
 *         description: List of auctions
 */
router.get("/", getAuctions);

/**
 * @swagger
 * /api/auctions:
 *   post:
 *     summary: Create auction
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Amazon Electronics Lot
 *               company:
 *                 type: string
 *                 example: Amazon
 *               category:
 *                 type: string
 *                 example: Electronics
 *               location:
 *                 type: string
 *                 example: Delhi
 *               basePrice:
 *                 type: number
 *                 example: 50000
 *               auctionDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-06-01T10:00:00.000Z
 *               auctionUrl:
 *                 type: string
 *                 example: https://example.com
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               description:
 *                 type: string
 *                 example: Bulk electronics inventory
 *     responses:
 *       201:
 *         description: Auction created successfully
 */
router.post("/", protect, createAuction);

/**
 * @swagger
 * /api/auctions/{id}:
 *   delete:
 *     summary: Delete auction
 *     tags: [Auctions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Auction ID
 *     responses:
 *       200:
 *         description: Auction deleted successfully
 */
router.delete("/:id", protect, deleteAuction);

module.exports = router;