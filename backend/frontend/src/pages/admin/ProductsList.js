import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Message from '../../components/message/Message'
import Paginate from '../../components/paginate/Paginate'
import { getProducts } from '../../redux/api/productsApi'
import { deleteProduct, createProduct } from '../../redux/api/admin'

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams([]);
    const keyword = searchParams.get("keyword");
    const paramPage = searchParams.get("page");
    const {products, isFetching, error, page, pages} = useSelector((state) => state.product);
    const {user} = useSelector(state => state.user)

    useEffect(() => {
        if (!user.isAdmin) {
            navigate('/login')
        } else {
            let newParam = "";
            if (keyword) {
              newParam = `keyword=${keyword}`;
            }
            getProducts(dispatch, newParam, paramPage);
        }

    }, [dispatch, navigate, user, keyword, paramPage])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(dispatch(id))
        }
    }

    const createProductHandler = () => {
        createProduct(dispatch,{})
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {isFetching
                ? (<Loader />)
                : error
                    ? (<Message type='error' message={error} />)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ProductList