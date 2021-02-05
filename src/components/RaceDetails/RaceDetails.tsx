import { useQuery } from "@apollo/client";
import { Card } from "@material-ui/core";
import React from "react";
import { Box, Flex, Heading, Text } from "rebass";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";

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

  return <>
    <Flex width="100%">
      {race_loading ? 
        <Loading/> : (
          
        <Flex>
              {race_obj ? (
                <Box>
                  <Heading>{race_obj.time} {race_obj.title}</Heading>
                  <Text>{race_obj.rating}</Text>

                </Box>
              ) : 
                <Box>
                  <Text>No Race data</Text>
                </Box>
                
              }
        </Flex>
        )}
    </Flex>
  </>;;
};
