import { FetchResult, MutationFunctionOptions, MutationResult, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "@storybook/addons";
import React, { useState } from "react";
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

const addEyecatcher = (date: string, data: Eyecatcher[], insertEyecatcher: (options?: MutationFunctionOptions<any, Record<string, any>> | undefined) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>, returning: MutationResult<any>) => {


  const ecObj: Eyecatcher = { created: date, name: "test", note: "test"};
  insertEyecatcher({ variables: ecObj });

  console.log(returning);

  //data?.push(ecObj);
};

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
  }
];

export const Eyecatchers: React.FC<EyecatchersProps> = (props) => {
  
  const { data, loading, error } = useQuery(M_Q.GET_ALL_EYECATCHERS, {});
  const [insertEyecatcher, returning] = useMutation(M_Q.INSERT_EYECATCHER);

  const [lastUpdate, setLastUpdate] = useState(data?.Eyecatchers_aggregate?.aggregate?.max?.created);
  const currentDate = GET_CURRENT_DATE();
  const listOfDates = currentDate && lastUpdate ? GET_DAYS_BETWEEN_INC(currentDate, lastUpdate) : [];
  const diff_days = currentDate && lastUpdate ? GET_DIFF_DAYS_STRS(currentDate, lastUpdate) : 0;

  const [eyecatchers, setEyecatchers] = useState(undefined);

  const onClick = () => {
    listOfDates.map(date => addEyecatcher(date, data?.Eyecatchers, insertEyecatcher, returning))

    setLastUpdate(currentDate);
  }

  return <>
    <Flex>
      {loading ? 
        <Loading/> : (
          <Flex>
            <Box>
              {lastUpdate && 
                <Box>
                  <Text>Last records: {lastUpdate} ({diff_days} days)</Text>
                  {lastUpdate !== currentDate && <Button onClick={onClick} >Update</Button>}
                  <Text>{returning.loading}</Text>
                </Box>
              }
              
            </Box>
            <Table data={data.Eyecatchers} columns={columnsForTable} defaultSortField="created" pagination selectableRows stickyHeader></Table>
            
          </Flex>
          
        )}
    </Flex>
  </>
  
};
