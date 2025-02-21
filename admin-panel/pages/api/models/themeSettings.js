import mongoose from "mongoose";

const themeSettingsSchema = new mongoose.Schema({
  theme_id: { type: String, required: true, unique: true },
  settings: { type: Object, required: true },
});

const ThemeSettings =
  mongoose.models.ThemeSettings ||
  mongoose.model("ThemeSettings", themeSettingsSchema);

export default ThemeSettings;
