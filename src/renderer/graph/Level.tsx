import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { CircleNode } from './CircleNode';
// import colors from "./colors.json";
import { Backdrop, List, Box, Paper } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ListItemLink } from "../ListItemLink";
import { useParams } from "react-router-dom";
import { levels } from "../levels/untangle/main";
import { GlowingEdge } from "./GlowingEdge";
import { checkForWin } from "./Untangle";


let a = false;
export const Level = () => {
  const { levelId } = useParams();
  const [elements, setElements] = useState(levels[levelId]);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  return <>
    <Box sx={{ width: 1 }}>
      <Paper elevation={0}>
        <List>
          <ListItemLink to="/level_menu" primary="Back" icon={ <ArrowBackIosNewIcon /> }/>
        </List>
      </Paper>
    </Box>
    <ReactFlow
      onLoad={ (reactFlowInstance) => {
        const intervalId = setInterval(() => checkForWin(
          reactFlowInstance,
          (_) => {},
          (els) => {setElements(els);}
        ), 250);
        const debug = setInterval(() => {
          if(a){
            console.log(reactFlowInstance.getElements())
            a = false;
          }

        })
      } }
      nodeTypes={ { circle: CircleNode } }
      edgeTypes={ { glowing: GlowingEdge} }
      elements={ elements }
      // color game
      // onElementClick={ (_, element) => {
      //   if(!element.id.startsWith('e')){
      //     element.data.color = (element.data.color + 1) % colors.length;
      //   }
      //   setElements(elements.map(i => i.id === element.id ? element : i));
      // } }
      onElementClick={ () => {a = true}}
    />
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={ openBackDrop }
      onClick={ () => { setOpenBackDrop(false) } }
    >
      SUCCESS!
    </Backdrop>
  </>;
};
