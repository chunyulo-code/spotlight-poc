"use client";
import React from "react";
import Spotlight from "./spotlight";

export default function page() {
  return (
    <div>
      <div className="w-[150px] h-[150px] ml-auto border border-stone-600 rounded-md">
        <Spotlight />
      </div>
    </div>
  );
}
