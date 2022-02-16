import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { CircleNode } from './CircleNode';
import initialElements from "../levels/example.json";
import colors from "./colors.json";
import { Backdrop, List, Box, Paper } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ListItemLink } from "../ListItemLink";
import {useParams} from "react-router-dom";

export const Level = () => {
  const {levelId} = useParams();
  const [elements, setElements] = useState(levelId == '1' ? initialElements : []);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  const handleToggle = () => {
    setOpenBackDrop(!openBackDrop);
  };

  const onLoad = (reactFlowInstance) => {
    const intervalId = setInterval(() => {
      // check for a win
      const els = reactFlowInstance.getElements();

      const nodes = {};
      for(let obj of els.filter(i => !i.id.startsWith('e'))){
        nodes[obj.id] = obj;
      }

      let win = true;

      for(let edge of els.filter(i => i.id.startsWith('e'))){
        if(nodes[edge.source].data.color == nodes[edge.target].data.color ||
          nodes[edge.source].data.color == 0 ||
          nodes[edge.target].data.color == 0){
          win = false;
          break;
        }
      }
      if(win){
        handleToggle();
        clearInterval(intervalId);
      }
    }, 250);
  };

  const toggleBackground = (_, element) => {
    element.data.color = (element.data.color + 1) % colors.length;
    setElements(elements.map(i => i.id === element.id ? element : i));
  }

  return <>
    <Box sx={{ width: 1 }}>
      <Paper elevation={0}>
        <List>
          <ListItemLink to="/level_menu" primary="Back" icon={ <ArrowBackIosNewIcon /> }/>
        </List>
      </Paper>
    </Box>
    <ReactFlow
      onLoad={ onLoad }
      nodeTypes={ { circle: CircleNode } }
      elements={ elements }
      onElementClick={ toggleBackground }
    />
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackDrop}
      onClick={handleClose}
    >
      WINNER!
    </Backdrop>
  </>;
};
