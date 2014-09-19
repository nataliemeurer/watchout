var coordinates = updateCoords(undefined, 50);
updateEnemies(updateCoords(coordinates));

setInterval(function() {
  updateEnemies(updateCoords(coordinates));
}, setTime);
