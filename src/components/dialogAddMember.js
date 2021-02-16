import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { HideLoadingIcon, ShowLoadingIcon } from "../global/globalFunction";
import axios from "axios";

export default function DialogAddMember(props) {
  const { onClose, open } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleClose = () => {
    onClose();
  };
  const handleChangeTextField = (e, type) => {
    switch (type) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleClickOK = async () => {
    ShowLoadingIcon();
    await axios
      .post("https://test-deploy-express.herokuapp.com/admin", {
        username,
        email,
        password,
        role: "Admin",
      })
      .then((res) => {
        const data = res.data.data;
        props.callBackAddSuccess(data);
        onClose();
        HideLoadingIcon();
      })
      .catch((err) => {
        HideLoadingIcon();
      });
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      id="add-member-dialog"
    >
      <DialogTitle id="simple-dialog-title">Add member</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <div className="content">
            <div class="username">
              <TextField
                label="Username"
                defaultValue="Sample Data"
                value={username}
                onChange={(e) => {
                  handleChangeTextField(e, "username");
                }}
              />
            </div>
            <div className="email">
              <TextField
                label="Email"
                defaultValue="Sample Data"
                value={email}
                onChange={(e) => {
                  handleChangeTextField(e, "email");
                }}
              />
            </div>
            <div class="password">
              <TextField
                label="Password"
                defaultValue="Sample Data"
                value={password}
                type="password"
                onChange={(e) => {
                  handleChangeTextField(e, "password");
                }}
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px",
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClickOK} color="secondary" variant="contained">
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

DialogAddMember.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
};
