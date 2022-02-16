type Point = {x: number, y: number}

const onSegment = (p: Point, q: Point, r: Point) => (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y));

const orientation = (p: Point, q: Point, r: Point) => {
    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // collinear

    return (val > 0) ? 1: 2; // clock or counterclock wise
}

const normalize = (p: Point, q: Point) => {
  const angle = Math.atan2(q.y - p.y, q.x - p.x);
  const distance = 0.005;
  const sin = Math.sin(angle) * distance;
  const cos = Math.cos(angle) * distance;
  return {y: p.y + sin, x: p.x + cos};
}

const doIntersect = (_p1: Point, _q1: Point, _p2: Point, _q2: Point) => {
    const p1 = normalize(_p1, _q1);
    const q1 = normalize(_q1, _p1);
    const p2 = normalize(_p2, _q2);
    const q2 = normalize(_q2, _p2);
    // Find the four orientations needed for general and
    // special cases
    let o1 = orientation(p1, q1, p2);
    let o2 = orientation(p1, q1, q2);
    let o3 = orientation(p2, q2, p1);
    let o4 = orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4) return true;

    // Special Cases
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are collinear and q2 lies on segment p1q1
    if (o2 == 0 && onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are collinear and p1 lies on segment p2q2
    if (o3 == 0 && onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are collinear and q1 lies on segment p2q2
    if (o4 == 0 && onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
}

export const checkForWin = (reactFlowInstance, onWin, onFinish) => {
    // check for a win
    const els = reactFlowInstance.getElements();

    const nodes = {};
    let win = true;
    for(let obj of els.filter(i => !i.id.startsWith('e'))){
      nodes[obj.id] = obj;
      // color game
      // if(obj.data.color == 0){
      //   win = false
      // }
    }
    const intersecting = [];
    for(const edge of els){
      if(edge.id.startsWith('e') || edge.id.includes('__edge')){
        // color game
        // if(nodes[edge.source].data.color == nodes[edge.target].data.color ||
        //   nodes[edge.source].data.color == 0 ||
        //   nodes[edge.target].data.color == 0){
        //     win = false
        // }

        // edge untangle game
        for(const edge2 of els){
          if((edge2.id.startsWith('e') || edge2.id.includes('__edge')) && edge.id !== edge2.id){
            if(doIntersect(
              nodes[edge.source].position,
              nodes[edge.target].position,
              nodes[edge2.source].position,
              nodes[edge2.target].position
            )){
              intersecting.push(edge.id)
              intersecting.push(edge2.id)
            }
          }
        }
        if(intersecting.includes(edge.id)){
          edge.data = {strokeWidth: 4};
        }else{
          edge.data = {strokeWidth: 1};
        }
      }
    }
    if(intersecting.length !== 0){
      win = false
    }
    if(win){
      onWin(els);
    }
    onFinish(els);
  };
