import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routes from "../routes";
const Admin = (props)=>{
    const getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.collapse) {
            return this.getRoutes(prop.views);
          }
          if (prop.layout === "/admin") {
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
    }
    useEffect(() => {
        if(localStorage.getItem("access_token") === null){
            props.history.push("/auth")
        }
        return () => {
        }
    }, [])
    return <> <Switch>{getRoutes(routes)}</Switch></>
}
export default Admin;