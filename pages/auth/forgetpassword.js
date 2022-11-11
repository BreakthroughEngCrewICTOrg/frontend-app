import React from "react";
import Link, { Router } from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// layout for page

import Auth from "layouts/Auth.js";

export default function ForgetPassword() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    phoneNo: Yup.string()
      .required("Phone Number is required")
      .min(11, "Phone Number must be at least 11 characters")
      .max(11, "Phone Number must be at most 11 characters"),

    newpassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newpassword")], "Passwords must match"),
  });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleForgetPassword = async (e, data) => {
    e.preventDefault();
    console.log(data);

    const phoneNo = data.phoneNo;
    const oldpassword = "becnewuserpassword";
    const newpassword = data.newpassword;
    const confirmpassword = data.confirmpassword;

    const updatePassword = {
      phoneNo,
      oldpassword,
      newpassword,
      confirmpassword,
    };
    console.log(updatePassword, "updatePassword");

    try {
      const response = await axios.post(
        "https://becapp-backend.onrender.com/api/auth/change/password/new",
        updatePassword
      );
      console.log(response, "response");
      if (response.status === 201) {
        alert("Password Changed Successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }

    // router.push("/admin/dashboard");
  };

  const onSubmit = (data, e) => {
    // console.log(data, "data");
    handleForgetPassword(e, data);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold"></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone number
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="phone number"
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
                      <p className="text-red-500 text-xs text- p-3 italic">
                        {errors.phoneNo.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      new password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="password"
                      {...register("newpassword")}
                    />

                    {errors.newpassword && (
                      <p className="text-red-500 text-xs text- p-3 italic">
                        {errors.newpassword.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      confirm new password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="confirm password"
                      {...register("confirmpassword")}
                    />

                    {errors.confirmpassword && (
                      <p className="text-red-500 text-xs text- p-3 italic">
                        {errors.confirmpassword.message}
                      </p>
                    )}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-brand-purple text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                {/* <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  {/* <small>Forgot password?</small> */}
                {/* </a> */}
              </div>
              {/* <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ForgetPassword.layout = Auth;
