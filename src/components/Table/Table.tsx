import React from "react";
import { Box, Flex, Text } from "rebass";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { Card } from "@material-ui/core";

export interface TableProps {
  data: any;
  columns: any;
  title?: string;
  defaultSortField?: string;
  pagination?: boolean;
  selectableRows?: boolean;
  size?: string;
  stickyHeader?: boolean;
}

export const Table: React.FC<TableProps> = (props) => {
  return <Box>
    <Card>
        <DataTable
          sortIcon={<SortIcon />}
          {...props}
        />
      </Card>
  </Box>;
};
