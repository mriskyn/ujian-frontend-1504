import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Toast
} from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import host from "../url/localhost";

function ModalProduct({ show, handleClose, product, setToast }) {
  const dispatch = useDispatch(), history = useHistory()
  let user = useSelector((data) => data.user.user);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (!user.id) {
      handleClose()
      history.push('/login')
    } else {
      let cart = product;
      delete cart.stock;

      cart.quantity = quantity;

      axios
        .patch(`${host}/users/${user.id}`, { cart: [...user.cart, cart] })
        .then((res) => {
          dispatch({ type: 'ADD_CART', payload: { data: res.data } })
          setToast(true);
          handleClose()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }

    if (quantity > product.stock) {
      alert('Not Enough Stock!')
      setQuantity(product.stock);
    }
  }, [quantity, product.stock]);

  useEffect(() => {
    setQuantity(1);
  }, [handleClose]);

  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>{product.name}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <img src={product.img} alt="img" className="img-fluid" />
          </Col>
          <Col md={7}>
            <p>{product.description}</p>
            <h5>Quantity:</h5>
            <InputGroup>
              <InputGroup.Append
                as={Button}
                onClick={() => setQuantity(Number(quantity) + 1)}
              >
                +
              </InputGroup.Append>
              <FormControl
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <InputGroup.Prepend
                as={Button}
                onClick={() => setQuantity(Number(quantity) - 1)}
              >
                -
              </InputGroup.Prepend>
            </InputGroup>
            <small>{product.stock} stock left</small>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddToCart}>
          Add To Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState({});
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false)

  useEffect(() => {
    axios.get(`${host}/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Rp. {product.price.toLocaleString()}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(true);
                    setProductModal(product);
                  }}
                >
                  <i className="fas fa-cart-plus"></i>
                </Button>
                <Button variant="danger" className="ml-3">
                  <i className="fab fa-gratipay"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <ModalProduct
          show={show}
          handleClose={() => setShow(false)}
          product={productModal}
          setToast={() => setToast(true)}
        />
      </Row>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px',
        }}
      >
        <Toast
          show={toast}

          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Toast.Header onClick={() => setToast(false)}>
            <strong className="mr-auto">Notification</strong>
            <small className="text-muted">click here to close</small>
          </Toast.Header>
          <Toast.Body>Success Added Product to Cart!</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
}
