import { getMongoClientPromise } from "./mongodb";

const contentId = "main";

export async function getPortfolio() {
  const client = await getMongoClientPromise();
  const database = client.db(process.env.MONGODB_DB || "portfolio");
  const collection = database.collection("portfolioContent");

  const content = await collection.findOne({ _id: contentId });
  const { _id, ...portfolio } = content;
  return portfolio;
}

export async function savePortfolio(portfolio) {
  const client = await getMongoClientPromise();
  const database = client.db(process.env.MONGODB_DB || "portfolio");
  const collection = database.collection("portfolioContent");

  await collection.replaceOne(
    { _id: contentId },
    { ...portfolio, _id: contentId },
    { upsert: true },
  );

  return portfolio;
}
