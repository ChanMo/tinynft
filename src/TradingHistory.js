import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import * as Web3 from 'web3'

const TradingHistory = ({data}) => {
  return (
    <div>
      <Typography variant="h6" component="h5">Trading History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.orders.map(order => (
            <TableRow key={order.hash}>
              <TableCell>{order.side}</TableCell>
              <TableCell>{Web3.utils.fromWei(order.basePrice.toString())}</TableCell>
              <TableCell>{order.maker}</TableCell>
              <TableCell>{order.taker}</TableCell>
              <TableCell>{order.createdTime.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TradingHistory
