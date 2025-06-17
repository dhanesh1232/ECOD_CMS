"use client";

import { Minus, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/toast-provider";
import { billingService } from "@/lib/client/billing";
import { SpinnerIcon } from "@/public/Images/svg_ecod";

export default function CouponInput({
  workspaceId,
  plan,
  applied,
  shown,
  onShown,
  discount,
  onApplied,
}) {
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    applying: false,
    error: "",
    success: false,
  });
  const [data, setData] = useState(null);
  const showToast = useToast();
  const toastRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      toastRef.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shown && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shown]);

  const handleApply = async () => {
    try {
      if (!value.trim()) {
        setState((prev) => ({ ...prev, error: "Please enter a coupon code." }));
        return;
      }
      setState((prev) => ({ ...prev, applying: true, error: "" }));

      const res = await billingService.validateCoupon(
        workspaceId,
        value,
        plan._id
      );

      if (!res.ok && res.status) {
        if (!toastRef.current) {
          showToast({
            title: "Invalid Coupon",
            description: "The coupon code you entered is not valid",
            variant: "destructive",
          });
          toastRef.current = true;
        }
        setState((prev) => ({
          ...prev,
          error: "Invalid coupon code",
          applying: false,
          success: false,
        }));
        return;
      }

      setData(res.data);
      onApplied(res.data);
      setState((prev) => ({
        ...prev,
        success: true,
        error: "",
      }));

      showToast({
        title: "Coupon Applied",
        description: "Your discount has been applied successfully",
        variant: "success",
      });
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        toastRef.current = true;
      }
      setState((prev) => ({
        ...prev,
        error: "Failed to apply coupon",
        success: false,
      }));
    } finally {
      setState((prev) => ({ ...prev, applying: false }));
    }
  };

  const handleRemoveCoupon = () => {
    setValue("");
    setData(null);
    onApplied(null);
    setState({ applying: false, error: "", success: false });
  };

  return (
    <div className="w-full">
      {!applied ? (
        shown ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="coupon" className="text-sm font-medium">
                Discount Code
              </Label>
              <Button
                onClick={() => {
                  setState((prev) => ({ ...prev, error: "", success: false }));
                  onShown(false);
                }}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                aria-label="Close coupon input"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  id="coupon"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setState((prev) => ({
                      ...prev,
                      error: "",
                      success: false,
                    }));
                  }}
                  type="text"
                  placeholder="Enter coupon code"
                  className="pr-10"
                  disabled={state.applying}
                  aria-invalid={!!state.error}
                />
                {state.success && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
                {state.error && (
                  <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                )}
              </div>
              <Button
                variant={state.success ? "outline" : "default"}
                onClick={state.success ? handleRemoveCoupon : handleApply}
                disabled={state.applying}
                className="min-w-[80px]"
              >
                {state.applying ? (
                  <SpinnerIcon className="h-4 w-4 animate-spin" />
                ) : state.success ? (
                  "Remove"
                ) : (
                  "Apply"
                )}
              </Button>
            </div>

            {state.error && (
              <p className="text-sm text-destructive mt-1">{state.error}</p>
            )}
          </div>
        ) : (
          <Button
            variant="link"
            size="sm"
            onClick={() => onShown(true)}
            className="text-primary hover:text-primary/80 p-0 h-auto"
          >
            Have a coupon code?
          </Button>
        )
      ) : (
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/50">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium">Coupon Applied</p>
              <p className="text-xs text-muted-foreground">{applied.code}</p>
            </div>
          </div>
          <div className="text-green-600 dark:text-green-400 font-medium">
            -₹
            {discount.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}{" "}
            {applied.value && applied.type === "percent" && (
              <span className="text-sm text-muted-foreground">
                ({applied.value})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
