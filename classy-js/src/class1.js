
export function Class({initialize, getA, getB}) {
 
  if (initialize === undefined) {
    return function() {};
  }

  initialize.prototype.getA = getA;
  initialize.prototype.getB = getB;

  return initialize;
}