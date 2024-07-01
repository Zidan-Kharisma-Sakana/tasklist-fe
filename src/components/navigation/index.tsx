/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavigationBar = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="w-full flex justify-between items-center text-white text-lg xl:text-xl">
      <Link href={"/"}>
        <div className="cursor-pointer ">
          <h3>Task List App</h3>
        </div>
      </Link>
      {user && <GreetUser user={user} />}
    </div>
  );
};

const GreetUser = (props: any) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <div>
      <div className="flex gap-x-4 items-center">
        <div>{`Hi ${props.user.name} !`}</div>
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer rounded-full bg-indigo-200 w-12 h-12 flex justify-center items-center text-black "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>
      <div className="relative text-base text-black">
        {open && (
          <div className="absolute right-0 top-2 bg-indigo-200 rounded-lg py-2">
            {/* <div className="flex gap-x-2 px-4 items-center p-2">
              <img src="/icons/setting.svg" className="w-4 h-4" />
              <Link href={"/user"}>Settings</Link>
            </div> */}
            <div className="flex gap-x-2 px-4 items-center p-2 cursor-pointer" onClick={logout}>
              <img src="/icons/logout.svg" className="w-4 h-4" />
              <div>Logout</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
