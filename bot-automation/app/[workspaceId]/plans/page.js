"use client";
import { OverlayLoader } from "@/components/animate/overlay_loader";
import { ComparisonTable } from "@/components/plans/compareTable";
import { PlanCard } from "@/components/plans/planCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast-provider";
import { AdminServices } from "@/lib/client/admin.service";
import { billingService } from "@/lib/client/billing";
import { encryptData } from "@/lib/utils/encryption";
import {
  MessageSquare,
  MoveLeft,
  CreditCard,
  Mail,
  HelpCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [currency] = useState("INR");
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [subscription, setSubscription] = useState(null);
  const [userCred, setUserCred] = useState({});
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const toastRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profile, planData] = await Promise.all([
          billingService.getSubscription(workspaceId),
          AdminServices.getPlans(),
        ]);

        if (!profile.ok && profile.status) {
          const error = await profile.json();
          throw new Error(error.message || "Failed to fetch user credentials");
        }

        setPlans(planData.plans);
        setUserCred({
          phone: profile?.data?.user?.phone,
          email: profile?.data?.user?.email,
          name: profile?.data?.user?.name,
        });
        setSubscription(profile?.data?.subscription);
      } catch (err) {
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: err.message || "Failed to fetch data",
            variant: "destructive",
          });
          toastRef.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast, workspaceId]);

  const getPlanPrice = (plan) => {
    if (!plan?.prices) return null;
    const rawPrice = plan.prices[billingPeriod];
    return {
      raw: rawPrice,
      localized: rawPrice,
      currency,
      period: billingPeriod,
    };
  };

  const handlePlanSelection = async (plan) => {
    if (!plan.prices) return;

    const obj = {
      plan_name: encryptData(plan.id),
      em: encryptData(userCred.email),
      pn: encryptData(userCred.phone),
      id: encryptData(plan._id),
      cycle: encryptData(billingPeriod),
    };

    const params = new URLSearchParams(obj).toString();
    router.replace(`/${workspaceId}/plans/checkout?${params}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 h-full overflow-y-auto scrollbar-transparent p-0 m-0">
      <div className="max-w-7xl mx-auto space-y-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b pb-1 border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 w-fit text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <MoveLeft className="h-5 w-5" /> Back
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/${workspaceId}/settings/workspace/billing`)
              }
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <CreditCard className="sm:h-4 sm:w-4 w-3 h-3" />
              Billing
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Find Your Perfect Plan
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Choose the right solution to grow your business
              </p>
            </div>

            <div className="flex items-center relative p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                {["monthly", "yearly"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`capitalize px-4 text-sm font-medium rounded-md`}
                    isActive={billingPeriod === tab}
                    onClick={() => setBillingPeriod(tab)}
                  >
                    {tab}{" "}
                    {tab.toLowerCase() === "yearly" && (
                      <span className="ml-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-1 py-0.5 rounded-full">
                        20% OFF
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
        </div>

        {loading && plans.length === 0 ? (
          <>
            <OverlayLoader open={loading && !plans.length} />
            <div className="w-full h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((_, each) => (
                  <Skeleton
                    className="w-full h-[450px] rounded-lg"
                    key={each}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <PlanCard
                  subscription={subscription}
                  key={plan.id}
                  plan={plan}
                  cycle={billingPeriod}
                  getPlanPrice={getPlanPrice}
                  handlePlanSelection={handlePlanSelection}
                />
              ))}
            </div>
            <ComparisonTable
              plans={plans}
              subscription={subscription}
              cycle={billingPeriod}
              getPlanPrice={getPlanPrice}
            />
          </>
        )}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="h-4 w-4" />
              Need help choosing?
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Our experts can help you select the perfect plan based on your
              business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with sales
              </Button>
              <Button variant="default" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
