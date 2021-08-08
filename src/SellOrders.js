import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles } from '@material-ui/core/styles'
import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OrderSide } from 'opensea-js/lib/types'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(3)
  }
}))

const SellOrders = ({data}) => {
  const classes = useStyles()

  const handleBuy = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    const seaport = new OpenSeaPort(window.ethereum, {
      networkName: Network.Main
    })
    const order = await seaport.api.getOrder({side:OrderSide.sell})
    const referrerAddress = '0x9d280d898BcBfd84656c36d18a82D5BaeF54020C'
    const transactionHash = await seaport.fulfillOrder({
      order,
      accountAddress: accounts[0],
      referrerAddress
    })
  }

  return (
    <div className={classes.container}>
      <Typography variant="h6" component="h5">Listings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>From</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sellOrders.map(order => (
            <TableRow key={order.hash}>
              <TableCell>{Web3.utils.fromWei(order.basePrice.toString())}</TableCell>
              <TableCell>{order.expirationTime.toString()}</TableCell>
              <TableCell>{order.maker}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleBuy}
                  color="primary">Buy</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SellOrders
