import "@/styles/globals.css";
import { useEffect } from "react";
import Layout from "./components/layout";
const theme_id = "theme_ecod";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    fetch(`/api/gather_data?theme_id=${theme_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        try {
          const data = await res.json();
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
