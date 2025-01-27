import { useMutation, useQueryClient } from "@tanstack/react-query";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import XSvg from "../../../componenets/svgs/X";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to Log in");
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto flex h-screen px-10 py-50">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <div className="flex-1 px-10 hidden lg:flex items-center  justify-center">
              <XSvg className=" lg:w-2/3 fill-black" />
            </div>
          </figure>
          <div className="w-100 card-body items-center text-center">
            <div className="flex-1 gap-10">
              <h2 className="text-3xl font-bold card-title mb-5">Log in</h2>
              <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2 mb-6 w-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>

                  <input
                    type="text"
                    name="username"
                    className="grow"
                    placeholder="username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 mb-6 w-80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                </label>
                <div className="card-actions">
                  <button className="w-full btn rounded-full btn-neutral text-white">
                    {isPending ? "Loading..." : "Log in"}
                  </button>
                  {isError && <p className="text-red-500">{error.message}</p>}
                </div>
              </form>
              <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
                <p className="text-gray-700 text-lg">Do not have an account?</p>
                <Link to="/signup">
                  <button className="btn rounded-full btn-ghost text-black btn-outline w-80">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
