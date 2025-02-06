import "./App.css";
import Costs from "./components/Costs/Costs";

function App() {
  const cost = [
    {
      date: new Date(2021, 2, 12),
      description: "Холодильник",
      amount: 999.99,
    },
    {
      date: new Date(2021, 11, 25),
      description: "MacBook",
      amount: 1254.72,
    },
    {
      date: new Date(2021, 3, 1),
      description: "Джинсы",
      amount: 49.99,
    },
  ];

  return (
    <>
      <h1>Начнем изучение React</h1>
      <Costs cost={cost} />
    </>
  );
}

export default App;
