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

/**
 * Seed Database with Sample Data
 * Run with: npm run seed
 */

const seedUsers = async () => {
  console.log("📝 Seeding users...");

  const users = [
    {
      name: "Admin User",
      email: "admin@dukaandost.com",
      password: await bcrypt.hash("admin123", config.bcrypt.saltRounds),
      role: Role.ADMIN,
    },
    {
      name: "Sampling Head",
      email: "sampling@dukaandost.com",
      password: await bcrypt.hash("sampling123", config.bcrypt.saltRounds),
      role: Role.SAMPLING_HEAD,
    },
    {
      name: "Sales Person 1",
      email: "sales1@dukaandost.com",
      password: await bcrypt.hash("sales123", config.bcrypt.saltRounds),
      role: Role.SALES,
    },
    {
      name: "Sales Person 2",
      email: "sales2@dukaandost.com",
      password: await bcrypt.hash("sales123", config.bcrypt.saltRounds),
      role: Role.SALES,
    },
  ];

  const createdUsers = await User.insertMany(users);
  console.log(`✓ Created ${createdUsers.length} users`);
  return createdUsers;
};

const seedInventory = async () => {
  console.log("📦 Seeding inventory...");

  const inventory = [
    // Cotton fabrics
    {
      fabricName: "Cotton Blend",
      color: "Navy Blue",
      gsm: 180,
      availableMeters: 1000,
    },
    {
      fabricName: "Cotton Blend",
      color: "White",
      gsm: 180,
      availableMeters: 1500,
    },
    {
      fabricName: "Cotton Blend",
      color: "Black",
      gsm: 180,
      availableMeters: 800,
    },
    {
      fabricName: "Cotton Blend",
      color: "Red",
      gsm: 200,
      availableMeters: 600,
    },
    {
      fabricName: "Cotton Blend",
      color: "Sky Blue",
      gsm: 160,
      availableMeters: 900,
    },

    // Polyester fabrics
    {
      fabricName: "Polyester",
      color: "Black",
      gsm: 150,
      availableMeters: 2000,
    },
    {
      fabricName: "Polyester",
      color: "White",
      gsm: 150,
      availableMeters: 1800,
    },
    {
      fabricName: "Polyester",
      color: "Grey",
      gsm: 170,
      availableMeters: 1200,
    },
    {
      fabricName: "Polyester",
      color: "Navy Blue",
      gsm: 150,
      availableMeters: 1400,
    },

    // Silk fabrics
    {
      fabricName: "Silk",
      color: "Cream",
      gsm: 120,
      availableMeters: 500,
    },
    {
      fabricName: "Silk",
      color: "Gold",
      gsm: 120,
      availableMeters: 400,
    },
    {
      fabricName: "Silk",
      color: "Maroon",
      gsm: 130,
      availableMeters: 350,
    },

    // Linen fabrics
    {
      fabricName: "Linen",
      color: "Beige",
      gsm: 200,
      availableMeters: 700,
    },
    {
      fabricName: "Linen",
      color: "White",
      gsm: 200,
      availableMeters: 800,
    },
    {
      fabricName: "Linen",
      color: "Light Grey",
      gsm: 220,
      availableMeters: 600,
    },

    // Denim fabrics
    {
      fabricName: "Denim",
      color: "Dark Blue",
      gsm: 300,
      availableMeters: 1000,
    },
    {
      fabricName: "Denim",
      color: "Light Blue",
      gsm: 280,
      availableMeters: 900,
    },
    {
      fabricName: "Denim",
      color: "Black",
      gsm: 300,
      availableMeters: 850,
    },

    // Wool fabrics
    {
      fabricName: "Wool Blend",
      color: "Charcoal",
      gsm: 250,
      availableMeters: 400,
    },
    {
      fabricName: "Wool Blend",
      color: "Navy",
      gsm: 250,
      availableMeters: 450,
    },
    {
      fabricName: "Wool Blend",
      color: "Brown",
      gsm: 270,
      availableMeters: 350,
    },
  ];

  const createdInventory = await Inventory.insertMany(inventory);
  console.log(`✓ Created ${createdInventory.length} inventory items`);
  return createdInventory;
};

