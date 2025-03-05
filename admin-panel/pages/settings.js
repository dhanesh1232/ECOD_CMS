import Link from "next/link";

const settings_array = [
  { name: "Theme Settings", href: "/theme_edit" },
  { name: "Customize", href: "/customize" },
];
const Settings = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-lg sm:text-xl md:text-2xl mb-2">
        Settinsg For Website Design
      </h1>
      <hr className="border" />
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {settings_array.map((item) => (
          <Link key={item.name} href={`/_settings${item.href}`}>
            <div className="py-3 px-6 text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 w-full shadow-md rounded-md h-[180px] border flex justify-center items-center">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;
