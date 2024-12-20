import React from "react";
import { useLocation } from "react-router-dom";

export const UndefinedRoutePage = () => {
  const location = useLocation();
  return (
    <div className="w-full  flex flex-col py-60">
      <h1 className=" text-center text-3xl text-darknavyblue">
        Page ( "{location.pathname}" ) Development in Progress
      </h1>
      <p className="text-center text-xl text-neonblue my-5"> - By Hyperverge</p>
    </div>
  );
};
