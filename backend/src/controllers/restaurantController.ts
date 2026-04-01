import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 12);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (req.query.search) {
      filter.title = { $regex: req.query.search as string, $options: "i" };
    }

    if (req.query.genre) {
      filter.genres = req.query.genre as string;
    }

    const [restaurants, total] = await Promise.all([
      Restaurant.find(filter)
        .skip(skip)
        .limit(limit)
        .select(
          "title year runtime genres directors cast plot poster rated imdb awards type"
        ),
     Restaurant.countDocuments(filter)
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      restaurants
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
