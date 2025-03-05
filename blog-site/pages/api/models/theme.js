import mongoose from "mongoose";

delete mongoose.connection.models["ThemeSettings"];

const themeSettingsSchema = new mongoose.Schema({
  theme_id: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  last_updated: { type: Date, default: Date.now },
});

const ThemeSettings =
  mongoose.models.ThemeSettings ||
  mongoose.model("ThemeSettings", themeSettingsSchema);

export default ThemeSettings;
