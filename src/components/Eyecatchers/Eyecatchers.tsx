import { useQuery } from "@apollo/client";
import React from "react";
import { M_Q } from "../../queries/myQueries";

export interface EyecatchersProps {}

export const Eyecatchers: React.FC<EyecatchersProps> = (props) => {
  
  const { data, loading, error } = useQuery(M_Q.GET_ALL_EYECATCHERS, {});

  console.log(data);

  
  return <div>asdasd</div>;
};
