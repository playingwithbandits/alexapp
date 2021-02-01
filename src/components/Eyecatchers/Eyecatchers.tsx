import { FetchResult, MutationFunctionOptions, MutationResult, useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";

import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Flex, Text } from "rebass";
import { GET_CURRENT_DATE, GET_DIFF_DAYS_STRS, GET_DAYS_BETWEEN_INC } from "../../Helpers/HelperFunc";
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
  const currentDate = GET_CURRENT_DATE();
  const listOfDates =  GET_DAYS_BETWEEN_INC(currentDate, lastUpdate);
  const diffDays = GET_DIFF_DAYS_STRS(currentDate, lastUpdate);


  const updateClick = () => {

    listOfDates?.reverse().map((date:string) => {
      if(date.length){
        const ecObj: Eyecatcher = { created: date, name: "test", note: "test"};
        insertEyecatcher({
          variables: ecObj,
          refetchQueries: [{query: M_Q.GET_ALL_EYECATCHERS}],
        });
      }
    })
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
      sortable: true
    },
    {
      name: "Note",
      selector: "note",
      sortable: true
    },
    {
      name: "Created",
      selector: "created",
      sortable: true,
      right: true
    },
    {
      cell: (row: any) => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => deleteEC(row.row_id)}
        >  
          Delete
        </IconButton>
      )
    }
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
                  {(lastUpdate != currentDate) && 
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
