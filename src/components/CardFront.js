import React from "react";
import shiny from "../img/shiny.png";
import { ReactComponent as ClubSvg } from "../svg/club.svg";
import { ReactComponent as DiamondSvg } from "../svg/diamond.svg";
import { ReactComponent as HeartSvg } from "../svg/heart.svg";
import { ReactComponent as SpadeSvg } from "../svg/spade.svg";

export default function CardFront(props) {
  const getSuitSvg = () => {
    switch (props.data.suit) {
      case "clubs":
        return ClubSvg;
      case "diamonds":
        return DiamondSvg;
      case "hearts":
        return HeartSvg;
      case "spades":
        return SpadeSvg;
      default:
        return null;
    }
  };

  const Suit = getSuitSvg();
  console.log(props.data.value);

  return (
    <div className="col-sm-3 playing-card-body">
      <div>{props.data.value}</div>
      <Suit className="lg-suit-svg " />

      <div className="row">
        <div className="col-12">
          <div className="card-inner-top">
            <Suit className="sm-suit-svg" />
            <img
              className="card-image px-0 py-0"
              src={
                props.data.isShiny
                  ? props.data.sprites.front_shiny
                  : props.data.sprites.front_default
              }
              alt={props.data.name}
              height="100"
              width="100"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="card-inner-bottom">
            <img
              className="card-image px-0 py-0 bottom-card-image"
              src={
                props.data.isShiny
                  ? props.data.sprites.front_shiny
                  : props.data.sprites.front_default
              }
              alt={props.data.name}
              height="100"
              width="100"
            />
            <Suit className="sm-suit-svg bottom-card-image" />
          </div>
        </div>
      </div>

      {/* {props.data.isShiny ? (
        <img alt="shiny" src={shiny} height="25" width="25" />
      ) : null} */}
      {/* <p>
        {props.data.name} - {props.data.suit} - {props.data.value}
      </p> */}
      <Suit className="lg-suit-svg bottom-card-image" />
      <div className="bottom-card-value">{props.data.value}</div>
    </div>
  );
}
