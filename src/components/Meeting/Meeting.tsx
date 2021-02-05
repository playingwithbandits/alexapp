import React from "react";
import { RaceTabs } from "../RaceTabs";

export interface MeetingsProps {
  data?:any;
}

export const Meeting: React.FC<MeetingsProps> = (props) => {
  const races:string[] = props.data?.races ? props.data?.races.split(",") : [];
  return <RaceTabs races={races}/>;
};
