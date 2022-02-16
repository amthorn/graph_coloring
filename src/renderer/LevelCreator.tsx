import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge } from 'react-flow-renderer';
import { List, Box, Button, Paper } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ListItemLink } from "./ListItemLink";
import { GlowingEdge } from "./graph/GlowingEdge";
import { checkForWin } from "./graph/Untangle";
import { levels } from "./levels/untangle/main";
import { v4 } from 'uuid';


let a = false;
const level = '15';
export const LevelCreator = () => {
  const initial = levels[level].map(i => i.type === 'circle' ? ({ ...i, data: { label: i.id }, type: 'default'}) : i);
  const [elements, setElements] = useState(initial);

  return <>
    <Box sx={{ width: 1 }}>
      <Paper elevation={0}>
        <List>
          <ListItemLink to="/main_menu" primary="Back" icon={ <ArrowBackIosNewIcon /> }/>
        </List>
      </Paper>
    </Box>
    <Button onClick={ useCallback(() => {
      const name = v4().substr(0, 4);
      const newNode = {
        id: `${name}`,
        data: { label: name },
        style: {
          width: '50px'
        },
        position: {
          x: 100,
          y: 100,
        },
      };
      setElements((elements) => elements.concat(newNode));
    }, [setElements])}>Add Button</Button>
    <ReactFlow
      onLoad={ (reactFlowInstance) => {
        setInterval(() => checkForWin(reactFlowInstance, ()=>{}, (els) => {setElements(els);}), 250);
        setInterval(() => {
          if(a){
            let temp = reactFlowInstance.getElements();
            temp = temp.map(i => ({
                ...i,
                id: i.id.replace('reactflow__edge-', 'e').split('null').join(''),
                data: {},
                type: i.id.includes('__edge') ? i.type : 'circle'
              }
            ));
            console.log(temp)
            a = false;
          }

        })
      } }
      edgeTypes={ { glowing: GlowingEdge} }
      onConnect={(params) => setElements((els) => addEdge({ ...params, type: 'glowing' }, els))}
      elements={ elements }
      // color game
      // onElementClick={ (_, element) => {
      //   if(!element.id.startsWith('e')){
      //     element.data.color = (element.data.color + 1) % colors.length;
      //   }
      //   setElements(elements.map(i => i.id === element.id ? element : i));
      // } }
      snapToGrid={ true }
      onElementClick={ () => {a = true}}
    />
  </>;
};
