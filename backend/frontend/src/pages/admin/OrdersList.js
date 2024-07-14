import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { getOrders } from "../../redux/api/admin";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, isFetching, error } = useSelector((state) => state.admin);

  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    if (user && user.isAdmin) {
      getOrders(dispatch);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, user]);

  return (
    <div>
      <h1>Orders</h1>
      {isFetching ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FontAwesomeIcon icon={faCheck} style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FontAwesomeIcon icon={faCheck} style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;
