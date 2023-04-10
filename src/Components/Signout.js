import React from 'react'
import axios from 'axios';
import styled from 'styled-components';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
function Signout() {
    const history = useHistory();

    //functionality:
    const handleClick = () =>{
        localStorage.clear();
        history.push('/')
    }
  return (
    <Button onClick={handleClick} style={{color: 'black',backgroundColor:'red'}}>
        <ExitToAppTwoToneIcon />
    </Button>
  )
}

export default Signout