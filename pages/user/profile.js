import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import { useDispatch } from "react-redux";

// layout for page

import User from "layouts/User.js";

export default function Profile() {
  let userToken;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    userToken = localStorage.getItem("token");
  }
  console.log(userToken);

  const fetcher = (url, token) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);

  const { data, error, loading } = useSWR(
    ["http://localhost:3500/bio-data/getby/userid", userToken],
    fetcher
  );

  const dispatch = useDispatch();
  // dispatch()

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data, "userdata");

  return (
    <>
      <User>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            <CardSettings data={data?.data} />
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <CardProfile data={data?.data} />
          </div>
        </div>
      </User>
    </>
  );
}

// Profile.layout = Admin;
