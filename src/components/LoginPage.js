import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import validator from 'validator'
import { Jumbotron, Form, Button, Alert } from "react-bootstrap";
import host from "../url/localhost";

export default function LoginPage() {
  const user = useSelector(data => data.user.user)

  const dispatch = useDispatch(),
    history = useHistory();
  const email = useRef();
  const password = useRef();
  const [errorInput, setErrorInput] = useState("");
  const [show, setShow] = useState(false);

  if (user.id) {
    return <Redirect to="/" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
      cart: [],
    };

    if (data.password.length < 6 || !validator.isEmail(data.email)) {
      setErrorInput("Invalid username / password");
      setShow(true);
    } else {
      axios
        .get(`${host}/users?email=${data.email}&password=${data.password}`)
        .then((res) => {
          if (res.data[0]) {
            dispatch({ type: "LOG_IN", payload: { user: res.data[0] } });
            history.push("/");
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
            dispatch({ type: "LOG_IN", payload: { user: res.data } });
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
        <h1>Login</h1>
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
