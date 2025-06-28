"use client";

import { useState } from "react";
import {
  CreditCard,
  AlertTriangle,
  RotateCw,
  Loader,
  Wallet,
  IndianRupee,
  CheckCircle,
  XCircle,
  HelpCircle,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const PaymentMethodForm = ({
  subscription,
  onUpdatePaymentMethod,
  onAddPaymentMethod,
  onSetDefaultPaymentMethod,
  paymentMethods = [],
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("current");

  const handleUpdate = async () => {
    setIsProcessing(true);
    try {
      await onUpdatePaymentMethod();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddNew = async () => {
    setIsProcessing(true);
    try {
      await onAddPaymentMethod();
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentMethodIcon = (type) => {
    const icons = {
      card: <CreditCard className="h-5 w-5" />,
      upi: <IndianRupee className="h-5 w-5" />,
      wallet: <Wallet className="h-5 w-5" />,
      netbanking: <Banknote className="h-5 w-5" />,
      default: <CreditCard className="h-5 w-5" />,
    };
    return icons[type] || icons.default;
  };

  const renderPaymentMethodDetails = (method) => {
    return (
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-secondary text-secondary-foreground">
          {getPaymentMethodIcon(method.type)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">
              {method.brand || method.name || "Payment Method"}
            </h4>
            <Badge variant="outline" className="text-xs">
              {method.type.toUpperCase()}
            </Badge>
            {method.isDefault && (
              <Badge variant="secondary" className="text-xs">
                DEFAULT
              </Badge>
            )}
          </div>

          {method.type === "card" && (
            <>
              <p className="text-sm text-muted-foreground">
                Ending in {method.last4}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {method.expMonth?.toString().padStart(2, "0")}/
                {method.expYear?.toString().slice(-2)}
              </p>
            </>
          )}

          {method.type === "upi" && (
            <p className="text-sm text-muted-foreground">
              UPI ID: {method.upiId || "••••••••@upi"}
            </p>
          )}

          {method.type === "netbanking" && (
            <p className="text-sm text-muted-foreground">
              {method.bankName || "Bank Account"}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderCurrentPaymentMethod = () => {
    if (!subscription?.paymentMethod) {
      return (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No payment method</AlertTitle>
          <AlertDescription>
            Please add a payment method to continue your subscription.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Active Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderPaymentMethodDetails(subscription.paymentMethod)}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3">
          {subscription.status === "past_due" && (
            <Alert variant="destructive" className="w-full">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Payment Required</AlertTitle>
              <AlertDescription>
                Your last payment failed. Update your payment method to avoid
                service interruption.
              </AlertDescription>
            </Alert>
          )}

          {subscription.paymentMethod.expiresSoon && (
            <Alert variant="warning" className="w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Card Expiring Soon</AlertTitle>
              <AlertDescription>
                Your card expires on {subscription.paymentMethod.expMonth}/
                {subscription.paymentMethod.expYear}. Update it to avoid
                disruption.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-wrap gap-3 w-full">
            <Button
              onClick={handleUpdate}
              disabled={isProcessing}
              variant={
                subscription.status === "past_due" ? "destructive" : "default"
              }
              className="gap-2"
            >
              {isProcessing ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCw className="h-4 w-4" />
              )}
              {subscription.status === "past_due"
                ? "Fix Payment Method"
                : "Update"}
            </Button>

            <Button variant="outline" onClick={handleAddNew} className="gap-2">
              <CreditCard className="h-4 w-4" />
              Add New Method
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open("/docs/payment-methods", "_blank")}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn about payment methods</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    );
  };

  const renderSavedPaymentMethods = () => {
    if (paymentMethods.length === 0) {
      return (
        <Alert>
          <AlertTitle>No saved payment methods</AlertTitle>
          <AlertDescription>
            {`You don't have any saved payment methods yet.`}
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">
                  {method.brand || method.type}
                </CardTitle>
                {method.isDefault && <Badge variant="secondary">DEFAULT</Badge>}
              </div>
            </CardHeader>
            <CardContent>{renderPaymentMethodDetails(method)}</CardContent>
            <CardFooter className="flex gap-3">
              {!method.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetDefaultPaymentMethod(method.id)}
                  disabled={isProcessing}
                >
                  Set as Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdatePaymentMethod(method.id)}
                disabled={isProcessing}
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Payment Methods</h3>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "current" ? "outline" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("current")}
          >
            Current
          </Button>
          <Button
            variant={activeTab === "saved" ? "outline" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </Button>
        </div>
      </div>

      {!subscription && activeTab === "current" ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      ) : activeTab === "current" ? (
        renderCurrentPaymentMethod()
      ) : (
        renderSavedPaymentMethods()
      )}

      {subscription?.status === "active" && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Your subscription is active</span>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
