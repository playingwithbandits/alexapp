import { FetchResult, MutationFunctionOptions, MutationResult, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { Flag, Visibility } from "@material-ui/icons";

import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { GET_CURRENT_DATE,GET_YESTERDAY_DATE, GET_DIFF_DAYS_STRS, GET_DAYS_BETWEEN_INC, GET_PAGE_DIV, queryNodeAll, queryNode, queryNodeText } from "../../../Helpers/HelperFunc";
import { M_Q } from "../../../queries/myQueries";
import { Loading } from "../../Loading";
import { Table } from "../../Table";
import { UpdateTablePanel } from "../../UpdateTablePanel";

export interface EyecatchersUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
}

interface Eyecatcher{
  created: string;
  name: string;
  note: string;
}

interface Eyecatchers_insert_input{
  created: string;
  name: string;
  note: string;
}

export const EyecatchersUpdater: React.FC<EyecatchersUpdaterProps> = (props) => {
  
  const {data, loading, error } = useQuery(M_Q.GET_LAST_EYECATCHERS_DATE, {});
  const [insertEyecatcher] = useMutation(M_Q.INSERT_EYECATCHER); 

  const lastUpdate = data?.Eyecatchers_aggregate?.aggregate?.max?.created;
  const yesterday = GET_YESTERDAY_DATE();
  const listOfDates =  GET_DAYS_BETWEEN_INC(yesterday, lastUpdate);

  const getDay = async (dateStr: string) => {
    console.log(dateStr);
    try {
      
          props.setGlobalDisabledButton(false);

          let objects:Eyecatchers_insert_input[] = [];

          let rp_page = "https://www.racingpost.com/results/" +  dateStr;
          const rp_day_node: HTMLDivElement = await GET_PAGE_DIV(rp_page);
          let allMeetings: HTMLDivElement[] = queryNodeAll(rp_day_node, '.rp-raceCourse__panel__details__content');

          allMeetings.forEach(async (meeting: HTMLDivElement) => {
              let star = queryNodeText((queryNode(meeting, '[data-test-selector="link-starPerformerName"]')));
              let starText = queryNodeText(queryNode(meeting, '[data-test-selector="text-starPerformerNotes"]'));
              let eye = queryNodeText(queryNode(meeting, '[data-test-selector="link-eyecatcherName"]'));
              let eyeText = queryNodeText(queryNode(meeting, '[data-test-selector="text-eyecatcherNotes"]'));
              if(star != "-" && star != "") {
                  objects.push({name: star, created: dateStr, note: starText});
              }
              if(eye != "-" && eye != "") {
                  objects.push({name: eye, created: dateStr, note: eyeText});
              }
          })
          
          await insertEyecatcher({
            variables: {objects: objects},
            refetchQueries: [{query: M_Q.GET_LAST_EYECATCHERS_DATE}],
          });

    } catch (err) {
      console.log(err);
    } finally {
      props.setGlobalDisabledButton(true);
    }
  };

  const updateClick = async () => {
      listOfDates?.map(getDay);
  }
  
  return <>

    <UpdateTablePanel loading={loading} title={"Eyecatchers"} lastUpdate={lastUpdate} yesterday={yesterday} onClick={updateClick} globalDisabledButton={props.globalDisabledButton}/>

  </>
  
};
