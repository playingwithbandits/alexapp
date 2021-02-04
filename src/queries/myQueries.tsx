
import gql from "graphql-tag";

const GET_RACES_FOR_MEETING = gql`
  query GET_RACES_FOR_MEETING($in: [String!] = "") {
    dayraces_aggregate(where: {id: {_in: $in}}) {
      aggregate {
        count(distinct: false)
      }
    }
    dayraces(where: {id: {_in: $in}}) {
      winnings
      title
      time
      rating
      link
      id
      horseids
      going
      distancef
      distance
      description
      class
    }
  }
`;

const GET_MEETINGS_FOR_DATE = gql`
  query GET_MEETINGS_FOR_DATE($date: date = "") {
    dayplaces(where: {date: {_eq: $date}}) {
      date
      id
      place
      races
    }
    dayplaces_aggregate(where: {date: {_eq: $date}}) {
      aggregate {
        count(distinct: false)
      }
    }
  }
`;

const GET_ALL_RESULTS = gql`
  query GET_ALL_RESULTS {
    ResultsInfo(limit: 10, order_by: {r_date: desc}) {
      row_id
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
    ResultsInfo_aggregate {
      aggregate {
        max {
          r_date
        }
      }
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
  query GET_ALL_TRACKS_INFO {
    TrackInformation(order_by: {abbr: asc}) {
      namelower
      type
      similarto
      row_id
      name
      long
      location
      lat
      ground
      dp
      dir
      d8
      d7
      d6
      d5
      abbr
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
  query GET_ALL_TRAINER_LOCATIONS {
    TrainerLocations(order_by: {name: asc}){
        county
        latitude
        longitude
        name
        postcode
    }
  }
`;

const GET_ALL_EYECATCHERS = gql`
  query GET_ALL_EYECATCHERS {
    Eyecatchers(limit: 10, order_by: {created: desc}) {
      created
      name
      note
      row_id
    }
    Eyecatchers_aggregate {
      aggregate {
        max {
          created
        }
      }
    }
    }
`;
const GET_LAST_EYECATCHERS_DATE = gql`
  query GET_LAST_EYECATCHERS_DATE {
    Eyecatchers_aggregate {
      aggregate {
        max {
          created
        }
      }
    }
    }
`;


const INSERT_EYECATCHER = gql`
  mutation insert_Eyecatchers($objects: [Eyecatchers_insert_input!]!) {
    insert_Eyecatchers(objects: $objects) {
      affected_rows
    }
  }`;

const DELETE_EYECATCHER = gql`
  mutation delete_Eyecatchers($row_id: Int) {
    delete_Eyecatchers(where: {row_id: {_eq: $row_id}}) {
      affected_rows
    }
  }`;

const INSERT_RESULT = gql`
  mutation insert_ResultsInfo($objects: [ResultsInfo_insert_input!]!) {
    insert_ResultsInfo(objects: $objects) {
      affected_rows
    }
  }`;

const INSERT_MEETING = gql`
  mutation insert_dayplaces($objects: [dayplaces_insert_input!]!) {
    insert_dayplaces(objects: $objects) {
      affected_rows
    }
  }`;

const INSERT_RACE = gql`
  mutation insert_dayraces($objects: [dayraces_insert_input!]!) {
    insert_dayraces(objects: $objects) {
      affected_rows
    }
  }`;

export const M_Q = {
    GET_ALL_RESULTS, 
    GET_TRACK_INFO, 
    GET_ALL_TRACKS_INFO,
    GET_TRAINER_LOCATION,
    GET_ALL_TRAINER_LOCATIONS,
    GET_ALL_EYECATCHERS,
    GET_LAST_EYECATCHERS_DATE,
    INSERT_EYECATCHER,
    DELETE_EYECATCHER,
    INSERT_RESULT,
    GET_MEETINGS_FOR_DATE,
    GET_RACES_FOR_MEETING,
    INSERT_MEETING,
    INSERT_RACE
};