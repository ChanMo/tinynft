import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles } from '@material-ui/core/styles'
import * as Web3 from 'web3'
import MakeOfferForm from './MakeOfferForm'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(3)
  },
  table: {
    marginBottom: theme.spacing(2)
  }
}))

const BuyOrders = ({data}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.container}>
      <Typography variant="h6" component="h5">Offers</Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>From</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.buyOrders.map(order => (
            <TableRow key={order.hash}>
              <TableCell>{Web3.utils.fromWei(order.basePrice.toString())}</TableCell>
              <TableCell>{order.expirationTime.toString()}</TableCell>
              <TableCell>{order.maker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        color="primary"
        onClick={()=>setOpen(true)}
        variant="outlined">Make Offer</Button>
      <MakeOfferForm
        data={data}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}

export default BuyOrders
