import { Icon, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Update, Flag, Visibility, Event } from "@material-ui/icons";
import React from "react";
import { Box, Button, Flex, Heading, Text } from "rebass";
import { GET_DIFF_DAYS_STRS, p_I } from "../../Helpers/HelperFunc";
import { Loading } from "../Loading";

export interface UpdateTablePanelProps {
  onClick: () => void;
  title: string;
  loading: boolean;
  count?: number;
  lastUpdate?: string;
  yesterday?: string;
  globalDisabledButton:boolean;
}

export const UpdateTablePanel: React.FC<UpdateTablePanelProps> = (props) => {

  const diffDays = (props.yesterday && props.lastUpdate) ? GET_DIFF_DAYS_STRS(props.yesterday, props.lastUpdate) : 0;

  let icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> = Event;
  switch(props.title){
    case "Results":
      icon = Flag;
      break;
    case "Eyecatchers":
      icon = Visibility;
      break;
  }

  return <>
  <Flex width="100%">
    {props.loading ? 
      <Loading/> : (
      <Flex flexDirection={["column","row"]} mb={1}  width="100%">
        <Box mr={"auto"} p={[2,20]} width="100%">
          <Heading><Icon component={icon}/>{props.title}</Heading>
          {(props.lastUpdate !== undefined) && <Text>Last: {props.lastUpdate} {(p_I(diffDays) > 0) && <Text as="span">({diffDays})</Text>}</Text>}
          {(props.count !== undefined) && <Text>Meetings: {props.count}</Text>}
        </Box> 
        <Box p={[2,20]}>
          {(props.count !== undefined) && (p_I(props.count) < 1) && props.globalDisabledButton &&
            <Button sx={{cursor:"pointer"}} onClick={props.onClick} width={["100%","auto"]}>
                <Update/>
            </Button>
          }

          {(props.lastUpdate !== undefined && props.yesterday !== undefined) && (props.lastUpdate != props.yesterday) && props.globalDisabledButton &&
            <Button sx={{cursor:"pointer"}} onClick={props.onClick} width={["100%","auto"]}>
                <Update/>
            </Button>
          }

        </Box>
      </Flex>
      )}
  </Flex>

</>;
};
