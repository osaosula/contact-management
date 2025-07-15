// submit-button.tsx
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React from "react"; // Import React to use React.ComponentPropsWithoutRef

export default function SubmitButton(
  {
    formAction,
    children,
    ...props
  }: {
    formAction: (formData: FormData) => void;
    children: React.ReactNode;
  } & React.ComponentPropsWithoutRef<"button"> // Use ComponentPropsWithoutRef to extend button props
) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} formAction={formAction} {...props}>
      {pending ? `${children?.toString().slice(0, -1)}ing` : children}
    </Button>
  );
}
