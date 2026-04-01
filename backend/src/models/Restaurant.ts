import { Schema, model } from "mongoose";

const imdbSchema = new Schema(
  {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number }
  },
  { _id: false }
);

const viewerSchema = new Schema(
  {
    rating: { type: Number },
    numReviews: { type: Number }
  },
  { _id: false }
);

const tomatoesSchema = new Schema(
  {
    viewer: { type: viewerSchema },
    fresh: { type: Number },
    rotten: { type: Number }
  },
  { _id: false }
);

const awardsSchema = new Schema(
  {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String }
  },
  { _id: false }
);

const restaurantSchema = new Schema(
  {
    name: { type: String },
    cuisine: { type: String },
    borough: { type: String },
    address: { type: [String] },
    
  },
  {
    collection: "restaurants"
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
