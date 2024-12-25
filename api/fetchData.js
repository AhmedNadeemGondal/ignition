dotenv.config();

const auth = process.env.REACT_APP_SOME_THING;

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    // Dynamically append the API key based on existing query parameters
    const fullUrl = url.includes("?")
      ? `${url}&key=${auth}`
      : `${url}?key=${auth}`;

    console.log("Final URL:", fullUrl);

    const response = await axios.get(fullUrl);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data,
      });
    }

    res.status(500).json({ error: error.message });
  }
}
