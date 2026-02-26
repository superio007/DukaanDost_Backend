import { model } from "mongoose";
import { BuyerSchema } from "../schemas/buyerSchemas.js";

export const Buyer = model("Buyer", BuyerSchema);
