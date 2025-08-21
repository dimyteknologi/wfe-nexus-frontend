import { Handler } from "@netlify/functions";
import jsonServer from "json-server";

export const handler: Handler = async (event, context) => {
  const server = jsonServer.create();
  const router = jsonServer.router("db.json");
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);

  // Simulate json-server handling
  const path = event.path.replace("/.netlify/functions/json-server", "");

  try {
    const db = router.db;
    const data = db.getState();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
