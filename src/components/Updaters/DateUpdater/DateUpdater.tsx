import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { arrayToSet, GET_CURRENT_DATE, GET_PAGE_DIV, placeToPlaceKey, p_I, queryNode, queryNodeAll, queryNodeAttr, queryNodeHref, queryNodeText, textToFurlong, trackOkay } from "../../../Helpers/HelperFunc";
import { M_Q } from "../../../queries/myQueries";
import { UpdateTablePanel } from "../../UpdateTablePanel";

export interface DateUpdaterProps {
  globalDisabledButton: boolean;
  setGlobalDisabledButton: (update: boolean | ((prevState: boolean) => boolean)) => void;
  date: string;
}

interface dayplaces_insert_input{
  date: string
  id: string
  place: string
  races: string
}
interface dayraces_insert_input{
  date: string
  class: number
  description: string
  distance: string
  distancef: number
  going: string
  id: string
  link: string
  rating: string
  time: string
  title: string
  winnings: number
}

export const DateUpdater: React.FC<DateUpdaterProps> = (props) => {
  const currentDate = props.date || GET_CURRENT_DATE();
  const res1 = useQuery(M_Q.GET_MEETINGS_FOR_DATE, {variables: { date: currentDate }})
  const res2 = useQuery(M_Q.GET_ALL_TRACKS_INFO, {});
  const [
    { loading: meeting_loading, data: meeting_data, error: meeting_error},
    { loading: tracks_loading, data: tracks_data, error: tracks_error }
] = [res1, res2];

  const [insertMeeting] = useMutation(M_Q.INSERT_MEETING); 
  const [insertRace] = useMutation(M_Q.INSERT_RACE); 

  const amount = meeting_data?.dayplaces_aggregate?.aggregate?.count;
  const tracks_info = tracks_data?.TrackInformation;

  const updateClick = async () => {
    try{
      
      props.setGlobalDisabledButton(false);

      console.log("updater" + currentDate);
      let rp_picks_url = "https://www.racingpost.com/racecards/" + currentDate;

      let meeting_objects:dayplaces_insert_input[] = [];
      let race_objects:dayraces_insert_input[] = [];
      const rp_day_obj = await GET_PAGE_DIV(rp_picks_url);
      let rp_day_node = rp_day_obj;

      let day_races_nodes = queryNodeAll(rp_day_node, '[data-test-selector="RC-courseCards__raceRow"] a');
        
      let day_races = day_races_nodes.map((race_node: HTMLDivElement) => {
          let raceId = queryNodeAttr(race_node, "data-race-id");
          let place = queryNodeAttr(race_node, "data-racecourse");
          let raceTime = queryNodeAttr(race_node, "data-race-time").split(" ").join(":");
          let raceTitle = queryNodeText(queryNode(race_node, '[data-test-selector="RC-courseCards__info"]'));
          let raceDesc = queryNodeText(queryNode(race_node, '[data-test-selector="RC-courseCards__going"]')).replace(/\s\s+/g, ' ');
          let raceLink = queryNodeHref(race_node);
          return {place,raceId,raceTime,raceTitle,raceDesc,raceLink}
      });
      let places = arrayToSet(day_races, "place", "races");
      let dayPlacesArr: any[] = [];
      places.forEach((place : any) => {
          dayPlacesArr.push({
              "id": placeToPlaceKey(place.place),
              "place": place.place,
              "races": place.races
          });
      });
      
      dayPlacesArr = dayPlacesArr.filter((x) => {
          return x.id && trackOkay(x.id, tracks_info);
      });
      
      for (const place of dayPlacesArr) {
        let placeID = place.id;
        let placeName = place.place;
        let placeRaces = place.races.map((x:any) => x.raceId).join(",");

        meeting_objects.push( { id: placeID, place: placeName, date: currentDate, races: placeRaces });

        for await (const race of place.races) {
                
          let raceUrl = "https://www.racingpost.com" + race.raceLink;
          let raceId = race.raceId;

          let race_obj = await GET_PAGE_DIV(raceUrl);
          let race_node = race_obj;
          
          let r_prize = queryNodeText(queryNode(race_node, '[data-test-selector="RC-headerBox__winner"] .RC-headerBox__infoRow__content'));
          let distance = queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__raceDistanceRound"]')).replace(/\s/g, '');
          let distancef = textToFurlong(distance);
          let rclass = p_I(queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__raceClass"]')).match(/\d+/g));;
          let winnings = r_prize ? p_I(r_prize.match(/\d+,*\d*/g).join("").replace(",","")) : 0;
          let going = queryNodeText(queryNode(race_node, '[data-test-selector="RC-headerBox__going"] .RC-headerBox__infoRow__content'));
          let rating = queryNodeText(queryNode(race_node, '[data-test-selector="RC-header__rpAges"]'));
          
          race_objects.push({ 
            id: raceId, 
            time: race.raceTime, 
            title: race.raceTitle,
            description: race.raceDesc,
            link: raceUrl,
            distance: distance,
            distancef: distancef ? distancef : 0,
            class: rclass ? rclass : 0,
            winnings: winnings  ? winnings : 0,
            going: going,
            rating: rating,
            date: currentDate
          });
        }

      }
      await insertRace({
        variables: {objects: race_objects},
        refetchQueries: [{
          query: M_Q.GET_MEETINGS_FOR_DATE,
          variables: { date: currentDate }
        }]
      });
      await insertMeeting({
        variables: {objects: meeting_objects},
        refetchQueries: [{
          query: M_Q.GET_MEETINGS_FOR_DATE,
          variables: { date: currentDate }
        }]
      });

    } catch (err) {
      console.log(err);
    } finally {
      props.setGlobalDisabledButton(true);
    }
  };
  
  return <>
        <UpdateTablePanel loading={meeting_loading} title={currentDate} count={amount} onClick={updateClick} globalDisabledButton={props.globalDisabledButton}/>
      </>;
};
