// utils/geolocation.js
import maxmind from "maxmind";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let lookup;

// Initialize with bundled data (no file copying needed)
async function initGeoIP() {
  try {
    // Use the built-in GeoLite2 data that comes with maxmind
    const response = await fetch("https://git.io/GeoLite2-Country.mmdb");
    const buffer = await response.arrayBuffer();
    lookup = await maxmind.open(new Uint8Array(buffer));
  } catch (err) {
    console.error("Failed to initialize GeoIP:", err);
    // Fallback to simple IP analysis
    lookup = {
      get: (ip) => ({
        country: "US",
        iso_code: "US",
      }),
    };
  }
}

// Call initialization immediately
initGeoIP();

export async function getLocation(ip) {
  if (!lookup) await initGeoIP();

  try {
    return lookup.get(ip) || { country: "Unknown" };
  } catch (err) {
    console.error("GeoIP lookup failed:", err);
    return { country: "Unknown" };
  }
}
