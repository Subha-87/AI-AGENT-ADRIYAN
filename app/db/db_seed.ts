import { db } from "./db";
import { productTable, salesTable } from "./schema";


 async function seed() {
  console.log("Seeding Database...");

  // Insert Products
  const products = await db
    .insert(productTable)
    .values([
      {
        name: "Laptop",
        description: "15-inch business laptop",
        category:'Electronics',
        price: 55000,
        stock: 10,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        category:'Electronics',
        price: 1200,
        stock: 50,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard",
        category:'Electronics',
        price: 3500,
        stock: 25,
      },
      {
        name: "USB-C Hub",
        description: "6-in-1 USB-C adapter",
        category:'Electronics',
        price: 1800,
        stock: 30,
      },
    ])
    .returning();

  console.log("Products inserted:", products);

  // Insert Sales
  await db.insert(salesTable).values([
    {
      productId: products[0].id,
      quantity: 2,
      totalAmount: products[0].price * 2,
      customer_name:'Arun Naskar',
      region:'London'
    },
    {
      productId: products[1].id,
      quantity: 3,
      totalAmount: products[1].price * 3,
      customer_name:'Subhajit Das',
      region:'Norway'
    },
    {
      productId: products[2].id,
      quantity: 1,
      totalAmount: products[2].price,
      customer_name:'Adriyan Das',
      region:'New York'
    },
    {
      productId: products[3].id,
      quantity: 2,
      totalAmount: products[3].price * 2,
      customer_name:'Sepia Majumder',
      region:'Paris'
    },
    {
      productId: products[1].id,
      quantity: 5,
      totalAmount: products[1].price * 5,
      customer_name:'Iron Man',
      region:'LA'
    },
  ]);

  console.log("Sales inserted successfully!");
}

seed()
  .then(() => {
    console.log("Seed completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });