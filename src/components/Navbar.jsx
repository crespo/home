import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../hooks/useScrollPosition";
import useResizeObserver from "../hooks/useResizeObserver";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Pdf from "../editable-stuff/resume.pdf";
import { showBlog, FirstName } from "../editable-stuff/configurations.json";
import styles from "./Navbar.module.css";

const Navigation = React.forwardRef((props, ref) => {
  const [isTop, setIsTop] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navbarMenuRef = React.useRef();
  const navbarDimensions = useResizeObserver(navbarMenuRef);
  const navBottom = navbarDimensions ? navbarDimensions.bottom : 0;
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!navbarDimensions) return;
      currPos.y + ref.current.offsetTop - navbarDimensions.bottom > 5
        ? setIsTop(true)
        : setIsTop(false);
      setScrollPosition(currPos.y);
    },
    [navBottom]
  );

  React.useEffect(() => {
    if (!navbarDimensions) return;
    navBottom - scrollPosition >= ref.current.offsetTop
      ? setIsTop(false)
      : setIsTop(true);
  }, [navBottom, navbarDimensions, ref, scrollPosition]);

  return (
    <Navbar
      ref={navbarMenuRef}
      className={` fixed-top  ${
        !isTop ? styles.navbarWhite : styles.navbarTransparent
      }`}
      expand="lg"
    >
      <Navbar.Brand href={process.env.PUBLIC_URL + "/#home"}>
        {`<${FirstName} />`}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={styles.toggler}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {showBlog && (
            <Nav.Link className={`nav-link lead ${styles.navItem}`}>
              <Link to={process.env.PUBLIC_URL + "/blog"}>Blog</Link>
            </Nav.Link>
          )}
          <Nav.Link
            className={`nav-link lead ${styles.navItem}`}
            href={process.env.PUBLIC_URL + "/#projects"}
          >
            Projects
          </Nav.Link>
          <Nav.Link
            className={`nav-link lead ${styles.navItem}`}
            href={Pdf}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </Nav.Link>
          <Nav.Link
            className={`nav-link lead ${styles.navItem}`}
            href={process.env.PUBLIC_URL + "/#aboutme"}
          >
            About
          </Nav.Link>
          <Nav.Link
            className={`nav-link lead ${styles.navItem}`}
            href={process.env.PUBLIC_URL + "/#skills"}
          >
            Skills
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;
