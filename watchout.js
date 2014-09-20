//declare width, height, enemey radius
var width = 900,
    height = 600,
    circleR = 10,
    buffer = 5,
    setTime = 2500,
    total = 0,
    highScore = 0,
    collisionCount = 0,
    xy = [width/2, height/2],
    collisions = {};

//declare svg element to display game
var svg = d3.select('body').append('svg')
    .attr('class', 'boardGame')
    .attr('width', width)
    .attr('height', height);

//ENEMY MOVEMENT AND INSTANTIATION
var updateEnemies = function(coords){
  var enemy = svg.selectAll('image')
      .data(coords, function(d){ return d; });

  enemy.transition()
      .duration(2500)
      .attr("x", function(d){ return d[0]; })
      .attr("y", function(d){ return d[1]; });


  enemy.enter().append('image')
      .attr('x', function(d){ return d[0];})
      .attr('y', function(d){ return d[1];})
      .attr('height', function(d){ return circleR * 2;})
      .attr('width', function(d){ return circleR * 2;})
      .attr('xlink:href', "Shuriken.png")
      .attr('class', 'enemy');
      //.attr('r', function(d){return circleR;});
}

var updateCoords = function(coords, size){
  //build empty array on first case
  if ( coords === undefined ){
    var coords = [];
    for ( var i = 0 ; i < size; i++){
      coords[i] = [];
    }
  }
  for(var i = 0; i < coords.length; i++){
    coords[i][0] = Math.max(circleR + buffer, (Math.random() * width) - buffer);
    coords[i][1] = Math.max(circleR + buffer, (Math.random() * height) - buffer);
  }
  return coords;
}

var setPlayer = function(item) {
  var player = svg.selectAll('path')
    .data([item], function(d) {return d;});

  player.attr('transform', function(d) { return 'translate(' + d[0] + ', ' + d[1] + ')'});

  player.enter().append('path'
    )
    .attr('class', 'player')
    .attr('d', 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z')
    .attr('transform', function(d) { collisions.x = d[0]; collisions.y = d[1]; return 'translate(' + d[0] + ', ' + d[1] + ')'});

  return player;
}

var checkCollision = function(){
  var pass = true;
  d3.selectAll('image')
  .each(function(d) {
    var distance = Math.sqrt(Math.pow((collisions.x - this.x.animVal.value), 2) + Math.pow((collisions.y - this.y.animVal.value), 2))
    if(distance < (circleR * 2)) {
      if (total > highScore) {
        highScore = getScore();
        d3.select('.high > span').text(highScore);
      }
      collisionCount++;
      d3.select('.collisions > span').text(collisionCount);
      pass = false;
      total = 0;
    }
  });
  if (pass) {
    total += 0.25;
    d3.select('.current > span').text(getScore());
  }
}

var getScore = function() {
  return Math.floor(total);
}
//initiate player and enmies and enable player dragging
var thePlayer = setPlayer(xy);
var drag = d3.behavior.drag();
var coordinates = updateCoords(undefined, 5);
updateEnemies(updateCoords(coordinates));

drag.on('drag', function(d) {
  collisions.x = Math.max(circleR + buffer, d3.event.x - buffer);
  collisions.y = Math.max(circleR + buffer, d3.event.y - buffer);
  xy[0] = collisions.x;
  xy[1] = collisions.y;
  setPlayer(xy);
});
thePlayer.call(drag);

//initiate colision checking & update enemies
setInterval(checkCollision, 25);
setInterval(function() {
  updateEnemies(updateCoords(coordinates));
}, setTime);
