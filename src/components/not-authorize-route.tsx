import {Navigate} from 'react-router-dom';
import React from "react";


type Props = { children: React.ReactNode; };
export const NotAuthRouteElement = (props: Props) => {
  const {children} = props;

  const content = localStorage.getItem("accessToken") ? (<Navigate to="/" replace/>) : children

  return (<>
    {content}
  </>);
}