const seedSampleRequests = async (users: any[], inventory: any[]) => {
  console.log("📋 Seeding sample requests...");

  const salesUser1 = users.find((u) => u.email === "sales1@dukaandost.com");
  const salesUser2 = users.find((u) => u.email === "sales2@dukaandost.com");
  const samplingHead = users.find((u) => u.email === "sampling@dukaandost.com");

  const sampleRequests = [
    // Request 1 - High Priority, Multiple Items
    {
      buyerName: "ABC Garments Ltd",
      contactPerson: "John Doe",
      requiredByDate: new Date("2026-03-15"),
      priority: Priority.HIGH,
      items: [
        {
          fabricName: "Cotton Blend",
          color: "Navy Blue",
          gsm: 180,
          requiredMeters: 10,
          availableMeters: 1000,
          status: ItemStatus.SENT,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-20T10:00:00Z"),
              updatedBy: salesUser1._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-21T14:30:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-23T09:15:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
        {
          fabricName: "Polyester",
          color: "Black",
          gsm: 150,
          requiredMeters: 5,
          availableMeters: 2000,
          status: ItemStatus.IN_SAMPLING,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-20T10:00:00Z"),
              updatedBy: salesUser1._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-22T11:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
      ],
      attachments: [
        "https://ik.imagekit.io/demo/sample-design-1.jpg",
        "https://ik.imagekit.io/demo/sample-specs-1.pdf",
      ],
      createdBy: salesUser1._id,
      createdAt: new Date("2026-02-20T10:00:00Z"),
    },

    // Request 2 - Medium Priority
    {
      buyerName: "XYZ Fashion House",
      contactPerson: "Jane Smith",
      requiredByDate: new Date("2026-03-20"),
      priority: Priority.MEDIUM,
      items: [
        {
          fabricName: "Silk",
          color: "Cream",
          gsm: 120,
          requiredMeters: 8,
          availableMeters: 500,
          status: ItemStatus.APPROVED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-18T09:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-19T10:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-20T15:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.APPROVED,
              timestamp: new Date("2026-02-22T16:30:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
      ],
      attachments: ["https://ik.imagekit.io/demo/silk-design.jpg"],
      createdBy: salesUser2._id,
      createdAt: new Date("2026-02-18T09:00:00Z"),
    },

    // Request 3 - Low Priority, Requested Status
    {
      buyerName: "Fashion Forward Inc",
      contactPerson: "Mike Johnson",
      requiredByDate: new Date("2026-04-01"),
      priority: Priority.LOW,
      items: [
        {
          fabricName: "Linen",
          color: "Beige",
          gsm: 200,
          requiredMeters: 12,
          availableMeters: 700,
          status: ItemStatus.REQUESTED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-24T11:00:00Z"),
              updatedBy: salesUser1._id,
            },
          ],
        },
        {
          fabricName: "Cotton Blend",
          color: "White",
          gsm: 180,
          requiredMeters: 15,
          availableMeters: 1500,
          status: ItemStatus.REQUESTED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-24T11:00:00Z"),
              updatedBy: salesUser1._id,
            },
          ],
        },
      ],
      attachments: [],
      createdBy: salesUser1._id,
      createdAt: new Date("2026-02-24T11:00:00Z"),
    },

    // Request 4 - High Priority, In Sampling
    {
      buyerName: "Elite Textiles",
      contactPerson: "Sarah Williams",
      requiredByDate: new Date("2026-03-10"),
      priority: Priority.HIGH,
      items: [
        {
          fabricName: "Denim",
          color: "Dark Blue",
          gsm: 300,
          requiredMeters: 20,
          availableMeters: 1000,
          status: ItemStatus.IN_SAMPLING,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-22T08:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-23T10:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
      ],
      attachments: [
        "https://ik.imagekit.io/demo/denim-sample.jpg",
        "https://ik.imagekit.io/demo/denim-specs.pdf",
      ],
      createdBy: salesUser2._id,
      createdAt: new Date("2026-02-22T08:00:00Z"),
    },

    // Request 5 - Medium Priority, Rejected
    {
      buyerName: "Global Apparel Co",
      contactPerson: "Robert Brown",
      requiredByDate: new Date("2026-03-25"),
      priority: Priority.MEDIUM,
      items: [
        {
          fabricName: "Wool Blend",
          color: "Charcoal",
          gsm: 250,
          requiredMeters: 6,
          availableMeters: 400,
          status: ItemStatus.REJECTED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-15T10:00:00Z"),
              updatedBy: salesUser1._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-16T11:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-18T14:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.REJECTED,
              timestamp: new Date("2026-02-20T09:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
      ],
      attachments: [],
      createdBy: salesUser1._id,
      createdAt: new Date("2026-02-15T10:00:00Z"),
    },

    // Request 6 - High Priority, Multiple Items, Mixed Status
    {
      buyerName: "Premium Fabrics Ltd",
      contactPerson: "Emily Davis",
      requiredByDate: new Date("2026-03-12"),
      priority: Priority.HIGH,
      items: [
        {
          fabricName: "Silk",
          color: "Gold",
          gsm: 120,
          requiredMeters: 5,
          availableMeters: 400,
          status: ItemStatus.SENT,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-21T09:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-22T10:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-24T11:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
        {
          fabricName: "Cotton Blend",
          color: "Red",
          gsm: 200,
          requiredMeters: 8,
          availableMeters: 600,
          status: ItemStatus.IN_SAMPLING,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-21T09:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-23T14:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
        {
          fabricName: "Polyester",
          color: "Grey",
          gsm: 170,
          requiredMeters: 10,
          availableMeters: 1200,
          status: ItemStatus.REQUESTED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-21T09:00:00Z"),
              updatedBy: salesUser2._id,
            },
          ],
        },
      ],
      attachments: [
        "https://ik.imagekit.io/demo/premium-design-1.jpg",
        "https://ik.imagekit.io/demo/premium-design-2.jpg",
      ],
      createdBy: salesUser2._id,
      createdAt: new Date("2026-02-21T09:00:00Z"),
    },

    // Request 7 - Low Priority
    {
      buyerName: "Budget Clothing Store",
      contactPerson: "Tom Wilson",
      requiredByDate: new Date("2026-04-05"),
      priority: Priority.LOW,
      items: [
        {
          fabricName: "Polyester",
          color: "White",
          gsm: 150,
          requiredMeters: 25,
          availableMeters: 1800,
          status: ItemStatus.REQUESTED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-25T10:00:00Z"),
              updatedBy: salesUser1._id,
            },
          ],
        },
      ],
      attachments: [],
      createdBy: salesUser1._id,
      createdAt: new Date("2026-02-25T10:00:00Z"),
    },

    // Request 8 - Medium Priority, Approved
    {
      buyerName: "Trendy Wear",
      contactPerson: "Lisa Anderson",
      requiredByDate: new Date("2026-03-18"),
      priority: Priority.MEDIUM,
      items: [
        {
          fabricName: "Denim",
          color: "Light Blue",
          gsm: 280,
          requiredMeters: 15,
          availableMeters: 900,
          status: ItemStatus.APPROVED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-16T11:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-17T09:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-19T10:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.APPROVED,
              timestamp: new Date("2026-02-21T15:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
        {
          fabricName: "Cotton Blend",
          color: "Black",
          gsm: 180,
          requiredMeters: 12,
          availableMeters: 800,
          status: ItemStatus.APPROVED,
          statusHistory: [
            {
              status: ItemStatus.REQUESTED,
              timestamp: new Date("2026-02-16T11:00:00Z"),
              updatedBy: salesUser2._id,
            },
            {
              status: ItemStatus.IN_SAMPLING,
              timestamp: new Date("2026-02-17T09:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.SENT,
              timestamp: new Date("2026-02-19T10:00:00Z"),
              updatedBy: samplingHead._id,
            },
            {
              status: ItemStatus.APPROVED,
              timestamp: new Date("2026-02-21T15:00:00Z"),
              updatedBy: samplingHead._id,
            },
          ],
        },
      ],
      attachments: ["https://ik.imagekit.io/demo/trendy-design.jpg"],
      createdBy: salesUser2._id,
      createdAt: new Date("2026-02-16T11:00:00Z"),
    },
  ];

  const createdRequests = await SampleRequest.insertMany(sampleRequests);
  console.log(`✓ Created ${createdRequests.length} sample requests`);
  return createdRequests;
};

const clearDatabase = async () => {
  console.log("🗑️  Clearing existing data...");
  await User.deleteMany({});
  await Inventory.deleteMany({});
  await SampleRequest.deleteMany({});
  console.log("✓ Database cleared");
};

const main = async () => {
  try {
    console.log("🚀 Starting database seeding...\n");

    // Connect to database
    await connectDB();

    // Clear existing data
    await clearDatabase();
    console.log("");

    // Seed data
    const users = await seedUsers();
    console.log("");

    const inventory = await seedInventory();
    console.log("");

    const sampleRequests = await seedSampleRequests(users, inventory);
    console.log("");

    // Summary
    console.log("✅ Database seeding completed successfully!\n");
    console.log("📊 Summary:");
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Inventory Items: ${inventory.length}`);
    console.log(`   - Sample Requests: ${sampleRequests.length}`);
    console.log("");
    console.log("👤 Test Credentials:");
    console.log("   Admin:");
    console.log("     Email: admin@dukaandost.com");
    console.log("     Password: admin123");
    console.log("");
    console.log("   Sampling Head:");
    console.log("     Email: sampling@dukaandost.com");
    console.log("     Password: sampling123");
    console.log("");
    console.log("   Sales Person:");
    console.log("     Email: sales1@dukaandost.com");
    console.log("     Password: sales123");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
main();
