import { useMutation, useQuery } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { Flag } from "@material-ui/icons";
import React, { useState } from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { distanceToWinnerStrToFloat, getAllRaces, GET_DAYS_BETWEEN_INC, GET_DIFF_DAYS_STRS, GET_YESTERDAY_DATE, p_I, queryNode, queryNodeAll, queryNodeAttr, queryNodeHref, queryNodeText, queryNodeTextNoEdits, textToFurlong, trackOkay } from "../../../Helpers/HelperFunc";
import { M_Q } from "../../../queries/myQueries";
import { Loading } from "../../Loading";
import { Table } from "../../Table";
import { UpdateTablePanel } from "../../UpdateTablePanel";

export interface ResultsUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
}


interface ResultsInfo_insert_input {
  h_id: String;
  h_link: String;
  h_lostdist: any;
  h_name: String;
  h_or: any;
  h_pos: String;
  r_code: String;
  r_date: String;
  r_distancef: any;
  r_id: String;
  r_place: String;
  r_requirements: String;
}

export const ResultsUpdater: React.FC<ResultsUpdaterProps> = (props) => {
  const res1 = useQuery(M_Q.GET_ALL_RESULTS, {});
  const res2 = useQuery(M_Q.GET_ALL_TRACKS_INFO, {});

  const [
    { loading: results_loading, data: results_data, error: results_error},
    { loading: tracks_loading, data: tracks_data, error: tracks_error }
] = [res1, res2];

  const [insertResult] = useMutation(M_Q.INSERT_RESULT); 

  const results = results_data?.ResultsInfo;
  const tracks_info = tracks_data?.TrackInformation;
  const lastUpdate = results_data?.ResultsInfo_aggregate?.aggregate?.max?.r_date;
  const yesterday = GET_YESTERDAY_DATE();
  const listOfDates =  GET_DAYS_BETWEEN_INC(yesterday, lastUpdate);

  const [showClick, setShowClick] = useState(true);
  
  const updateClick = async () => {
    try {

      props.setGlobalDisabledButton(false);

      let objects:ResultsInfo_insert_input[] = [];

      let listOfResultsUrls = listOfDates.map(x => `https://www.racingpost.com/results/${x}`);
          
      let allDaysResults = await getAllRaces(listOfResultsUrls);
      
      for (let daysResultsIndex in allDaysResults.results){
  
        let daysResults  = allDaysResults.results[daysResultsIndex];
        let daysResults_div = daysResults;
        
        let fullResults = queryNodeAll(daysResults_div, '[data-test-selector="button-fullResult"]').map(x => "https://www.racingpost.com" + queryNodeHref(x));
        
        fullResults = fullResults.filter(x => {
            let okay = false;
            let urlSplit = x?.split("/") || [];
            if(urlSplit.length > 5){
                okay = trackOkay(urlSplit[5], tracks_info);
            }
            return okay;
        });
      
        let getAllRaces1 = await getAllRaces(fullResults);
        for (let race_index in getAllRaces1.results){
            let result_race  = getAllRaces1.results[race_index];
            let result_race_div = result_race;
            
            let r_id = queryNodeAttr(queryNode(result_race_div, '.rp-resultsWrapper__content'), "data-analytics-race-id") || "-";
            let r_date = (queryNodeAttr(queryNode(result_race_div, '.rp-resultsWrapper__content'), "data-analytics-race-date") || "-").replaceAll(" ", "-");
            let r_place = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName__name'))  || "-";
            let r_requirements = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName_ratingBandAndAgesAllowed'))  || "-";
            
            
            let raceDistance = (queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName_distance'))  || "-").replace(/\s/g, '');
            let r_distancef = textToFurlong(raceDistance);
            
            let raceTitle = queryNodeTextNoEdits(queryNode(result_race_div, '.rp-raceTimeCourseName__title'))  || "-";
            let raceTitleLower = raceTitle.toLowerCase();
            let isHurdle = raceTitleLower.includes("hurdle");
            let isChase = raceTitleLower.includes("chase");
            let isAW = r_place.toLowerCase().includes("(aw)");
            
            let r_code = "F";
            if(isHurdle){
                r_code = "H";
            }
            if(isChase){
                r_code = "C";
            }
            if(isAW){
                r_code = "X";
            }
            
            let runners = queryNodeAll(result_race_div, ".rp-horseTable__mainRow");
            let runner_arr = [];
            
            runners.forEach(async h => {
                let h_pos = queryNodeText(queryNode(h, '[data-test-selector="text-horsePosition"]'))  || "-";
                let h_link = queryNodeHref(queryNode(h, '[data-test-selector="link-horseName"]'))  || "-";
                let h_name = queryNodeText(queryNode(h, '[data-test-selector="link-horseName"]'))  || "-";
                let h_or = p_I(queryNodeText(queryNode(h, '[data-ending="OR"]'))) || 0; 
                let h_link_split = h_link ? h_link.split("/") : [];
                let h_id = "-";
                if(h_link_split.length > 3){
                    h_id = h_link_split[3]
                }
                
                let lostdist_node = queryNode(h, '.rp-horseTable__pos__length');
  
                let lostdist = "";
                switch(lostdist_node.children.length){
                  case 1: 
                    lostdist = lostdist_node.children[0].innerText; 
                    break;
                  case 2: 
                    lostdist = lostdist_node.children[1].innerText.replaceAll("[","").replaceAll("]",""); 
                    break;
                }
                let h_lostdist = distanceToWinnerStrToFloat(lostdist);
                
                let alreadyIn = results.filter((x: { h_id: string; r_id: string; }) => x.h_id == h_id && x.r_id == r_id).length;
                if(!alreadyIn){
                  let requestObj:ResultsInfo_insert_input = {h_pos, h_link, h_name, h_id, h_or, r_id, r_requirements, r_date, r_code, r_place, r_distancef, h_lostdist};
                    //console.log("inserting", requestObj);
                  objects.push(requestObj);
                }
            });
  
        }
      }
      
      await insertResult({
        variables: {objects: objects},
        refetchQueries: [{query: M_Q.GET_ALL_RESULTS}],
      });
    } catch (err) {
      console.log(err);
    } finally {
      props.setGlobalDisabledButton(true);
    }
  }
  
  return <>
    
    <UpdateTablePanel loading={results_loading} title={"Results"} lastUpdate={lastUpdate} yesterday={yesterday} onClick={updateClick} globalDisabledButton={props.globalDisabledButton}/>
  </>
  
};