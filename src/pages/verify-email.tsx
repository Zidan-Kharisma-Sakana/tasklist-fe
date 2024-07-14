import { AxiosClient } from "@/lib/client/axios";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    async function validate() {
      console.log(router.asPath);
      const pathname = router.asPath.split('verify-email?url=')[1];
      await AxiosClient.get(process.env.NEXT_PUBLIC_BACKEND_API_URL +'/verify-email/'+ pathname)
        .then(refreshUser)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error validating");
        });
    }
    if (router.query && user) {
      validate();
    }
  }, [router.query, user]);

  return <div></div>;
}
