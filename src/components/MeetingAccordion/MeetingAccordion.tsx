import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Meeting } from '../Meeting/Meeting';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export interface MeetingAccordionProps {
  data: any;
}

export const MeetingAccordion: React.FC<MeetingAccordionProps> = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel:string) => (event:any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };

  console.log(props.data);
  return (
    <div className={classes.root}>

      {props.data?.map((meeting: any) => (
      
        <Accordion expanded={expanded === meeting.id} onChange={handleChange(meeting.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel1bh-content" + meeting.id}
            id={"panel1bh-header" + meeting.id}
          >
            <Typography className={classes.heading}>{meeting.place}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Meeting data={meeting} />
          </AccordionDetails>
        </Accordion>
      ))} 
    </div>
  );
}

