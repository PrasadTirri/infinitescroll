const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/app-api/v1/photo-gallery-feed-page/page/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const { data } = await axios.get(
      `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`
    );
    res.json(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while trying to fetch data" });
  }
});

app.listen(5001, () => console.log("Proxy server running on port 5001"));
