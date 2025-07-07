import { useRouter } from "next/navigation";

type mode = {
  mode: string;
};

const LoginButton: React.FC<mode> = ({ mode }) => {
  const router = useRouter();

  const handleSwitch = () => {
    const nextMode = mode === "login" ? "signup" : "login";
    router.push(`/login?mode=${nextMode}`);
  };
  return (
    <button
      onClick={handleSwitch}
      className="mt-4 text-blue-500 underline text-sm"
    >
      {mode === "login"
        ? "Don't have an account? Sign up"
        : "Already have an account? Log in"}
    </button>
  );
};
export default LoginButton;
