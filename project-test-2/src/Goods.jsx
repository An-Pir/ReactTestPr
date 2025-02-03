import React from "react";

const Goods = (props) => {
    const style = {width: '150px'};
  return (
  <div className="goods-block">
    <h3>{props.title}</h3>
    <p>{props.cost}</p>
    <img style={style} src={props.image} alt={props.title} />
  </div>
  );
};

export default Goods;

