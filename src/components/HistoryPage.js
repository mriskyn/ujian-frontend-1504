import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import host from "../url/localhost";

export default function HistoryPage() {
  const user = useSelector((data) => data.user.user);
  const [historyProduct, setHistoryProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/history?UserId=${user.id}`)
      .then((res) => {
        setHistoryProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id]);

  const handleCancel = (id, productName, productQuantity) => {
    axios
      .delete(`${host}/history/${id}`)
      .then(() => {
        setHistoryProduct(
          historyProduct.filter((product) => product.id !== id)
        );
        return axios.get(`${host}/products?name=${productName}`);
      })
      .then((res) => {
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Date</th>
            <th>Produk</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {historyProduct.map((product, i) => (
            <tr key={product.id} className="text-center">
              <td>{i + 1}</td>
              <td>{product.date.slice(0, 10)}</td>
              <td>{product.name}</td>
              <td>Rp. {product.total.toLocaleString()}</td>
              <td>{product.status}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleCancel(product.id, product.name, product.quantity)
                  }
                >
                  CANCEL
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
