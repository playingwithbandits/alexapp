import { CardActions, CardContent, CardHeader, Icon, SvgIconTypeMap, Typography } from "@material-ui/core";
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
    {props.loading ? 

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Loading/>
          </Typography>
        </CardContent> : (
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {(props.lastUpdate !== undefined) && <Text>Last Scraped: {props.lastUpdate} {(p_I(diffDays) > 0) && <Text as="span">({diffDays})</Text>}</Text>}
            {(props.count !== undefined) && <Text>Meetings count: {props.count}</Text>}
          </Typography>
          
            {(props.count !== undefined) && (p_I(props.count) < 1) && props.globalDisabledButton &&
              <CardActions disableSpacing>
                <Button sx={{cursor:"pointer"}} onClick={props.onClick} size="small">
                    <Update/>
                </Button>
              </CardActions>
            }
            {(props.lastUpdate !== undefined && props.yesterday !== undefined) && (props.lastUpdate != props.yesterday) && props.globalDisabledButton &&
              <CardActions disableSpacing>
                <Button sx={{cursor:"pointer"}} onClick={props.onClick} size="small" >
                    <Update/>
                </Button>
              </CardActions>
            }
            
          
        </CardContent>
        
      )}

</>;
};
