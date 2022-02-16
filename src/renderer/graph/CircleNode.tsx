import { Handle, Position } from 'react-flow-renderer';
import colors from './colors.json';

export const CircleNode = ({ id, data }) => (
  <div className="circle-node" style={{ backgroundColor: colors[data.color]['bg'], color: colors[data.color]['fg']}}>
      { id }
    <Handle type="source" position={ Position.Top } style={{ top: 20, visibility: 'hidden' }} isConnectable={ false } />
  </div>
);
