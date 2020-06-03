import React from "react";
import shiny from "../img/shiny.png";
import { ReactComponent as ClubSvg } from "../svg/club.svg";
import { ReactComponent as DiamondSvg } from "../svg/diamond.svg";
import { ReactComponent as HeartSvg } from "../svg/heart.svg";
import { ReactComponent as SpadeSvg } from "../svg/spade.svg";
import CardHalf from "./CardHalf";

export default function CardFront(props) {
  return (
    <div className="col playing-card-body">
      <CardHalf data={props.data} />
      <div className="shiny-box">
        {" "}
        {props.data.isShiny ? (
          <img alt="shiny" src={shiny} height="35" width="35" />
        ) : null}
      </div>

      <CardHalf data={props.data} isFlipped={true} />
    </div>
  );
}
