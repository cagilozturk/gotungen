import React, { useState } from 'react';
import logo from '../logo.png';
import './style.css';
import { IState, IUser } from './interfaces';
import Grid from '@mui/material/Unstable_Grid2';
import { AppBar, Box, Button, TextField, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';

export const Lot: React.FC = () => {

  const [state, setState] = useState<IState>({ userList: [] });

  const renderUserInputs = () => {
    console.log("state.userList: ", state.userList);
    return state.userList.map((user, index) => {
      return (
        <Grid xs={12}>
          <TextField
            id="standard-basic"
            value={user.name}
            label={`İsim ${index + 1}`}
            variant="standard"
            onChange={(event) => { console.log("event: ", event); setUserInfo(index, event.target.value); }}
            autoComplete='off'
          />
        </Grid>
      );
    })
  };

  const setUserInfo = (index: number, userName: string) => {
    setState((current: IState) => {
      const currentState = { ...current };
      currentState.userList[index].name = userName;
      return currentState;
    })
  }

  const addUserInput = () => {
    console.log("onClick: ", state.userList);
    setState(current => {
      const currentState = { ...current }
      currentState.userList.push({} as IUser);
      return currentState;
    })
  }

  return (
    <React.Fragment>
      <AppBar position="relative" className='app-header'>
        <Toolbar className='app-header'>
          <img src={logo} className="app-logo" alt="logo" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} columns={12} >
        <Grid xs={12} className='first-row'>
          <h1 className='app-h1'>Götüngen Birliği kura sayfasına hoş geldiniz...</h1>
        </Grid>
        <Grid container spacing={3} xs={12} padding={5}>
          <Grid container xs={4} title='asdasdasdasdsa' border={'CaptionText'} columns={12} spacing={3}>
            <Grid xs={12}>
              <Button component="label" size="large" variant="contained" startIcon={<AddIcon />} onClick={addUserInput}>
                İSİM EKLE
              </Button>
            </Grid>
            {renderUserInputs()}
          </Grid>
          <Grid container xs={4} spacing={3}>

          </Grid>
        </Grid>
      </Grid>

    </React.Fragment>



  );
};