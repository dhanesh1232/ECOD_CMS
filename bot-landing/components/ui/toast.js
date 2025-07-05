// components/ui/toast-provider.jsx
"use client";
import { createContext, useState, useContext } from "react";
import { X, Info, XCircle, CheckCircle, AlertTriangle } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-[100]">
        {toasts.map((toast) => {
          let Icon;
          let borderColor;
          let iconColor;

          switch (toast.variant) {
            case "destructive":
              Icon = XCircle;
              borderColor = "border-red-500";
              iconColor = "text-red-500";
              break;
            case "success":
              Icon = CheckCircle;
              borderColor = "border-green-500";
              iconColor = "text-green-500";
              break;
            case "warning":
              Icon = AlertTriangle;
              borderColor = "border-orange-500";
              iconColor = "text-orange-500";
              break;
            default:
              Icon = Info;
              borderColor = "border-blue-500";
              iconColor = "text-blue-500";
          }

          return (
            <div
              key={toast.id}
              className={`group relative p-4 pr-8 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-l-4 ${borderColor} min-w-[300px] transition-all`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 flex-shrink-0 ${iconColor}`} />
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
                <button
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className={`h-full ${iconColor.replace("text", "bg")}`}
                  style={{
                    animation: `progress ${3000}ms linear forwards`,
                  }}
                />
              </div>
            </div>
          );
        })}
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
