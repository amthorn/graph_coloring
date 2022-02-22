import './App.css';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

import { Level } from "./graph/Level";
import { MainMenu } from "./menus/MainMenu";
import { LevelMenu } from "./menus/LevelMenu";
import { LevelCreator } from "./LevelCreator";

export const App = () => (
  <Container style={{ width: '100%', height: '100%'}}>
    <MemoryRouter initialEntries={['/main_menu']} initialIndex={0}>
      <CssBaseline/>
      <Routes>
        <Route path="/level_creator" element={ <LevelCreator /> } />
        <Route path="/levels/:levelId" element={ <Level /> } />
        <Route path="/level_menu" element={ <LevelMenu /> } />
        <Route path="/main_menu" element={ <MainMenu/> } />
        <Route path="*" element={ <span>404 NOT FOUND</span> } />
      </Routes>
    </MemoryRouter >
  </Container>
);
