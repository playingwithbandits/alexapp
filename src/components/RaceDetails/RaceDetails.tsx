import { useQuery } from "@apollo/client";
import { Card } from "@material-ui/core";
import React from "react";
import { Box, Flex, Heading, Text } from "rebass";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";
import { HorsesInfoSection } from "./HorsesInfoSection";
import { RaceInfoSection } from "./RaceInfoSection";

export interface RaceDetailsProps {
  race_id: string;
}




export const RaceDetails: React.FC<RaceDetailsProps> = (props) => {
  
  
  const res1 = useQuery(M_Q.GET_RACE_DETAILS, {variables: { id: props.race_id }});
  const [
      { loading: race_loading, data: race_data, error: race_error},
  ] = [res1];
  const dayraces = race_data?.dayraces;
  const race_obj = (dayraces && dayraces.length > 0) ? dayraces[0] : {};

  const horses_ids = race_obj ? race_obj?.horseIds?.split(",") : [];


  const res2 = useQuery(M_Q.GET_HORSES_IN_RACE_DATA, {variables: { raceid: props.race_id, $_in: horses_ids }});
  const [
      { loading: horses_loading, data: horses_data, error: horses_error},
  ] = [res2];

  return <>
    <Box width="100%">
      {race_loading ? 
        <Loading/> : (
          
        <Box>
              {race_obj ? (
                <Box>
                  <Box width={"100%"}>
                    <RaceInfoSection race_obj={race_obj}/>
                  </Box>
                  <Box width={"100%"}>
                    {horses_loading ? 
                    <Loading/> : (
                      <HorsesInfoSection horses={horses_data}/>
                    )}
                  </Box>
                  
                </Box>
              ) : 
                <Box>
                  <Text>No Race data</Text>
                </Box>
                
              }
        </Box>
        )}
    </Box>
  </>;;
};
