import React, { useState } from "react";
import logo from "../logo.png";
import "./style.css";
import { IState, IUser } from "./interfaces";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import StartIcon from "@mui/icons-material/PlayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import RepeatIcon from "@mui/icons-material/Loop";
import { OperationStatus } from "./enums";

export const Lot: React.FC = () => {

  const initialState: IState = { userList: [], operationStatus: OperationStatus.NotStarted, selectedUserList: [] };
  const [state, setState] = useState<IState>(initialState);

  const renderUserInputs = () => {
    return state.userList.map((user, index) => {
      return (
        <React.Fragment>
          <Grid xs={10} md={5} lg={4}>
            <TextField
              id={`txtUser${index}`}
              value={user.name}
              label={`İsim ${index + 1}`}
              variant="standard"
              onChange={(event) => setUserInfo(index, event.target.value)}
              autoComplete="off"
            />
          </Grid>
          <Grid className="delete-button" xs={2} md={7} lg={8}>
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
      removeFromArray(currentState.userList, index);
      return currentState;
    });
  };

  const renderSelectedUserInputs = () => {
    return state.selectedUserList.map((user, index) => {
      return (
        <Grid xs={12}>
          <TextField
            id={`txtSelectedUser${index}`}
            value={user.name}
            label={`Seçilen ${index + 1}. İsim`}
            variant="standard"
            autoComplete="off"
            // disabled
            className="selected-text-field"
            aria-readonly
          />
        </Grid>
      );
    });
  };

  const getStartIconDisabled = () => {
    return (state.userList.length < 2 || state.userList.some(user => !user.name));
  }

  const startLot = () => {
    setState(prev => { return { ...prev, operationStatus: OperationStatus.Started } });

    const clonedUsers = [...state.userList];

    const indexes = clonedUsers.map((_, index) => {
      return index;
    });

    const selectedList: IUser[] = [];

    while (indexes.length > 0) {
      const randomIndex = Math.floor(Math.random() * indexes.length);
      const userIndex = indexes[randomIndex];
      const selected = { ...clonedUsers[userIndex] };
      selectedList.push(selected);
      removeFromArray(indexes, randomIndex);
    }

    setState(prev => { return { ...prev, operationStatus: OperationStatus.Finished, selectedUserList: selectedList } });
  };

  const removeFromArray = (arr: any[], index: number) => {
    arr.splice(index, 1);
  }

  return (
    <React.Fragment>
      <AppBar position="relative" className="app-header">
        <Toolbar className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} columns={12}>
        <Grid xs={12} className="first-row">
          <h1 className="app-h1 font-effect-3d-float">
            Götüngen Birliği kura sayfasına hoş geldiniz...
          </h1>
        </Grid>
        <Grid container spacing={3} xs={12} padding={5}>
          <Grid
            container
            xs={6}
            md={6}
            columns={12}
            spacing={3}
          >
            <Grid xs={12}>
              <Button
                component="label"
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addUserInput}
              >
                İSİM EKLE
              </Button>
            </Grid>
            {renderUserInputs()}
          </Grid>
          <Grid xs={6} md={6} container spacing={3} columns={12}>
            <Grid xs={12}>
              <Button
                component="label"
                size="small"
                variant="outlined"
                startIcon={state.operationStatus === OperationStatus.NotStarted ? <StartIcon /> : <RepeatIcon />}
                onClick={startLot}
                disabled={getStartIconDisabled()}
              >
                {state.operationStatus === OperationStatus.NotStarted ? "Kurayı Başlat" : "Tekrarla"}
              </Button>
            </Grid>
            {renderSelectedUserInputs()}
          </Grid>
          <Grid xs={12}>
            <Button
              component="label"
              size="small"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => { setState(initialState) }}
              style={{ color: "darkred", borderColor: "darkred" }}
              disabled={state.operationStatus === OperationStatus.Started}
            >
              TEMİZLE
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
