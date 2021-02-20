import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import moment from "moment";

export default function DialogReportDetail(props) {
  const { onClose, open, selectedItem } = props;
  const [data, setData] = useState({
    content: "",
    belongTo: "",
    username: "",
    country: "",
    email: "",
    createdAt: "",
  });
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    if (open) {
      if(props.type !== "User"){
        axios.get(`https://test-deploy-express.herokuapp.com/question/${selectedItem.targetID}`).then(res=>{
          const _data = res.data.data[0];
          setData({
            content: props.selectedItem.content,
            belongTo: _data.username,
            username: "",
            country: "",
            email: "",
            createdAt: "",
          });
        });
      }
      else{
        axios.get(`https://test-deploy-express.herokuapp.com/user/${selectedItem.targetID}`).then(res=>{
          const _data = res.data.data[0];
          setData({
            content: "",
            belongTo: "",
            username: _data.username,
            country: _data.country,
            email: _data.email,
            createdAt: moment(_data.createdAt).format('DD-MM-YYYY'),
          });
          });
      }
    }
    return () => {};
  }, [open,selectedItem]);
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
            {props.type === "Question" || props.type === "Answer" ? (
              <>
                <div className="content">
                  <TextField
                    label="Content"
                    value={data.content}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="belong-to">
                  <TextField
                    label="Belong to User"
                    value={data.belongTo}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="username">
                  <TextField
                    label="Username"
                    value={data.username}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="email">
                  <TextField
                    label="Email"
                    value={data.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="country">
                  <TextField
                    label="Country"
                    value={data.country}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="created-at">
                  <TextField
                    label="Created At"
                    value={data.createdAt}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </>
            )}
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
          <div
            style={{
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {props.type === "User" ? (
              <Button
                onClick={props.handleBan}
                color="secondary"
                variant="outlined"
              >
                BAN
              </Button>
            ) : (
              <div style={{ width: "90px", height: "1px" }}></div>
            )}

            <Button
              onClick={props.handleDelete}
              color="secondary"
              variant="contained"
            >
              DELETE
            </Button>
          </div>
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
