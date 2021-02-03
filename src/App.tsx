import React from 'react';
import logo from './logo.svg';
import './App.css';
import Provider from './provider';

import {Box, Flex, Text} from "rebass";
import { Home } from './components/page/Home';


const App: React.FC = () => (
    <Flex flexDirection={["column","row"]}>
        <Box>
            <Home />
        </Box>
    </Flex>
);

export default App;
