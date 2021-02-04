import React from "react";
import { GET_TOMORROW_DATE } from "../../../Helpers/HelperFunc";
import { DateUpdater } from "../DateUpdater";

export interface TomorrowUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
}

export const TomorrowUpdater: React.FC<TomorrowUpdaterProps> = (props) => {
  
  const currentDate = GET_TOMORROW_DATE();
  
  return <DateUpdater 
  globalDisabledButton={props.globalDisabledButton}
  setGlobalDisabledButton={props.setGlobalDisabledButton}
  date={currentDate}/>;
};
