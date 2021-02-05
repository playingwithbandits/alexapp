import React from "react";
import { Day } from "../../components/Day";
import { GET_TOMORROW_DATE } from "../../Helpers/HelperFunc";

export interface TomorrowProps {}

export const Tomorrow: React.FC<TomorrowProps> = (props) => {
  const day = GET_TOMORROW_DATE();
  return <Day date={day}/>;
};
