import { LoginForm } from "@/components/form/login";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  return (
    <div className="flex justify-center w-full h-[80vh] items-center">
      <LoginForm />
    </div>
  );
}
