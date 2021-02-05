import React from "react";
import { GET_CURRENT_DATE, GET_TOMORROW_DATE } from "../../Helpers/HelperFunc";
import { Days } from "../Days/Days";

export interface DaysContainerProps {}

export const DaysContainer: React.FC<DaysContainerProps> = (props) => {

  const currentDate = GET_CURRENT_DATE();
  const tomorrow = GET_TOMORROW_DATE();
  const days: string[] = [currentDate, tomorrow];
  return <Days days={days}></Days>;
};
