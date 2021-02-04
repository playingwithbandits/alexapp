import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CURRENT_DATE } from "../../../Helpers/HelperFunc";
import { M_Q } from "../../../queries/myQueries";
import { DateUpdater } from "../DateUpdater";

export interface TodayUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
}

export const TodayUpdater: React.FC<TodayUpdaterProps> = (props) => {

  const currentDate = GET_CURRENT_DATE();
  
  return <DateUpdater 
  globalDisabledButton={props.globalDisabledButton}
  setGlobalDisabledButton={props.setGlobalDisabledButton}
  date={currentDate}/>;
};
