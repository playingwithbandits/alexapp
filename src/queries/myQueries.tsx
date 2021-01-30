
import gql from "graphql-tag";

const GET_RESULTS = gql`
  query {
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

export const M_Q = {
    GET_RESULTS,
};