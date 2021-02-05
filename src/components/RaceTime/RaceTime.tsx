import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { M_Q } from "../../queries/myQueries";
import { Text } from "rebass";

export const GET_RACE_TIME = (race_id: string) => {
  const { loading, data } = useQuery(M_Q.GET_RACETIME_FOR_ID, {variables: { id: race_id }});
  let dayRaces = data?.dayraces;
  let dayRacesObj = (dayRaces && dayRaces.length) ? dayRaces[0] : {};
  return dayRacesObj?.time || race_id;
};
