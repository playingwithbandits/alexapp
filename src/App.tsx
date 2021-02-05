import React, { createRef, SetStateAction, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Provider from './provider';

import {Box, Flex, Text} from "rebass";
import { UpdatersContainer } from './components/Updaters/UpdatersContainer';
import { DaysContainer } from './components/DaysContainer';
import { Container, ListItem, ListItemText } from '@material-ui/core';
import { Route, Switch } from "react-router-dom";
import { routes } from './routes/Routes/Routes';
import { NavLink } from "react-router-dom";
import { GET_CURRENT_DATE, GET_TOMORROW_DATE } from './Helpers/HelperFunc';
import { Sidebar } from './components/Sidebar';

let activeRoute = (routeName: string) => {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
}


const changeName = (name:string, currentDate:string, tomorrow:string) => {
    let changed = name;
    switch(name){
        case "Today":
            changed = currentDate;
            break;
        case "Tomorrow":
            changed = tomorrow;
            break;
    }
    return changed;
};

const App: React.FC = () => {
    const currentDate = GET_CURRENT_DATE();
    const tomorrow = GET_TOMORROW_DATE();

    return (
    <Container maxWidth="xl">
{/*         
        <Box>
            <UpdatersContainer />
            <DaysContainer/>
        </Box> */}

        <Box>
            {routes.map((prop, key) => (
                <NavLink to={prop.layout + prop.path} className={activeRoute(prop.path)} activeClassName="active" key={key}>
                    <ListItem button>
                        <ListItemText
                            primary={changeName(prop.name, currentDate, tomorrow)}
                            disableTypography={true}
                        />
                    </ListItem>
                </NavLink>
            ))}
        </Box>
        <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
        </Switch>

    </Container>
)};

export default App;
