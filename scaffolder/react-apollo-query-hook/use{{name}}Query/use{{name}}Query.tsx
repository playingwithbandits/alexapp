import { useQuery } from "@apollo/react-hooks";

import {{GQL_NAME}} from './{{GQL_NAME}}'

import {
  {{name}},
  {{name}}Variables,
} from "./__generated__/{{name}}";

export const use{{name}}Query = () => {
  const { data, loading } = useQuery<
    {{name}},
    {{name}}Variables
  >({{GQL_NAME}}, {
    variables: {

    },
  });

  return {
    loading,
    data,
  };
};


export type Use{{name}}Query = ReturnType<typeof use{{name}}Query>;
