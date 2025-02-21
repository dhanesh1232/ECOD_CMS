import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/pages")
      .then((res) => setPages(res.data));
  }, []);

  const updateTheme = async () => {
    await axios.put(`http://localhost:4000/api/pages/${selectedPage}`, {
      theme,
    });
    alert("Theme updated!");
  };

  return (
    <div>
      <h1>Manage Pages & Themes</h1>
      <select onChange={(e) => setSelectedPage(e.target.value)}>
        <option>Select Page</option>
        {pages.map((page) => (
          <option key={page._id} value={page.slug}>
            {page.title}
          </option>
        ))}
      </select>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option>Select Theme</option>
        <option value="nature-theme">Nature</option>
        <option value="tech-theme">Tech</option>
        <option value="minimal-theme">Minimal</option>
      </select>
      <button onClick={updateTheme}>Save</button>
    </div>
  );
}
