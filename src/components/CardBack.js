import React from "react";
// import { ReactComponent as CardbackSvg } from "../svg/cardBack.svg";
import cardbackSvg from "../svg/cardBack.svg";

export default function CardBack(props) {
  return (
    <div
      className={`${
        props.horizontal ? "horizontal" : ""
      } col px-0 playing-card-body`}
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url(${cardbackSvg})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="circleBase">
        {" "}
        <img
          className="card-image px-0 py-0"
          src={
            props.data.isShiny
              ? props.data.sprites.back_shiny
              : props.data.sprites.back_default
          }
          alt={props.data.name}
        />
      </div>
    </div>
  );
}
