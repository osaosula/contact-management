import SignUpForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <h1 className="flex text-2xl font-bold mb-4 justify-center">
        CONTACT MANAGEMENT SIGNUP
      </h1>
      <SignUpForm />;
    </div>
  );
}
