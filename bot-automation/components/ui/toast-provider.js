// components/ui/toast-provider.jsx
"use client";
import { createContext, useState, useContext, useEffect } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((current) => current.slice(1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg flex items-start gap-3 min-w-[300px] ${
              toast.variant === "destructive"
                ? "bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800/30"
                : "bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
            }`}
          >
            <div className="flex-1">
              {toast.title && (
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {toast.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
