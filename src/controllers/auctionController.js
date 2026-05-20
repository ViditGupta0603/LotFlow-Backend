const prisma = require("../config/prisma");

const getAuctions = async (req, res) => {
  try {
    const auctions = await prisma.auction.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(auctions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const createAuction = async (req, res) => {
  try {
    const {
      title,
      company,
      category,
      location,
      basePrice,
      auctionDate,
      auctionUrl,
      imageUrl,
      description,
    } = req.body;

    const auction = await prisma.auction.create({
      data: {
        title,
        company,
        category,
        location,
        basePrice,
        auctionDate,
        auctionUrl,
        imageUrl,
        description,
      },
    });

    res.status(201).json(auction);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auctionId = Number(req.params.id);

    const auction = await prisma.auction.findUnique({
      where: {
        id: auctionId,
      },
    });

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found",
      });
    }

    await prisma.auction.delete({
      where: {
        id: auctionId,
      },
    });

    res.json({
      message: "Auction deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAuctions,
  createAuction,
  deleteAuction,
};