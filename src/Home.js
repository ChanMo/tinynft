import React from 'react'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(12)
  },
  media: {
    height: 140
  }
}))

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const assets = [{
    'name': 'GoodSleep',
    'image': 'https://lh3.googleusercontent.com/9qNJTfmwcc1VTfDga-0CERGtfdfR0zP0c_9S0LGy-4IP-wa7GcYZOi7msn_KUJHdNeFOc-La-R8goqInaUFo8zxf0QYxMP71Iyka=s250',
    'tokenAddress':'0x495f947276749ce646f68ac8c248420045cb7b5e',
    'tokenId':'71083884541101485309365117973311273979808861123451377320483763788153236750337'
  }, {
    'name': 'Batman',
    'image': 'https://lh3.googleusercontent.com/2qGQE_FZuqYk34JbVCSffydr9q7WmkU7PLVATDdGE_S6mVwr29jzCreACpYJHK9CN0yVeGxlu_Agd1U2pzJVyipvYDpxHp9RIdU-=s250',
    'tokenAddress': '0x495f947276749ce646f68ac8c248420045cb7b5e',
    'tokenId': '12510215359888036692443693821200507961939031093531727621071302247529568010241'
  }, {
    'name': 'Avidlines #832569532',
    'image': 'https://lh3.googleusercontent.com/le8BPuQo7sEpYMP4gW-JepQqyBqIUne0APKszs48I9BGzGs6INM3qoGW-O7pZZ5OjKCE0Je0FW_zBmLNu6XK3MyDXW2k-rDqyayQGAk=s250',
    'tokenAddress': '0xdfacd840f462c27b0127fc76b63e7925bed0f9d5',
    'tokenId': '832569532'
  }]
  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography gutterBottom variant="h3" component="h1">Recommend NFT</Typography>
      <Grid container spacing={1}>
        {assets.map((asset, index) => (
          <Grid item xs={12} sm={6} md={3} lg={4} key={index.toString()}>
            <Card>
              <CardActionArea
                onClick={()=>history.push(`/${asset.tokenAddress}/${asset.tokenId}`)}>
                <CardMedia
                  className={classes.media}
                  image={asset.image} />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                  >{asset.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
