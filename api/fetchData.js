// api/fetchData.js

// import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Access the API key from environment variables (server-side only)
const auth = process.env.REACT_APP_SOME_THING; // Server-side environment variable

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth}`, // Use the API key server-side
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from external API");
    }

    const data = await response.json();
    res.status(200).json(data); // Return data to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
