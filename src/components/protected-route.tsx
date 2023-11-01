import {Navigate} from 'react-router-dom';
import React from "react";


type Props = { children: React.ReactNode; };
export const ProtectedRouteElement = (props: Props) => {
  const {children} = props;

  const content = localStorage.getItem("accessToken") ? children : (<Navigate to="/login" replace/>)

  return (<>
    {content}
  </>);
}
