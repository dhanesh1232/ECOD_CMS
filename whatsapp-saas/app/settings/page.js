import AccountSettings from "@/components/AccountSettings";
import WhatsAppConfiguration from "@/components/WhatsAppConfiguration";
import TeamMembers from "@/components/TeamMembers";
import BillingInformation from "@/components/BillingInformation";

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <AccountSettings />
          <WhatsAppConfiguration />
          <TeamMembers />
        </div>
        <div className="lg:col-span-1">
          <BillingInformation />
        </div>
      </div>
    </div>
  );
}
