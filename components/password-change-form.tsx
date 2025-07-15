// components/password-change-form.tsx
"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client"; // Your Supabase client setup
import toast from "react-hot-toast"; // For toast notifications
import SubmitButton from "./submit-button"; // Re-use your SubmitButton component
import { Input } from "./ui/input"; // Assuming you have a UI Input component
import { Button } from "./ui/button"; // Assuming you have a UI Button component

export default function PasswordChangeForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const supabase = createClient();

  const handlePasswordChange = useCallback(
    async (formData: FormData) => {
      const newPass = formData.get("newPassword") as string;
      const confirmPass = formData.get("confirmPassword") as string;

      if (!newPass || !confirmPass) {
        toast.error("Please enter and confirm your new password.");
        return;
      }

      if (newPass !== confirmPass) {
        toast.error("New passwords do not match.");
        return;
      }

      if (newPass.length < 6) {
        // Supabase default minimum is 6 characters
        toast.error("Password must be at least 6 characters long.");
        return;
      }

      try {
        // Call Supabase auth.updateUser to change the password
        const { error } = await supabase.auth.updateUser({
          password: newPass,
        });

        if (error) {
          console.error("Password change error:", error.message);
          toast.error(`Error changing password: ${error.message}`);
        } else {
          toast.success("Password changed successfully!");
          setNewPassword(""); // Clear the fields on success
          setConfirmPassword("");
          // Optionally, you could redirect the user or re-authenticate them.
          // For security, Supabase automatically updates the session.
        }
      } catch (err) {
        console.error("Unexpected error during password change:", err);
        toast.error("An unexpected error occurred.");
      }
    },
    [supabase]
  );

  return (
    <div className="flex justify-center min-h-fit bg-gray-50 p-8 w-full top-5">
      <div className="w-full p-20 space-y-6 bg-white rounded-lg shadow-md">
        <form action={handlePasswordChange}>
          {" "}
          {/* Use the client-side action */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <SubmitButton
              className="flex w-[400px] justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              formAction={handlePasswordChange} // Pass the client action to SubmitButton
            >
              Change Password
            </SubmitButton>
            <Button
              className="flex w-[400px] justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              type="button"
              onClick={() => {
                history.back();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
