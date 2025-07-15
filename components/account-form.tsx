// account-form.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { updateUserProfile } from "@/app/account/actions"; // Assuming this path
import SubmitButton from "./submit-button";
import { useActionState } from "react"; // Import useActionState
import toast from "react-hot-toast"; // Import react-hot-toast

// Define the FormState interface (make sure this matches the one in actions.ts)
interface FormState {
  success: boolean | null;
  message: string;
}

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  // const [loading, setLoading] = useState(true); // Remove local loading state, use useFormStatus instead
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | "">("");
  const router = useRouter();

  // Initialize useActionState
  const [state, formAction] = useActionState<FormState, FormData>(
    updateUserProfile,
    {
      success: null,
      message: "",
    }
  );

  const getProfile = useCallback(async () => {
    // setLoading(true); // Remove setLoading here
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, phone, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.error("Error fetching profile:", error); // Use console.error
        toast.error("Error loading user data!"); // Display toast for fetch error
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setPhone(data.phone);
        setAvatarUrl(data?.avatar_url || ""); // Ensure default is empty string
      }
    } catch (error) {
      console.error(error);
      // alert("Error loading user data!"); // Replaced by toast.error above
    } finally {
      // setLoading(false); // Remove setLoading here
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  // useEffect to handle server action response and display toasts
  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      // Optionally redirect after success, or just let the revalidation update the UI
      router.push("/"); // Redirect to home or dashboard after successful update
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state, router]); // Depend on state to react to server action results

  return (
    <div className="flex justify-center  min-h-fit bg-gray-50 p-8 w-full top-5">
      {/* Centering container */}
      <div className="w-full p-20 space-y-6 bg-white rounded-lg ">
        {/* Form container */}
        <form action={formAction}>
          {" "}
          {/* Link form to the formAction */}
          <h2 className="text-2xl font-bold text-gray-900">
            Update your account details
          </h2>
          <div className="space-y-4">
            {" "}
            {/* Container for form fields */}
            <div>
              <input
                type="hidden"
                id="avatar_url"
                name="avatar_url"
                value={avatar_url}
                className="hidden"
              />
              <input type="hidden" id="id" name="id" value={user?.id || ""} />{" "}
              {/* Ensure id is always a string */}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={user?.email || ""} // Ensure value is always a string
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName" // Ensure name attribute matches formData.get() in Server Action
                type="text"
                value={fullname || ""}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username" // Ensure name attribute matches formData.get() in Server Action
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone" // Changed htmlFor to 'phone' for consistency
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone" // Changed id to 'phone' for consistency
                type="text" // Changed type to 'text' as 'phone' is not a standard HTML input type
                name="phone" // Ensure name attribute matches formData.get() in Server Action
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="space-y-4">
            {" "}
            {/* Container for buttons */}
            <SubmitButton
              className=" flex w-[400px] justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              formAction={formAction} // Link to the formAction from useActionState
              // disabled={loading} // Remove disabled={loading}, useFormStatus handles this
            >
              Update
            </SubmitButton>
            <Button
              className=" flex w-[400px] justify-center py-2 px-4 border border-gray-300 rounded-md  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              type="button"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
