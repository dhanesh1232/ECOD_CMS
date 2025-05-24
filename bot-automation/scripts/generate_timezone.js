// scripts/generate-timezones.js
import { writeFileSync } from "fs";
import { getTimeZones } from "@vvo/tzdb";
import { format } from "date-fns-tz";

/**
 * @typedef {Object} Timezone
 * @property {string} value - IANA timezone identifier (e.g., "America/New_York")
 * @property {string} label - Display name (e.g., "Eastern Time (ET)")
 * @property {string} abbreviation - Timezone abbreviation (e.g., "ET")
 * @property {string} alternativeName - Full timezone name (e.g., "Eastern Time")
 * @property {string} continent - Continent portion of IANA identifier
 * @property {number} offset - UTC offset in minutes
 * @property {string} offsetFormatted - Formatted UTC offset (e.g., "UTC-05:00")
 * @property {number} offsetHours - UTC offset in decimal hours
 * @property {string} currentTime - Current time in this zone (HH:mm format)
 * @property {boolean} isDST - Whether daylight saving time is active
 */

/**
 * Generates timezone data and saves as both JSON and JS module
 */
function generateTimezones() {
  try {
    const now = new Date();
    const timezones = getTimeZones()
      .map((tz) => {
        const offsetHours = tz.rawOffsetInMinutes / 60;
        const offsetFormatted = format(now, "XXX", { timeZone: tz.name });

        return {
          value: tz.name,
          label: `${tz.alternativeName} (${tz.abbreviation})`,
          abbreviation: tz.abbreviation,
          alternativeName: tz.alternativeName,
          continent: tz.name.split("/")[0],
          offset: tz.rawOffsetInMinutes,
          offsetFormatted: `UTC${offsetFormatted}`,
          offsetHours,
          currentTime: format(now, "HH:mm", { timeZone: tz.name }),
          isDST: tz.currentTimeOffsetInMinutes !== tz.rawOffsetInMinutes,
        };
      })
      .sort((a, b) => a.offset - b.offset || a.label.localeCompare(b.label));

    // Save as JSON
    writeFileSync(
      "./public/timezones.json",
      JSON.stringify(timezones, null, 2),
      { encoding: "utf-8" }
    );

    // Save as JS module with TypeScript type
    const jsContent = `// Auto-generated file - DO NOT EDIT
// Generated at ${new Date().toISOString()}

/**
 * @type {Array<Timezone>}
 */
export const timezones = ${JSON.stringify(timezones, null, 2)};

/**
 * @typedef {${JSON.stringify(timezones[0], null, 2).replace(
   /"(value|label|abbreviation|alternativeName|continent|offset|offsetFormatted|offsetHours|currentTime|isDST)":/g,
   "$1:"
 )}} Timezone
 */
`;

    writeFileSync("./data/timezones.js", jsContent, { encoding: "utf-8" });

    console.log(`✅ Generated ${timezones.length} timezones to:
- public/timezones.json
- data/timezones.js`);

    return timezones;
  } catch (error) {
    console.error("❌ Failed to generate timezones:", error.message);
    process.exit(1);
  }
}

generateTimezones();
