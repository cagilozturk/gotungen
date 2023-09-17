import React, { useState } from "react";
import logo from "../logo.png";
import "./style.css";
import { IState, IUser } from "./interfaces";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";

export const Lot: React.FC = () => {
  const [state, setState] = useState<IState>({ userList: [] });

  const renderUserInputs = () => {
    return state.userList.map((user, index) => {
      return (
        <React.Fragment>
          <Grid xs={5} md={5} lg={4}>
            <TextField
              id="standard-basic"
              value={user.name}
              label={`İsim ${index + 1}`}
              variant="standard"
              onChange={(event) => setUserInfo(index, event.target.value)}
              autoComplete="off"
            />
          </Grid>
          <Grid className="delete-button" xs={7} md={7} lg={8}>
            <DeleteForeverIcon
              color="error"
              onClick={() => {
                removeUserFromList(index);
              }}
              style={{
                cursor: "pointer",
              }}
            />
          </Grid>
        </React.Fragment>
      );
    });
  };

  const setUserInfo = (index: number, userName: string) => {
    setState((current: IState) => {
      const currentState = { ...current };
      currentState.userList[index].name = userName;
      return currentState;
    });
  };

  const addUserInput = () => {
    setState((current) => {
      const currentState = { ...current };
      currentState.userList.push({} as IUser);
      return currentState;
    });
  };

  const removeUserFromList = (index: number) => {
    setState((prev) => {
      const currentState = { ...prev };
      currentState.userList.splice(index, 1);
      return currentState;
    });
  };

  return (
    <React.Fragment>
      <AppBar position="relative" className="app-header">
        <Toolbar className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} columns={12}>
        <Grid xs={12} className="first-row">
          <h1 className="app-h1">
            Götüngen Birliği kura sayfasına hoş geldiniz...
          </h1>
        </Grid>
        <Grid container spacing={3} xs={12} padding={5}>
          <Grid
            container
            xs={6}
            md={6}
            title="asdasdasdasdsa"
            border={"CaptionText"}
            columns={12}
            spacing={3}
          >
            <Grid xs={12}>
              <Button
                component="label"
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addUserInput}
              >
                İSİM EKLE
              </Button>
            </Grid>
            {renderUserInputs()}
          </Grid>
          <Grid xs={6} md={6}>
            <Button
              component="label"
              size="large"
              variant="outlined"
              // startIcon={<AddIcon />}
              onClick={() => {}}
              disabled={state.userList.length < 2}
            >
              Kurayı Başlat
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
