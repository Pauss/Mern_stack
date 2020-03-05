import React, { useState } from "react";
import Login from "../forms/login-form";
import Register from "../forms/register-form";
import { Nav } from "react-bootstrap";

export default function Singin(props) {
  const [itemKey, setItemKey] = useState(0);

  function onChange(eventKey, e) {
    e.preventDefault();
    setItemKey(Number(eventKey));
  }

  let component = itemKey === 0 ? <Login /> : <Register />;

  return (
    <div>
      <Nav
        className="d-flex justify-content-center"
        variant="tabs"
        defaultActiveKey="/home"
      >
        <Nav.Item>
          <Nav.Link href="/Singin" eventKey={0} onSelect={onChange}>
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={1} onSelect={onChange} href="/Singin">
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {component}
    </div>
  );
}
