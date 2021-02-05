import React from "react";
import { Day } from "../../components/Day";
import { GET_CURRENT_DATE } from "../../Helpers/HelperFunc";

export interface TodayProps {}

export const Today: React.FC<TodayProps> = (props) => {
  const day = GET_CURRENT_DATE();
  return <Day date={day}/>;
};
