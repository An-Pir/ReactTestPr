import { useState } from "react";
import CostItem from "./CostItem";
import Card from "../UI/Card";
import "./Costs.css";
import CostsFilter from './CostsFilter';

const Costs = (props) => {
  const [selectedYear, setSelectedYear] = useState('2021');

  const yearChangeHandler = (year) => {
    setSelectedYear(year);
  };

  return (
    <Card className="costs">
    <CostsFilter year={selectedYear} onChangeYear={yearChangeHandler}/>
      <CostItem
        date={props.cost[0].date}
        description={props.cost[0].description}
        amount={props.cost[0].amount}
      />
      <CostItem
        date={props.cost[1].date}
        description={props.cost[1].description}
        amount={props.cost[1].amount}
      />
      <CostItem
        date={props.cost[2].date}
        description={props.cost[2].description}
        amount={props.cost[2].amount}
      />
    </Card>
  );
};

export default Costs;
