import React from 'react';
import logo from './logo.svg';
import './App.css';
import Provider from './provider';

import {Box, Flex, Text} from "rebass";
import { UpdatersContainer } from './components/Updaters/UpdatersContainer';


const App: React.FC = () => (
    <Flex flexDirection={["column","row"]}>
        <Box>
            <UpdatersContainer />
        </Box>
    </Flex>
);

export default App;
