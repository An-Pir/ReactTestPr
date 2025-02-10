import "./Header.css";
import Container from "../UIcomponents/Container";
import LogoComponent from "../UIcomponents/LogoComponent";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <div className="header-wrap">
          <LogoComponent/>
          <Navigation />
        </div>
      </Container>
    </div>
  );
};

export default Header;
