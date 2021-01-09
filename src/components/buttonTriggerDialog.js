import React from 'react';
import SimpleDialog from './dialog';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };
  
    return (
      <div>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
    );
  }