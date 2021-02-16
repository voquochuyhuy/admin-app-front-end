import React from "react";
import SimpleDialog from "./dialog";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { HideLoadingIcon, ShowLoadingIcon } from "../global/globalFunction";

export default function SimpleDialogDemo(props) {
  const { type, item,callBackDeleteSuccess } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    setOpen(false);
    ShowLoadingIcon();
    
    switch (type) {
      case "question":
        await axios.delete(`https://test-deploy-express.herokuapp.com/question/${item.Id}`).then(res=>{
            HideLoadingIcon();
            callBackDeleteSuccess(item);
        }).catch(err=>{
          HideLoadingIcon();
        });
        break;
      case "user":
        await axios.delete(`https://test-deploy-express.herokuapp.com/user/${item.id}`,{
          id : item.id
        }).then(res=>{
          HideLoadingIcon();
          callBackDeleteSuccess(item);
        }).catch(err=>{
          HideLoadingIcon();
          callBackDeleteSuccess(item);
        });;
        break;
      case "member":
        await axios.delete(`https://test-deploy-express.herokuapp.com/admin/${item.id}`,{
          id : item.id
        }).then(res=>{
          HideLoadingIcon();
          callBackDeleteSuccess(item);
        }).catch(err=>{
          HideLoadingIcon();
          callBackDeleteSuccess(item);
        });;
        break;

      default:
        break;
    }
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <SimpleDialog open={open} onClose={handleClose} onDelete={handleDelete} />
    </div>
  );
}
