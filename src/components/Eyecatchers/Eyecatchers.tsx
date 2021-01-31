import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "@storybook/addons";
import React, { useState } from "react";
import { Box, Button, Flex, Text } from "rebass";
import { GET_CURRENT_DATE, GET_DIFF_DAYS_STRS } from "../../Helpers/HelperFunc";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";
import { Table } from "../Table";

export interface EyecatchersProps {}

interface Eyecatcher{
  created: string;
  name: string;
  note: string;
}

const addEyecatcher = () => {

};


export const Eyecatchers: React.FC<EyecatchersProps> = (props) => {
  
  const { data, loading, error } = useQuery(M_Q.GET_ALL_EYECATCHERS, {});
  const lastUpdate = data?.Eyecatchers_aggregate?.aggregate?.max?.created;
  const currentDate = GET_CURRENT_DATE();
  const diff_days = GET_DIFF_DAYS_STRS(lastUpdate, currentDate);

  const [eyecatchers, setEyecatchers] = useState(undefined);
  const [addTodo, returning] = useMutation(M_Q.INSERT_EYECATCHER);

  const columns = [
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


  const onClick = () => {
    console.log(currentDate);
    addTodo({ variables: { created: currentDate, name: "test", note: "test"} });
    console.log(returning);
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
                  {lastUpdate !== currentDate && <Button onClick={onClick}>Update</Button>}
                  <Text>{returning.loading}</Text>
                </Box>
              }
              
            </Box>
            <Table data={data.Eyecatchers} columns={columns} size="small" defaultSortField="created" pagination selectableRows stickyHeader></Table>
            
          </Flex>
          
        )}
    </Flex>
  </>
  
};
