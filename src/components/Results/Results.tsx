import { useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import React from "react";
import { Box, Flex, Text } from "rebass";
import { getAllRaces, GET_DAYS_BETWEEN_INC, GET_DIFF_DAYS_STRS, GET_YESTERDAY_DATE, queryNodeAll, queryNodeHref } from "../../Helpers/HelperFunc";
import { M_Q } from "../../queries/myQueries";
import { Loading } from "../Loading";
import { Table } from "../Table";

export interface ResultsProps {}

export const Results: React.FC<ResultsProps> = (props) => {
  
  const {data, loading, error } = useQuery(M_Q.GET_ALL_RESULTS, {});
  const [insertEyecatcher] = useMutation(M_Q.INSERT_EYECATCHER); 
  const [deleteEyecatcher] = useMutation(M_Q.DELETE_EYECATCHER); 

  const results = data?.ResultsInfo;
  const lastUpdate = data?.ResultsInfo_aggregate?.aggregate?.max?.r_date;
  const yesterday = GET_YESTERDAY_DATE();
  const listOfDates =  GET_DAYS_BETWEEN_INC(yesterday, lastUpdate);
  const diffDays = GET_DIFF_DAYS_STRS(yesterday, lastUpdate);


  const getDay = async (dateStr: string) => {
    console.log(dateStr);
    try {





    } catch (err) {
      console.log(err);
    }
  };

  const updateClick = async () => {
    //listOfDates.slice(0,1)?.map(getDay);

    let listOfResultsUrls = listOfDates.map(x => `https://www.racingpost.com/results/${x}`);
    console.log(listOfResultsUrls);
    listOfResultsUrls = listOfResultsUrls.slice(0,1);
        
    let allDaysResults = await getAllRaces(listOfResultsUrls);

    for (let daysResultsIndex in allDaysResults.results){

      let daysResults  = allDaysResults.results[daysResultsIndex];
      let daysResults_div = daysResults;
      
      
      let fullResults = queryNodeAll(daysResults_div, '[data-test-selector="button-fullResult"]').map(x => "https://www.racingpost.com" + queryNodeHref(x));
      
      console.log(fullResults);
      // fullResults = fullResults.filter(x => {
      //     let okay = false;
      //     let urlSplit = x.split("/");
      //     if(urlSplit.length > 5){
      //         okay = trackOkay(urlSplit[5]) 
      //     }
      //     return okay;
      // });
      
      // let getAllRaces = await getAllRaces(fullResults, true);
      // for (let race_index in getAllRaces.results){
      //     let result_race  = getAllRaces.results[race_index];
      //     let result_race_div = result_race.page_div;
          
      //     let r_id = queryNodeAttr(queryNode(result_race_div, '.rp-resultsWrapper__content'), "data-analytics-race-id") || "-";
      //     let r_date = (queryNodeAttr(queryNode(result_race_div, '.rp-resultsWrapper__content'), "data-analytics-race-date") || "-").replaceAll(" ", "-");
      //     let r_place = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName__name'))  || "-";
      //     let r_requirments = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName_ratingBandAndAgesAllowed'))  || "-";
          
          
      //     let raceDistance = (queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName_distance'))  || "-").replace(/\s/g, '');
      //     let r_distancef = textToFurlong(raceDistance);
          

          
          
      //     let raceTitle = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName__title'))  || "-";
      //     let raceTitleLower = raceTitle.toLowerCase();
      //     let isHurdle = raceTitleLower.includes("hurdle");
      //     let isChase = raceTitleLower.includes("chase");
      //     let isAW = r_place.toLowerCase().includes("(aw)");
          
      //     let r_code = "F";
      //     if(isHurdle){
      //         r_code = "H";
      //     }
      //     if(isChase){
      //         r_code = "C";
      //     }
      //     if(isAW){
      //         r_code = "X";
      //     }
          
      //     let runners = queryNodeAll(result_race_div, ".rp-horseTable__mainRow");
      //     let runner_arr = [];
      //     runners.forEach(h => {
      //         let h_pos = getNodeText(queryNode(h, '[data-test-selector="text-horsePosition"]'))  || "-";
      //         let h_link = getNodeHref(queryNode(h, '[data-test-selector="link-horseName"]'))  || "-";
      //         let h_name = getNodeText(queryNode(h, '[data-test-selector="link-horseName"]'))  || "-";
      //         let h_or = p_I(getNodeText(queryNode(h, '[data-ending="OR"]'))) || 0; 
      //         let h_link_split = h_link ? h_link.split("/") : [];
      //         let h_id = "-";
      //         if(h_link_split.length > 3){
      //             h_id = h_link_split[3]
      //         }
              
      //         let lostdist_node = queryNode(h, '.rp-horseTable__pos__length');

      //         let lostdist = "";
      //         switch(lostdist_node.children.length){
      //           case 1: 
      //             lostdist = lostdist_node.children[0].innerText; 
      //             break;
      //           case 2: 
      //             lostdist = lostdist_node.children[1].innerText.replaceAll("[","").replaceAll("]",""); 
      //             break;
      //         }
      //         let h_lostdist = distanceToWinnerStrToFloat(lostdist);
              
      //         let alreadyIn = resultsInfo.filter(x => x.h_id == h_id && x.r_id == r_id).length;
      //         if(!alreadyIn){
      //           let requestObj = {h_pos, h_link, h_name, h_id, h_or, r_id, r_requirments, r_date, r_code, r_place, r_distancef, h_lostdist};
      //             //console.log("inserting", requestObj);
      //           console.log(requestObj);
      //         }
      //     });

      //}
    }

  }


  const deleteEC = (rowId: number) => {
    console.log(rowId);
  }
  
    
  const columnsForTable = [
    {
      name: "Date",
      selector: "r_date",
      sortable: true,
      wrap: true
    },
    {
      name: "Place",
      selector: "r_place",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Name",
      selector: "h_name",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Pos",
      selector: "h_pos",
      sortable: true,
      right: true,
      wrap: true
    }
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
            <Table data={results} columns={columnsForTable} defaultSortField="r_date" stickyHeader></Table>
            
          </Flex>
          
        )}
    </Flex>
  </>
  
};