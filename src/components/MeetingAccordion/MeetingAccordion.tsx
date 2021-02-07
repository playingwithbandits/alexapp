import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Meeting } from '../Meeting/Meeting';


const isMobile = true;

const useStyles = makeStyles((theme) => ({
  root: {
    width: isMobile ? 'calc(100vw - 164px)' : 'calc(100vw)',
    padding:0
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(22),
    color: theme.palette.text.secondary,
  },
  removeBottomPadding: {
      padding: "0px"
  }
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
            <Typography className={classes.heading} component="h2">{meeting.place}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.removeBottomPadding}>
            <Meeting data={meeting} />
          </AccordionDetails>
        </Accordion>
      ))} 
    </div>
  );
}

