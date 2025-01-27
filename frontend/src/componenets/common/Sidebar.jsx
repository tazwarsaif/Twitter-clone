import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import XSvg from "../svgs/X";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const {
    mutate: Logout,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error("Log out failed!");
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-black hover:bg-stone-900 hover:fill-white" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8 text-gray-500 hover:text-white transition-colors duration-200" />

              <span className="text-lg hidden md:block  hover:text-white">
                Home
              </span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-8 h-8 text-gray-500 hover:text-white transition-colors duration-200" />
              <span className="text-lg hidden md:block hover:text-white">
                Notifications
              </span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-8 h-8 text-gray-500 hover:text-white transition-colors duration-200" />
              <span className="hover:text-white text-lg hidden md:block">
                Profile
              </span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-gray-400 hover:text-white font-bold text-sm w-20 truncate">
                  {authUser?.fullName}
                </p>
                <p className="text-slate-500 text-sm hover:text-white">
                  @{authUser?.username}
                </p>
              </div>
              <BiLogOut
                className="w-8 h-8 text-gray-500 hover:text-white transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  Logout();
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
