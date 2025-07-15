// app/account/password-change/page.tsx (example path)
import PasswordChangeForm from "@/components/password-change-form";
import { Toaster } from "react-hot-toast"; // Don't forget to render the Toaster!

export default function ChangePasswordPage() {
  return (
    <>
      <PasswordChangeForm />
      <Toaster />{" "}
      {/* Place Toaster component high up in your app, e.g., in layout.tsx */}
    </>
  );
}
