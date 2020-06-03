import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDealerHand, selectDealerTotal } from "./dealerSlice";

import CardFront from "../../components/CardFront";
import CardBack from "../../components/CardBack";

export function Dealer() {
  const dealertotal = useSelector(selectDealerTotal);
  const dealerHand = useSelector(selectDealerHand);

  //   const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="box">
      <p>Dealer</p>
      <div>Total: {dealertotal}</div>
      <div className="row px-5 text-center">
        {dealerHand.length ? (
          dealerHand.map((data) => (
            <>
              {data === dealerHand[0] ? (
                <div className="col px-0 playing-card-body">
                  <CardFront data={data} />
                </div>
              ) : (
                <CardBack data={data} />
              )}
            </>
          ))
        ) : (
          <p style={{ margin: "0 auto" }}>Dealer hand is empty.</p>
        )}
      </div>
    </div>
  );
}
