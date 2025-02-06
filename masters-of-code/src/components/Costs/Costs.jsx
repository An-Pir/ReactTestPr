import CostItem from "./CostItem";
import Card from "../UI/Card";
import "./Costs.css";

const Costs = (props) => {
  return (
    <Card className="costs">
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
