import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import routes from "../routes";
const Admin = ()=>{
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem("access_token") === null){
            history.push("/auth")
        }
        return () => {
        }
    }, [])
    return <>admin</>
}