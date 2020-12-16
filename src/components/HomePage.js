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
} from "react-bootstrap";
import axios from "axios";
import host from "../url/localhost";

function ModalProduct({ show, handleClose, product }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {};

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }

    if (quantity > product.stock) {
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

  useEffect(() => {
    axios.get(`${host}/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  console.log(products);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <>
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
                    <i class="fas fa-cart-plus"></i>
                  </Button>
                  <Button variant="danger" className="ml-3">
                    <i class="fab fa-gratipay"></i>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))}
        <ModalProduct
          show={show}
          handleClose={() => setShow(false)}
          product={productModal}
        />
      </Row>
    </Container>
  );
}
