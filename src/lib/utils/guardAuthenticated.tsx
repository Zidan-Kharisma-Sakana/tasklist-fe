import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export const guardAuthenticated = (ChildWithProps: React.ComponentType<any>) => {
  const WithProtection: React.FC = (props) => {
    const router = useRouter();
    const { user, loadUser } = useAuth();

    useEffect(() => {
      console.log(loadUser, user);
      if (loadUser && !user) {
        router.push("/login");
      } else if (loadUser && user && !user.email_verified_at) {
        router.push("/check-email");
      }
    }, [loadUser, user, router]);

    return !!user ? (
      <ChildWithProps {...props} />
    ) : (
      <main className="flex h-[80vh] flex-col items-center justify-center">
        <div className="loader w-40 h-40"></div>
      </main>
    );
  };
  return WithProtection;
};
