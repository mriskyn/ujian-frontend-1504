import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Table, Button, Modal, Jumbotron } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import host from "../url/localhost";

export default function CartPage() {
  //masih harus direfresh dlu biar cart ke update
  const dispatch = useDispatch(),
    history = useHistory();
  let getUser = useSelector((data) => data.user.user);
  const [user, setUser] = useState(getUser);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (index) => {
    const newUser = { ...user, cart: user.cart.filter((el, i) => i !== index) };
    setUser(newUser);
    dispatch({ type: "ADD_CART", payload: { data: newUser } });
  };

  const hanldeCartToHistory = () => {
    let success = false;
    const newHistory = user.cart.map((cart) => {
      return {
        UserId: user.id,
        name: cart.name,
        date: new Date().toLocaleString(),
        total: cart.quantity * cart.price,
        status: "Belum Di Bayar",
      };
    });

    newHistory.forEach((item) => {
      axios
        .post(`${host}/history`, item)
        .then(() => {
          console.log("success");
          success = true;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    history.push("/history");
    handleClose();

    if (success) {
    }
  };

  return (
    <Container className="pt-5">
      {user.cart.length < 1 ? (
        <Jumbotron className="text-center">
          <h1>Your Cart is Empty!</h1>
        </Jumbotron>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.cart.map((cart, i) => (
                <tr key={i} className="text-center">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={cart.img}
                      alt={`img-${i}`}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{cart.name}</td>
                  <td>{cart.quantity}</td>
                  <td>Rp. {(cart.quantity * cart.price).toLocaleString()}</td>
                  <td>
                    <Button onClick={() => handleDelete(i)} variant="danger">
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button className="w-100" onClick={handleShow}>
            Check Out
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                No
              </Button>
              <Button variant="info" onClick={() => hanldeCartToHistory()}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}
