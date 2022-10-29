import React, { useEffect } from "react";
import Link, { Router } from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const router = useRouter();
  const userPhoneNo = useRef();
  const userPassword = useRef();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(userPassword, "ref");

  let userToken;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    userToken = localStorage.getItem("token");
  }
  useEffect(() => {
    // redirect to home if already logged in
    if (userToken) {
      router.push("/user/profile");
    }
  }, []);

  const handleUserLogin = async (e, data) => {
    e.preventDefault();
    const phoneNo = data.phoneNo;
    const password = data.password;
    const user = { phoneNo, password };
    console.log(user, "user");

    try {
      const response = await axios.post(
        "http://localhost:3500/api/auth/login",
        user
      );
      console.log(response, "response");
      if (response.status === 201) {
        if (response.data.statusCode === 400) {
          console.log(`${response.data.errorMessage}`);

          window.alert(`${response.data.errorMessage}`);
          // window.location.href = "/auth/forgetpassword";
        } else {
          router.push("/user/profile");
          localStorage.setItem("token", response.data.token);
        }
      }
    } catch (err) {
      alert(err);
    }
  };
  // const { data, error } = useSWR(
  //   "http://localhost:3500/api/auth/login",
  //   async (url) => {
  //     const response = await axios.post(url, user);
  //     return response.data;
  //   }
  // );
  // console.log(data, "data");
  // console.log(error, "error");

  // router.push("/user/dashboard");

  const onSubmit = (data,e) => {
    console.log(data, "data");

    handleUserLogin(e,data);

  };

  return (
    <>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold"></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text- p-3 font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone number
                    </label>

                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone number"
                      // ref={userPhoneNo}
                      {...register("phoneNo", {
                        required: "Phone number is required",
                        minLength: {
                          value: 11,
                          message: "Phone number must be 11 digits",
                        },
                        maxLength: {
                          value: 11,
                          message: "Phone number must be 11 digits",
                        },
                      })}
                    />

                    {errors.phoneNo && (
                      <p className="text-red-500 text-xs p-3 italic">
                        {errors.phoneNo.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text- p-3 font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      // ref={userPassword}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be 6 digits",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password must be 10 digits",
                        },
                      })}
                    />

                    {errors.password && (
                      <p className="text-red-500 text- p-3 italic">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-brand-purple text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={handleUserLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/auth/forgetpassword");
                  }}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                {/* <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
