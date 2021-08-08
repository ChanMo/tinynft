import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { OpenSeaPort, Network } from 'opensea-js'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as Web3 from 'web3'
import BuyOrders from './BuyOrders'
import SellOrders from './SellOrders'
import TradingHistory from './TradingHistory'
import MakeListingForm from './MakeListingForm'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(12),
  },
  image: {
    marginBottom: theme.spacing(2)
  },
  info: {
    marginBottom: theme.spacing(3)
  },
  actions: {
    '& > button': {
      marginRight: theme.spacing(1)
    }
  },
  loading: {
    marginTop: theme.spacing(15),
    textAlign: 'center'
  }
}))


const Asset = () => {
  const classes = useStyles()
  const { tokenAddress, tokenId } = useParams()
  const [data, setData] = useState({})
  const [balance, setBalance] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(async ()=>{
    const seaport = new OpenSeaPort(window.ethereum, {
      networkName: Network.Main
    })
    const asset = await seaport.api.getAsset({
      tokenAddress: tokenAddress,
      tokenId: tokenId
    })
    console.log(asset)
    setData(asset)
  }, [])

  // useEffect(async() => {
  //   const seaport = new OpenSeaPort(window.ethereum, {
  //     networkName: Network.Main
  //   })
  //   const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
  //   const res = await seaport.getTokenBalance({
  //     accountAddress: accounts[0],
  //     tokenAddress: tokenAddress
  //   })
  //   setBalance(res)
  // }, [])
  //
  if (Object.keys(data).length == 0) {
    return <div className={classes.loading}>loading...</div>
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item>
          <img src={data.imagePreviewUrl} className={classes.image} />
          <Typography variant="body1" component="p">
            balance: {balance}
          </Typography>
        </Grid>
        <Grid item>
          <div className={classes.info}>
            <Typography variant="h4"
              gutterBottom
              component="h1">{data.name}</Typography>
            <Typography gutterBottom>owner: {data.owner.user.username}</Typography>
            <div className={classes.actions}>
              <Button
                color="primary"
                variant="contained"
              >Buy now</Button>
              <Button color="primary" variant="outlined"
                onClick={()=>setOpen(true)}>Make Listing</Button>
              <Button
                color="primary"
                variant="outlined"
                component="a" target="_blank"
                href={data.openseaLink}>view on opensea</Button>
            </div>
          </div>
          <SellOrders data={data} />
          <BuyOrders data={data} />
        </Grid>
      </Grid>
      <TradingHistory data={data} />
      <MakeListingForm
        open={open}
        onClose={()=>setOpen(false)}
        data={data}
      />
    </Container>
  )
}

export default Asset
