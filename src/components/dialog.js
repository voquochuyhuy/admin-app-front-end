import React from "react";
import PropTypes from "prop-types";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Delete selected item(s)
      </DialogTitle>
      <DialogContent>
        <WarningIcon />
      </DialogContent>
      <DialogActions>
        <div style={{ display: "flex", justifyContent: "space-between",width:"100%",padding: '8px' }}>
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
