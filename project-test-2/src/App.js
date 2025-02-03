import "./App.css";
import Header from "./header/Header";
import Goods from "./Goods";

const headerData = {
  site_name: 'my test site name',
  nav: [
    {link: "nav1", text: "my link 1"},
    {link: "nav2", text: "my link 2"},
    {link: "nav3", text: "my link 3"},
  ]
};

const goods = [
  {title: 'Apple', cost: 150, image: "https://i.pinimg.com/736x/4a/de/37/4ade3729109e48e14e0e3126f49df099.jpg" },
  {title: 'Orange', cost: 90, image: "https://i.pinimg.com/736x/80/e2/43/80e24373a711af0b737075b7cb0a9b05.jpg" },
  {title: 'Plum', cost: 200, image: "https://i.pinimg.com/736x/84/22/8a/84228a18b839eeb8e35497048b913d58.jpg" },
]


function App() {
  return (
    <>
      <Header data={headerData}/>
      {goods.map(good => {
        return(
          <Goods  
            key={good.title}
            title={good.title} 
            cost={good.cost} 
            image={good.image}
          />)}
        )
      };
    </>
  );
}

export default App;
