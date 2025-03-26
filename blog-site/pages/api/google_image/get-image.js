export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_CX;
  const API_URL = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CX}&searchType=image&imgSize=huge&key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.items) {
      return res.status(404).json({ error: "No images found" });
    }

    // Get only the first 5 images
    const images = data.items.slice(0, 5).map((item) => ({
      title: item.title,
      link: item.link,
      thumbnail: item.image.thumbnailLink,
    }));

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
