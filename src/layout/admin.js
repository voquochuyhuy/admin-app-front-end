import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routes from "../routes";
const Admin = (props)=>{
    const getRoutes = routes => {
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
    }
    useEffect(() => {
        if(localStorage.getItem("access_token") === null){
            props.history.push("/auth")
        }
        else props.history.push("/log")
        return () => {
        }
    }, [])
    return <> <Switch>{getRoutes(routes)}</Switch></>
}
export default Admin;