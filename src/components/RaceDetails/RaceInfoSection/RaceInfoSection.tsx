import React from "react";
import { Heading, Text } from "rebass";

export interface RaceInfoSectionProps {
  race_obj: any;
}

export const RaceInfoSection: React.FC<RaceInfoSectionProps> = (props) => {
  let race_obj = props.race_obj;



  return <>
    <Heading>{race_obj.title}</Heading>
    <Text>{race_obj.rating}</Text>
  </>;
};
