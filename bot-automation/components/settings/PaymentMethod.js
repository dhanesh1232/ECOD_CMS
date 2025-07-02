"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CreditCard,
  Smartphone,
  Banknote,
  Wallet,
} from "lucide-react";
import { useToast } from "../ui/toast-provider";
import { PaymentMethodForm } from "./methodForm";

export default function PaymentMethod({ paymentMethod, onSetPaymentMethod }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toastRef = useRef(false);
  const showToast = useToast();

  useEffect(() => {
    setTimeout(() => {
      toastRef.current = false;
    }, 1000);
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/payment-method/${params.workspaceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save payment method");
      }

      const data = await response.json();
      onSetPaymentMethod(data.data);
      setIsEditing(false);

      showToast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error:", error);
      showToast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border rounded-lg">
        <CardHeader className="border-b p-2 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-semibold">
                Payment Method
              </CardTitle>
            </div>
            {/*!isEditing && (
              <Button
                variant={paymentMethod ? "outline" : "default"}
                onClick={() => setIsEditing(true)}
                disabled={loading}
                size="sm"
                className="shrink-0"
              >
                {paymentMethod ? "Edit" : "Add"} Method
              </Button>
            )*/}
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {isEditing ? (
            <PaymentMethodForm
              initialValues={paymentMethod || {}}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditing(false)}
              isSubmitting={loading}
            />
          ) : (
            <PaymentMethodDisplay method={paymentMethod} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentMethodDisplay({ method }) {
  if (!method) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CreditCard className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          No payment method configured yet.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Add a payment method to enable subscriptions and purchases.
        </p>
      </div>
    );
  }

  const getMethodIcon = () => {
    switch (method.method.method) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "upi":
        return <Smartphone className="h-5 w-5" />;
      case "netbanking":
        return <Banknote className="h-5 w-5" />;
      case "wallet":
        return <Wallet className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getMethodDetails = () => {
    switch (method.method.method) {
      case "card":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Card:</span>
              <span>•••• {method.method.card.last4}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Network:</span>
              <span className="capitalize">{method.method.card.network}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Type:</span>
              <span className="capitalize">{method.method.card.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Expires:</span>
              <span>
                {method.method.card.expiryMonth}/{method.method.card.expiryYear}
              </span>
            </div>
          </div>
        );
      case "upi":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">UPI ID:</span>
              <span>{method.method.upi.vpa}</span>
            </div>
          </div>
        );
      case "netbanking":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Bank:</span>
              <span>{method.method.netbanking.bank}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Account:</span>
              <span>•••• {method.method.netbanking.accountNumberLast4}</span>
            </div>
          </div>
        );
      case "wallet":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Wallet:</span>
              <span className="capitalize">
                {method.method.wallet.provider}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Phone:</span>
              <span>•••• {method.method.wallet.phoneLast4}</span>
            </div>
          </div>
        );
      default:
        return <p>Unknown payment method</p>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
          {getMethodIcon()}
        </div>
        <div>
          <h3 className="text-lg font-bold uppercase">
            {method.method.method}
          </h3>
          {method.method.label && (
            <p className="text-sm text-muted-foreground">
              {method.method.label}
            </p>
          )}
        </div>
      </div>
      <div className="ml-11 pl-1 space-y-3 text-sm">{getMethodDetails()}</div>
    </div>
  );
}
