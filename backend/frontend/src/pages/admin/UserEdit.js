import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../../components/message/Message";
import FormContainer from "../../components/FormContainer";
import { updateUser, getUsersById } from "../../redux/api/admin";

const UserEdit = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const {user : userAdmin} = useSelector(state => state.user)
  const { user, isFetching, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!userAdmin && !userAdmin.isAdmin) {
        navigate("/login");
      }
    if (!user) {
        getUsersById(dispatch, userId);
    }
  }, [dispatch, userId, navigate, user, userAdmin]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(dispatch, { _id: user._id, name, email, isAdmin }, userId);
  };

  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {isFetching ? (
          <Loader />
        ) : error ? (
          <Message type="error" message={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEdit;
