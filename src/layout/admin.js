import React, { useEffect } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import routes from "../routes";
import "../styles/admin.css";
import { Divider } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color : 'white',
    backgroundColor : '#ff7f50'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Admin = (props) => {
  const classes = useStyles();
  const getRoutes = (routes) => {
    const result = routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
    return result;
  };
  const Logout = ()=>{
    localStorage.clear();
    props.history.push("/auth");
  }
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      props.history.push("/auth");
    } else props.history.push("/post-management");
    return () => {};
  }, []);

  return (
    <div className="admin-page">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed"  className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Together better Admin App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {routes.map(
                (it, index) => (
                  <NavLink to={it.path} className="navlink-item" key={index}>
                    <ListItemIcon>
                      {it.icon}
                    </ListItemIcon>
                    <ListItemText primary={it.name} />
                  </NavLink>
                )
              )}
              <Divider/>
              <ListItem button onClick={Logout}>
                <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>{getRoutes(routes)}</Switch>
        </main>
      </div>
    </div>
  );
};
export default Admin;
