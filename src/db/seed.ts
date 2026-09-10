import "dotenv/config";
import { db } from "./index";
import { restaurants, tables } from "./schema";

async function seed() {
  const [italianPlace] = await db
    .insert(restaurants)
    .values({
      name: "Trattoria Bell'Aria",
      description: "Rustic Italian cooking with a modern twist.",
      address: "123 Main St, Springfield",
      cuisine: "Italian",
      phone: "555-0100",
    })
    .returning();

  const [ramenShop] = await db
    .insert(restaurants)
    .values({
      name: "Noodle & Broth",
      description: "Hand-pulled ramen noodles in rich, slow-cooked broths.",
      address: "456 Oak Ave, Springfield",
      cuisine: "Japanese",
      phone: "555-0101",
    })
    .returning();

  await db.insert(tables).values([
    { restaurantId: italianPlace.id, label: "T1", seats: 2 },
    { restaurantId: italianPlace.id, label: "T2", seats: 4 },
    { restaurantId: ramenShop.id, label: "B1", seats: 2, isOutdoor: true },
  ]);

  console.log("Seed data inserted.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => process.exit());
