import React from "react";

export default function ButtonSpecial({ image }) {
  return (
    <div className={`card`}>
      Special Button {image && <img src={image} className="ml-3 h-5 w-5" />}
    </div>
  );
}
