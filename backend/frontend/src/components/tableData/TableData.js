import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './tableData.scss'


const TableData = ({data}) => {
    return (
    <TableContainer className='TableContainer' component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Total</TableCell>
          <TableCell align="center">Paid</TableCell>
          <TableCell align="center">Delivered</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center">{row._id}</TableCell>
            <TableCell align="center">{row.createAt.substring(0, 10)}</TableCell>
            <TableCell align="center">{row.totalPrice}</TableCell>
            <TableCell align="center">{row.isPaid ? row.paitAt.substring(0, 10) : (
              <FontAwesomeIcon icon={faXmark} color='red'/>
            )}
            </TableCell>
            <TableCell align="center">
            <Link to={`/order/${row._id}`}>
            <button className="btn" type="button">
                  Details
                </button>
            </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableData

