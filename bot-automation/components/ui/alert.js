import * as React from "react";

const Alert = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`alert alert-${variant} ${className}`}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={`alert-title ${className}`} {...props} />;
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={`alert-description ${className}`} {...props} />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
