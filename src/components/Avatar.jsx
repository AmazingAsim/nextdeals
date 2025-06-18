"use client";

import React, { useMemo } from "react";

export default function Avatar({ name = "?" }) {
  const randomColor = useMemo(() => {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
  }, []);

  return (
    <div
      className="rounded-circle text-white d-flex justify-content-center align-items-center"
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: randomColor,
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      {name[0]?.toUpperCase()}
    </div>
  );
}
