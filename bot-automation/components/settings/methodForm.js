"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Smartphone,
  Banknote,
  Wallet,
  Loader2,
} from "lucide-react";

const paymentMethodSchema = z.object({
  method: z.object({
    method: z.enum(["card", "upi", "netbanking", "wallet"]),
    label: z.string().max(32).optional(),
    card: z
      .object({
        last4: z.string().regex(/^\d{4}$/, "Must be last 4 digits"),
        network: z.enum([
          "visa",
          "mastercard",
          "amex",
          "rupay",
          "discover",
          "jcb",
          "diners",
        ]),
        type: z.enum(["credit", "debit", "prepaid"]),
        issuer: z.string().optional(),
        expiryMonth: z.number().min(1).max(12),
        expiryYear: z.number().min(new Date().getFullYear()),
        isInternational: z.boolean().optional(),
      })
      .optional(),
    upi: z
      .object({
        vpa: z.string().regex(/^[\w.-]+@[\w]+$/, "Invalid VPA format"),
        handle: z.string().optional(),
      })
      .optional(),
    netbanking: z
      .object({
        bank: z.string(),
        ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format"),
        accountNumberLast4: z
          .string()
          .regex(/^\d{4}$/, "Must be last 4 digits"),
      })
      .optional(),
    wallet: z
      .object({
        provider: z.enum([
          "paytm",
          "phonepe",
          "amazonpay",
          "mobikwik",
          "freecharge",
        ]),
        phoneLast4: z.string().regex(/^\d{4}$/, "Must be last 4 digits"),
      })
      .optional(),
  }),
});

export function PaymentMethodForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const [methodType, setMethodType] = useState(
    initialValues.method?.method || "card"
  );

  const form = useForm({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: initialValues.method
      ? {
          method: {
            ...initialValues.method,
            card: initialValues.method.card || {},
            upi: initialValues.method.upi || {},
            netbanking: initialValues.method.netbanking || {},
            wallet: initialValues.method.wallet || {},
          },
        }
      : {
          method: {
            method: "card",
            card: {},
            upi: {},
            netbanking: {},
            wallet: {},
          },
        },
  });

  const getMethodIcon = (method) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "upi":
        return <Smartphone className="h-4 w-4" />;
      case "netbanking":
        return <Banknote className="h-4 w-4" />;
      case "wallet":
        return <Wallet className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const renderMethodFields = () => {
    switch (methodType) {
      case "card":
        return (
          <Card className="mt-4">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="method.card.last4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last 4 Digits</FormLabel>
                      <FormControl>
                        <Input placeholder="4242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method.card.network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Network</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "visa",
                            "mastercard",
                            "amex",
                            "rupay",
                            "discover",
                            "jcb",
                            "diners",
                          ].map((network) => (
                            <SelectItem key={network} value={network}>
                              {network.charAt(0).toUpperCase() +
                                network.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="method.card.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["credit", "debit", "prepaid"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method.card.expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Month</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          placeholder="MM"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="method.card.expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={new Date().getFullYear()}
                        placeholder="YYYY"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );
      case "upi":
        return (
          <Card className="mt-4">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                UPI Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="method.upi.vpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input placeholder="username@upi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );
      case "netbanking":
        return (
          <Card className="mt-4">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Netbanking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="method.netbanking.bank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="method.netbanking.ifsc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code</FormLabel>
                      <FormControl>
                        <Input placeholder="ABCD0123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method.netbanking.accountNumberLast4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last 4 Digits</FormLabel>
                      <FormControl>
                        <Input placeholder="1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        );
      case "wallet":
        return (
          <Card className="mt-4">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="method.wallet.provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Provider</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "paytm",
                          "phonepe",
                          "amazonpay",
                          "mobikwik",
                          "freecharge",
                        ].map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider.charAt(0).toUpperCase() +
                              provider.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="method.wallet.phoneLast4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last 4 Digits of Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="method.method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setMethodType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["card", "upi", "netbanking", "wallet"].map((method) => (
                        <SelectItem key={method} value={method}>
                          <div className="flex items-center gap-2">
                            {getMethodIcon(method)}
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method.label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Primary Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {renderMethodFields()}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Payment Method"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
}
