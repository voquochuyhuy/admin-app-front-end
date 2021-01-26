import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function DialogReportDetail(props) {
  const { onClose, open,selectedItem } = props;
  console.log(selectedItem,"selectedItem")
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    
    return () => {
      
    }
  }, [])
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
                    defaultValue="Sample Data"
                    value={props.content}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="belong-to">
                  <TextField
                    label="Belong to User"
                    defaultValue="Sample Data"
                    value={props.belongTo}
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
                    defaultValue="Sample Data"
                    value={props.username}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="email">
                  <TextField
                    label="Email"
                    defaultValue="Sample Data"
                    value={props.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="country">
                  <TextField
                    label="Country"
                    defaultValue="Sample Data"
                    value={props.country}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div class="created-at">
                  <TextField
                    label="Created At"
                    defaultValue="Sample Data"
                    value={props.createdAt}
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
          <div style={{width:"200px",display:"flex",justifyContent:"space-between"}}>
            {props.type === "User" ?<Button
              onClick={props.handleDelete}
              color="secondary"
              variant="outlined"
            >
              BAN
            </Button> :<div style={{width:"90px",height:"1px"}}></div>}
            
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
