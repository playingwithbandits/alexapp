import { useQuery } from "@apollo/client";
import React from "react";
import { Box, Flex, Text } from "rebass";
import { GET_CURRENT_DATE } from "../../Helpers/HelperFunc";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";
import { Meeting } from "../Meeting";
import { MeetingAccordion } from "../MeetingAccordion";
export interface DayProps {
  date?: string;
}

export const Day: React.FC<DayProps> = (props) => {

  const currentDate = props.date || GET_CURRENT_DATE();
  const res1 = useQuery(M_Q.GET_MEETINGS_FOR_DATE, {variables: { date: currentDate }})
  const [
    { loading: meeting_loading, data: meeting_data, error: meeting_error}
] = [res1];

  let length = meeting_data?.dayplaces ? meeting_data?.dayplaces.length : 0;

  return <Flex width="100%">
  {meeting_loading ? 
    <Loading/> : (
    <Flex width="100%">
      <Box width="100%">
          {length ? 
            <MeetingAccordion data={meeting_data?.dayplaces}/>
          : 
            <Text>Day not made.</Text>
          }
      </Box> 
    </Flex>
    )}
</Flex>
};
