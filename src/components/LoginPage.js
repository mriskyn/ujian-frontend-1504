import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Jumbotron, Form, Button, Alert } from "react-bootstrap";
import host from "../url/localhost";

export default function LoginPage() {
  const history = useHistory();
  const email = useRef();
  const password = useRef();
  const [errorInput, setErrorInput] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
      cart: [],
    };

    if (data.password.length < 6) {
      setErrorInput("Invalid username / password");
      setShow(true);
    } else {
      axios
        .get(`${host}/users?email=${data.email}`)
        .then((res) => {
          console.log(res.data);
          if (res.data[0]) {
            setErrorInput("Invalid username / password");
            setShow(true);
            return false;
          } else {
            return axios.post(`${host}/users`, data);
          }
        })
        // .post(`${host}/users`, data)
        .then((res) => {
          if (res) {
            console.log("data baru");
            //   to home
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Jumbotron>
      <Form onSubmit={handleSubmit}>
        {errorInput ? (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setShow(false)}
            show={show}
          >
            {errorInput}
          </Alert>
        ) : (
          ""
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Jumbotron>
  );
}
