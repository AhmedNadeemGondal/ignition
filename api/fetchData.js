// import dotenv from "dotenv";

// dotenv.config();

// const auth = process.env.REACT_APP_SOME_THING;

// export default async function handler(req, res) {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "URL query parameter is required" });
//   }

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${auth}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch data from external API");
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

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
    // Reconstruct the full URL with the API key in the query string
    const final_url = `${url}&key=${auth}`; // Append the API key as a query parameter

    // Make a request to the external API with the updated URL
    const response = await fetch(final_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
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
