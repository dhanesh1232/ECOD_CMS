import * as React from "react";
import { useForm } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";

const FormContext = React.createContext(null);

function useFormContext() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be wrapped in <Form />");
  }
  return context;
}

const Form = React.forwardRef(({ children, ...props }, ref) => {
  const methods = useForm(props);
  return (
    <FormContext.Provider value={methods}>
      <form ref={ref} onSubmit={methods.handleSubmit}>
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormContext.Provider>
  );
});
Form.displayName = "Form";

const FormControl = React.forwardRef(({ asChild, ...props }, ref) => {
  const { control } = useFormContext();
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormField = React.forwardRef(
  ({ name, render, defaultValue, ...props }, ref) => {
    const methods = useFormContext();
    return (
      <div ref={ref} {...props}>
        {render({
          ...methods,
          field: {
            ...methods.register(name),
            defaultValue: methods.getValues(name) || defaultValue,
          },
        })}
      </div>
    );
  }
);
FormField.displayName = "FormField";

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={`space-y-2 ${className}`} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm font-medium text-destructive ${className}`}
      {...props}
    />
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
