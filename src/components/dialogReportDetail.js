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

export default function DialogReportDetail(props) {
  const { onClose, open } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => {
    onClose();
  };
  const handleChangeTextField = (e, type) => {
    switch (type) {
      case "email":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      id="report-detail-dialog"
    >
      <DialogTitle id="simple-dialog-title">
        {props.type} report detail
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <div className="content">
            {props.type === "question" ? (
              <div className="content">
                <TextField
                  label="Content"
                  defaultValue="Sample Data"
                  value={username}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="email">
              <TextField
                label="Username"
                defaultValue="Sample Data"
                value={username}
              />
            </div>
            <div class="password">
              <TextField
                label="Created At"
                defaultValue="Sample Data"
                value={password}
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
          <Button
            onClick={props.handleDelete}
            color="secondary"
            variant="contained"
          >
            OK
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

DialogReportDetail.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
};
