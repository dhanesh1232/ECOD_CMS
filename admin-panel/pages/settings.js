import Link from "next/link";

const settings_array = [
  { name: "Theme Settings", href: "/_settings/theme_edit" },
  { name: "Customize", href: "/_settings/customize" },
];
const Settings = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-lg sm:text-xl md:text-2xl">
        Settinsg For Website Design
      </h1>
      <div className="w-full flex flex-wrap space-x-2">
        {settings_array.map((item) => {
          return (
            <Link key={item.name} href={item.href}>
              <div className="py-3 px-6 text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 w-[180px] shadow-md rounded-md h-[180px] border flex justify-center items-center">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
