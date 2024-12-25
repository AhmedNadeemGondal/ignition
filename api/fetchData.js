// import dotenv from "dotenv";

// dotenv.config();

// const auth = process.env.REACT_APP_SOME_THING;

// export default async function handler(req, res) {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: "URL query parameter is required" });
//   }

//   try {

//     const final_url = `${url}&key=${auth}`;

//     const response = await fetch(final_url, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch data from external API");
//     }

//     const data = await response.json();
//     res.status(200).json(data); // Return data to the client
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

import dotenv from "dotenv";
dotenv.config();

const auth = process.env.REACT_APP_SOME_THING;

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    console.error("Missing 'url' query parameter.");
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`External API responded with status: ${response.status}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in serverless function:", error.message);
    res.status(500).json({ error: error.message });
  }
}
