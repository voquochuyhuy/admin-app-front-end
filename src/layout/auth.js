import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {ShowLoadingIcon,HideLoadingIcon} from "../global/globalFunction";
import "../styles/auth.css";
import axios from "axios";
const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    return () => {};
  }, []);
  const submit = async () => {
    ShowLoadingIcon();
    await axios({
      method: "post",
      url: `https://test-deploy-express.herokuapp.com/auth/login`,
      data: {
        username: username,
        password: password,
      },
    })
      .then(async (res) => {
        HideLoadingIcon(); 
        let token = res.data.accessToken;
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        localStorage.setItem("access_token", token);
        props.history.push("/post-management");
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          alert("Server is down");
          return;
        }
        alert(`Email or password is not valid`);
        HideLoadingIcon();  
      });
    
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
    <div className="auth-page">
      <form noValidate autoComplete="off">
        <div className="header">
          <h2>Together better</h2>
        </div>
        <div className="content">
          <div className="email">
            <MailOutlineIcon />
            <TextField
              onChange={(e) => {
                handleChangeTextField(e, "email");
              }}
              value={username}
              id="email"
              label="Enter email"
              variant="outlined"
            />
          </div>
          <div class="password">
            <LockOpenIcon />
            <TextField
              onChange={(e) => {
                handleChangeTextField(e, "password");
              }}
              value={password}
              id="password"
              label="Enter password"
              variant="outlined"
              type="password"
            />
          </div>
        </div>
        <div className="footer">
          <Button variant="contained" color="primary" onClick={submit}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
