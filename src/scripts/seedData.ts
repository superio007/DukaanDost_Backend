import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/mongooseDb.js";
import { User } from "../models/User.js";
import { Inventory } from "../models/Inventory.js";
import { SampleRequest } from "../models/SampleRequest.js";
import { Role, Priority, ItemStatus } from "../types/enums.js";
import { config } from "../config/index.js";

// Load environment variables
dotenv.config();
// Add this import at the top
import { Buyer } from "../models/Buyer.js";

// Add this function
async function seedBuyers() {
  console.log("Seeding buyers...");

  const buyers = [
    {
      name: "Acme Textiles Ltd",
      contactPerson: "John Smith",
      email: "john.smith@acmetextiles.com",
      phone: "+1-555-0101",
      address: "123 Fabric Street, New York, NY 10001, USA",
    },
    {
      name: "Global Fashion House",
      contactPerson: "Sarah Johnson",
      email: "sarah.j@globalfashion.com",
      phone: "+1-555-0102",
      address: "456 Design Avenue, Los Angeles, CA 90001, USA",
    },
    {
      name: "Premium Garments Inc",
      contactPerson: "Michael Chen",
      email: "m.chen@premiumgarments.com",
      phone: "+1-555-0103",
      address: "789 Textile Road, Chicago, IL 60601, USA",
    },
    {
      name: "Elite Clothing Co",
      contactPerson: "Emily Davis",
      email: "emily.davis@eliteclothing.com",
      phone: "+1-555-0104",
      address: "321 Fashion Boulevard, Miami, FL 33101, USA",
    },
    {
      name: "Metro Fabrics Group",
      contactPerson: "David Wilson",
      email: "d.wilson@metrofabrics.com",
      phone: "+1-555-0105",
      address: "654 Commerce Street, Houston, TX 77001, USA",
    },
    {
      name: "Luxury Apparel International",
      contactPerson: "Jennifer Martinez",
      email: "j.martinez@luxuryapparel.com",
      phone: "+1-555-0106",
      address: "987 Style Lane, San Francisco, CA 94101, USA",
    },
    {
      name: "Classic Textiles Corp",
      contactPerson: "Robert Brown",
      email: "r.brown@classictextiles.com",
      phone: "+1-555-0107",
      address: "147 Heritage Drive, Boston, MA 02101, USA",
    },
    {
      name: "Modern Fashion Enterprises",
      contactPerson: "Lisa Anderson",
      email: "l.anderson@modernfashion.com",
      phone: "+1-555-0108",
      address: "258 Innovation Plaza, Seattle, WA 98101, USA",
    },
    {
      name: "Supreme Garments Ltd",
      contactPerson: "James Taylor",
      email: "j.taylor@supremegarments.com",
      phone: "+1-555-0109",
      address: "369 Quality Street, Denver, CO 80201, USA",
    },
    {
      name: "Royal Fabrics Company",
      contactPerson: "Amanda White",
      email: "a.white@royalfabrics.com",
      phone: "+1-555-0110",
      address: "741 Prestige Avenue, Atlanta, GA 30301, USA",
    },
  ];

  for (const buyerData of buyers) {
    const existingBuyer = await Buyer.findOne({ email: buyerData.email });
    if (!existingBuyer) {
      await Buyer.create(buyerData);
      console.log(`✓ Created buyer: ${buyerData.name}`);
    } else {
      console.log(`- Buyer already exists: ${buyerData.name}`);
    }
  }

  console.log("Buyers seeded successfully!");
}

// Add this to your main seed function
async function seedDatabase() {
  try {
    await connectDB();

    await seedBuyers();

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
