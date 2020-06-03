import React from "react";
// import { ReactComponent as CardbackSvg } from "../svg/cardBack.svg";
import cardbackSvg from "../svg/cardBack.svg";

export default function CardBack() {
  return (
    <div
      className="col-3 px-0"
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url(${cardbackSvg})`,
        backgroundRepeat: "repeat",
      }}
    ></div>
  );
}
