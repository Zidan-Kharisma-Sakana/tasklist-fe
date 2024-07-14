import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { AxiosClient, setToken } from "../client/axios";
import { AxiosError } from "axios";

interface AuthContextType {
  user?: any;
  loading: boolean;
  loadUser: boolean;
  login: (username: string, password: string) => Promise<void>;
  signUp: (nama: string, username: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: ()=>Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadUser, setloadUser] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      if (cookies.token && (cookies.token !== "" || cookies.token !== null || cookies.token !== undefined)) {
        // get user by token, set user & isLogin
        console.info("get user by token");
        setToken(cookies.token);
        await refreshUser();
      }
      setloadUser(true);
    }
    init();
  }, []);

  async function refreshUser() {
    await AxiosClient.get("/user")
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
        console.info("get user by token successfully");
      })
      .catch((err) => {
        console.warn("failed to get user by token");
        setUser(undefined);
      });
  }

  async function login(email: string, password: string) {
    setLoading(true);
    const id = toast.loading("loading...");
    await AxiosClient.post("/login", { email, password })
      .then((response) => {
        console.info(response.data);
        setCookie("token", response.data.access_token, { maxAge: 60 * 60 * 24 });
        setToken(response.data.access_token);
        setUser(response.data.user);
        console.info("login successful");
        router.push("/");
      })
      .catch((error) => {
        console.warn("Login failed", error);
        toast.error("Login not successful");
      })
      .finally(() => {
        toast.dismiss(id);
        setLoading(false);
      });
  }

  async function signUp(name: string, email: string, password: string, password_confirmation: string) {
    setLoading(true);
    const id = toast.loading("loading...");
    const response = await AxiosClient.post("/register", { name, email, password, password_confirmation }).catch(
      (error: AxiosError) => {
        console.error(error);
        const err = (error.response?.data as any)?.errors;
        if (err) {
          Object.values(err).forEach((er) => {
            if (Array.isArray(er)) {
              er.forEach((e) => toast.error(e));
            }
          });
        } else {
          toast.error("Oops! something went wrong");
        }
      }
    );
    toast.dismiss(id);
    setLoading(false);
    if (response) {
      await login(email, password);
      router.push("/check-email");
    }
  }

  async function logout() {
    setUser(undefined);
    await AxiosClient.post("/logout");
    removeCookie("token");
    toast.success("User logged out");
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      signUp,
      logout,
      loadUser,
      refreshUser
    }),
    [user, loading, loadUser]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider
      value={memoedValue}
    >
      {children}
    </AuthContext.Provider>
  );
}
