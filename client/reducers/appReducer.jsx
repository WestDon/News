//var Map = require("immutable").Map;
 
function getInitialState(){
    return {
        test:1,
    };
}

var reducer = function(state = getInitialState(), action) {
  switch (action.type) {
    case "TEST":
    const doc = state;
    const test = action.test;
        return {
            ...doc,
            test
        };
  }
  return state;
}
module.exports = reducer;