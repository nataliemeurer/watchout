// as player is moving, we will store x and y coordinates in colission
// in addition, we will create an event handler on enemies that will save x and y coords
// at all times, the event handler will calculate the distance between the player and each
//
var collisions = {}
var coordinates = updateCoords(undefined, 50);
updateEnemies(updateCoords(coordinates));

setInterval(function() {
  updateEnemies(updateCoords(coordinates));
}, setTime);
