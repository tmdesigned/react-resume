import React from "react";
import Moment from "react-moment";

const DateRange = ({ from, to, format = "M/D/YYYY" }) => {
  if (!from) {
    return "";
  }
  const toWithDefault = to ? <Moment format={format}>{to}</Moment> : "Present";
  return (
    <div className="card__dates">
      {from === to ? (
        toWithDefault
      ) : (
        <>
          <Moment format={format}>{from}</Moment> - {toWithDefault}
        </>
      )}
    </div>
  );
};

export default DateRange;
