import ContactList from "@/components/ContactList";
import ContactImport from "@/components/ContactImport";
import ContactGroups from "@/components/ContactGroups";

export default function Contacts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Contact Management
        </h1>
        <ContactImport />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <ContactGroups />

        <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow">
          <ContactList />
        </div>
      </div>
    </div>
  );
}
