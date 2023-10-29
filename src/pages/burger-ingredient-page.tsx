import React from "react";

type Props = { children: React.ReactNode; };

export default function BurgerIngredientPage(props: Props) {

  const {children} = props;

  return (<>
    {children}
  </>);
}