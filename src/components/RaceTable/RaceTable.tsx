import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Box, Flex, Text } from "rebass";

export interface RaceTableProps {
  data: any[];
  columns: any[];
}

interface EnhancedTableHeadProps {
  classes: any;
  onRequestSort: any;
  order: 'asc' | 'desc';
  orderBy: string;
  columns: any[];
}


function descendingComparator(a: { [x: string]: number; }, b: { [x: string]: number; }, orderBy: React.ReactText) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any; }) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}



const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)"
    }
  },
  paper: {
    width:"auto",
    maxWidth:"100%"
  },
  table: {
    width:"auto",
    maxWidth:"100%"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  tablecell:{
    padding: "0px 5px",
  }
}));

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const { classes, order, orderBy, onRequestSort, columns } = props;

  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : undefined}
            className={classes.tablecell}
            style={{maxWidth: headCell.width ? headCell.width : "70px", width: headCell.width ? headCell.width : "70px"}}
          >
            <Box onClick={createSortHandler(headCell.id)} sx={{userSelect:"none", cursor:"pointer"}}>
              <Text title={headCell.label} fontSize={"10px"} fontWeight="bold">{headCell.label}</Text>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export const RaceTable: React.FC<RaceTableProps> = (props) => {
  let rows = props.data;
  
  const classes = useStyles();
  const [order, setOrder] = useState<'asc' | 'desc'>("asc");
  const [orderBy, setOrderBy] = useState("draw");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: any, property: React.SetStateAction<string>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, name: string) => {
    console.log(name);
    // const selectedIndex = selected.indexOf(name);
    // let newSelected: any[] | ((prevState: never[]) => never[]) = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    // setSelected(newSelected);
  };


  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={props.columns}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row: any, index: any) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {props.columns.map((col) => 
                        <TableCell align={col.numeric ? 'right': 'left'} 
                        className={classes.tablecell} style={{maxWidth: col.width ? col.width : "70px", width: col.width ? col.width : "70px"}}>
                          <Flex sx={{whiteSpace: "nowrap",overflowX: "hidden"}}>
                            {col.returnFunc ? 
                                col.returnFunc(row)
                            : <Text title={row[col.id]} fontSize={14} width="100%">{row[col.id]}</Text>
                            }
                          </Flex>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

