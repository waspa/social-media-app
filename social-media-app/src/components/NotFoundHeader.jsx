import { Navbar, Container } from "react-bootstrap";
import Logo from "./Logo";
import "../styles/global.css";

export default function Header() {
  return (
    <div className="bottomBorder">
      <Container>
        <Navbar collapseOnSelect expand="md" bg="" variant="light">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="justify-content-end"
          />
        </Navbar>
      </Container>
    </div>
  );
}
