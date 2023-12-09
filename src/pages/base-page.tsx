import React from "react";

type Props = { children: React.ReactNode; };

export default function BasePage(props: Props) {

  const {children} = props;

  return (<>
    {children}
  </>);
}