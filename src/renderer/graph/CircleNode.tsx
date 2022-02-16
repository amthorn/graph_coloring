import { Handle, Position } from 'react-flow-renderer';
import colors from './colors.json';

export const CircleNode = ({ id, data }) => (
  <div className="circle-node" style={{
    backgroundColor: data?.color ? colors[data.color]['bg'] : 'white',
    color: data?.color ? colors[data.color]['fg']: 'black'
  }}>
      { id }
    <Handle type="source" position={ Position.Top } style={{ top: 20, visibility: 'hidden' }} isConnectable={ false } />
  </div>
);
