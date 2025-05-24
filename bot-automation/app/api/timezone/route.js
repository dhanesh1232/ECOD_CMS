import { getTimeZones } from "@vvo/tzdb";
import { format, utcToZonedTime } from "date-fns-tz";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const timezones = await generateTimezones();
    return NextResponse.json(timezones, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error generating timezones:", error);
    return NextResponse.json(
      { message: "Failed to fetch timezone data" },
      { status: 500 }
    );
  }
}

function generateTimezones() {
  try {
    const now = new Date();
    return getTimeZones()
      .map((tz) => {
        const offsetFormatted = format(now, "XXX", { timeZone: tz.name });
        return {
          value: tz.name,
          label: `${tz.alternativeName} (${tz.abbreviation})`,
          offset: tz.rawOffsetInMinutes,
          offsetFormatted: `UTC${offsetFormatted}`,
          currentTime: format(now, "HH:mm", { timeZone: tz.name }),
          isDST: tz.currentTimeOffsetInMinutes !== tz.rawOffsetInMinutes,
        };
      })
      .sort((a, b) => a.offset - b.offset || a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Timezone generation failed:", error);
    throw new Error("Failed to process timezone data");
  }
}
