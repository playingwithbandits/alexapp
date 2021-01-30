
import gql from "graphql-tag";

const GET_RACE_RESULTS = gql`
  query GET_RACE_RESULTS(){
    ResultsInfo(limit: 10, order_by: {r_date: desc}) {
      r_requirements
      r_place
      r_id
      r_distancef
      r_date
      r_code
      h_pos
      h_or
      h_name
      h_lostdist
      h_link
      h_id
    }
  }
`;


const GET_TRACK_INFO = gql`
  query GET_TRACK_INFO($ground: string = "", $abbr: string = ""){
    TrackInformation(where: {ground: {_like: $ground}, abbr: {_like: $abbr}}) {
        abbr
        d5
        d6
        d7
        d8
        dir
        dp
        ground
        lat
        location
        long
        name
        namelower
        similarto
        type
    }
  }
`;
const GET_ALL_TRACKS_INFO = gql`
  query GET_ALL_TRACKS_INFO(){
    TrackInformation {
        abbr
        d5
        d6
        d7
        d8
        dir
        dp
        ground
        lat
        location
        long
        name
        namelower
        similarto
        type
    }
  }
`;


const GET_TRAINER_LOCATION = gql`
  query GET_TRAINER_LOCATION($name: string = ""){
    TrainerLocations(where: {name: {_like: $name}}) {
        county
        latitude
        longitude
        name
        postcode
    }
  }
`;


const GET_ALL_TRAINER_LOCATIONS = gql`
  query GET_ALL_TRAINER_LOCATIONS(){
    TrainerLocations {
        county
        latitude
        longitude
        name
        postcode
    }
  }
`;

export const M_Q = {
    GET_RACE_RESULTS, 
    GET_TRACK_INFO, 
    GET_ALL_TRACKS_INFO,
    GET_TRAINER_LOCATION,
    GET_ALL_TRAINER_LOCATIONS,
};