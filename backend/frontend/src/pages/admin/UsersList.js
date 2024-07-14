import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from 'react-bootstrap'
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/loader/Loader';
import Message from '../../components/message/Message'
import { getUsersList, deleteUser } from '../../redux/api/admin'

const UserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {users, isFetching, error} = useSelector(state => state.admin)

    const {user} = useSelector(state => state.user)


    useEffect(() => {
        if (user && user.isAdmin) {
            getUsersList(dispatch)
        } else {
            navigate('/login')
        }
    }, [dispatch, user, navigate])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(dispatch, id)
        }
    }

    return (
        <Container>
            <h1>Users</h1>
            {isFetching
                ? (<Loader />)
                : error
                    ? (<Message type="error" message={error} />)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </Container>
    )
}

export default UserList