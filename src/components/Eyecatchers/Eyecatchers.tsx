import { FetchResult, MutationFunctionOptions, MutationResult, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";

import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Flex, Text } from "rebass";
import { GET_CURRENT_DATE,GET_YESTERDAY_DATE, GET_DIFF_DAYS_STRS, GET_DAYS_BETWEEN_INC, GET_PAGE_DIV, queryNodeAll, queryNode, queryNodeText } from "../../Helpers/HelperFunc";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";
import { Table } from "../Table";

export interface EyecatchersProps {}

interface Eyecatcher{
  created: string;
  name: string;
  note: string;
}

export const Eyecatchers: React.FC<EyecatchersProps> = (props) => {
  
  const {data, loading, error } = useQuery(M_Q.GET_ALL_EYECATCHERS, {});
  const [insertEyecatcher] = useMutation(M_Q.INSERT_EYECATCHER); 
  const [deleteEyecatcher] = useMutation(M_Q.DELETE_EYECATCHER); 

  const eyecatchers = data?.Eyecatchers;
  const lastUpdate = data?.Eyecatchers_aggregate?.aggregate?.max?.created;
  const yesterday = GET_YESTERDAY_DATE();
  const listOfDates =  GET_DAYS_BETWEEN_INC(yesterday, lastUpdate);
  const diffDays = GET_DIFF_DAYS_STRS(yesterday, lastUpdate);


  const getDay = async (dateStr: string) => {
    console.log(dateStr);
    try {

          let rp_page = "https://www.racingpost.com/results/" +  dateStr;
          const rp_day_node: HTMLDivElement = await GET_PAGE_DIV(rp_page);
          let allMeetings: HTMLDivElement[] = queryNodeAll(rp_day_node, '.rp-raceCourse__panel__details__content');

          allMeetings.forEach(async (meeting: HTMLDivElement) => {
              let star = queryNodeText((queryNode(meeting, '[data-test-selector="link-starPerformerName"]')));
              let starText = queryNodeText(queryNode(meeting, '[data-test-selector="text-starPerformerNotes"]'));
              let eye = queryNodeText(queryNode(meeting, '[data-test-selector="link-eyecatcherName"]'));
              let eyeText = queryNodeText(queryNode(meeting, '[data-test-selector="text-eyecatcherNotes"]'));
              if(star != "-" && star != "") {
                  console.log({name: star, created: dateStr, note: starText});
                  await insertEyecatcher({
                    variables: {name: star, created: dateStr, note: starText},
                    refetchQueries: [{query: M_Q.GET_ALL_EYECATCHERS}],
                  });
              }
              if(eye != "-" && eye != "") {
                  console.log({name: eye, created: dateStr, note: eyeText});
                  await insertEyecatcher({
                    variables: {name: eye, created: dateStr, note: eyeText},
                    refetchQueries: [{query: M_Q.GET_ALL_EYECATCHERS}],
                  });
              }
          })


    } catch (err) {
      console.log(err);
    }
  };

  const updateClick = async () => {
      listOfDates?.map(getDay);
  }


  const deleteEC = (rowId: number) => {
    console.log(rowId);
    deleteEyecatcher({
      variables: {row_id: rowId},
      refetchQueries: [{query: M_Q.GET_ALL_EYECATCHERS}],
    });
  }
  
    
  const columnsForTable = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Note",
      selector: "note",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Created",
      selector: "created",
      sortable: true,
      right: true,
      wrap: true
    },
    // {
    //   cell: (row: any) => (
    //     <IconButton
    //       aria-label="delete"
    //       color="secondary"
    //       onClick={() => deleteEC(row.row_id)}
    //     >  
    //       Delete
    //     </IconButton>
    //   )
    // }
  ];
  
  return <>
    <Flex>
      {loading ? 
        <Loading/> : (
          <Flex>
            <Box>
              {lastUpdate ? (
                <Box>
                  <Text>Last records: {lastUpdate} ({diffDays} days)</Text>
                  {(lastUpdate != yesterday) && 
                    <IconButton 
                      aria-label="delete"
                      color="primary" 
                      onClick={updateClick}>
                        Update
                    </IconButton>
                  }
                </Box>
              ) :  null}
              
            </Box>
            <Table data={eyecatchers} columns={columnsForTable} defaultSortField="created" stickyHeader></Table>
            
          </Flex>
          
        )}
    </Flex>
  </>
  
};
