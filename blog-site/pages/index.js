import { useEffect, useState } from "react";

export default function Home() {
  const [settings, setSettings] = useState({
    primary_color: "#3498db",
    secondary_color: "#2ecc71",
    font_family: "Arial, sans-serif",
    font_size: "16px",
    layout: "grid",
    header_text: "Welcome to My Blog",
  });

  useEffect(() => {
    fetch("/api/settings/get?theme_id=default_theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.primary_color) {
          setSettings(data);
        }
      });
  }, []);

  useEffect(() => {
    // Apply theme settings
    document.documentElement.style.setProperty(
      "--primary-color",
      settings.primary_color
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      settings.secondary_color
    );
    document.documentElement.style.setProperty(
      "--font-family",
      settings.font_family
    );
    document.documentElement.style.setProperty(
      "--font-size",
      settings.font_size
    );
  }, [settings]);

  return (
    <div>
      <h1>{settings.header_text}</h1>
      <p>This is a sample blog post.</p>
    </div>
  );
}
