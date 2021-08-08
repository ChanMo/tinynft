import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { OpenSeaPort, Network } from 'opensea-js'

const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(2)
  }
}))

const MakeOfferForm = ({open, onClose, data}) => {
  const classes = useStyles()
  const [form, setForm] = useState({})

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setForm({...form, [name]:value})
  }

  const handleSubmit = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    const seaport = new OpenSeaPort(window.ethereum, {
      networkName: Network.Main
    })
    const referrerAddress = '0x9d280d898BcBfd84656c36d18a82D5BaeF54020C'
    const offer = await seaport.createBuyOrder({
      asset: {
        tokenId: data.tokenId,
        tokenAddress: data.tokenAddress,
        schemaName: 'ERC1155'
      },
      accountAddress: accounts[0],
      startAmount: form.price,
      expirationTime: Math.round(Date.now()/1000 + 60*60*24),
      referrerAddress
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Make Offer</DialogTitle>
      <DialogContent>
        {/*
        <TextField fullWidth
          className={classes.input}
          variant="outlined"
          label="Count"
          name="count"
          onChange={handleChange}
          value={form.count}
          />*/}
        <TextField fullWidth
          className={classes.input}
          variant="outlined"
          label="Price"
          name="price"
          helperText="unit: ETH"
          onChange={handleChange}
          value={form.price}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MakeOfferForm
