import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography color="inherit" variant="h6" component={Link} to="/">
          DSOOU
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
