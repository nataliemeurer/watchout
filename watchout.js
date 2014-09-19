//declare width and height
var width = 960,
    height = 500,
    circleR = 10,
    buffer = 10,
    setTime = 1000;

//declare svg element to display game
var svg = d3.select('body').append('svg')
    .attr('class', 'boardGame')
    .attr('width', width)
    .attr('height', height);


//ENEMY MOVEMENT
var updateEnemies = function(coords){
  var enemy = svg.selectAll('circle')
      .data(coords, function(d){ return d; });

  enemy.transition()
      .duration(1000)
      .attr("cx", function(d){ return d[0]; })
      .attr("cy", function(d){ return d[1]; });

  enemy.enter().append('circle')
      .attr('cx', function(d){ return d[0];})
      .attr('cy', function(d){ return d[1];})
      .attr('class', 'enemy')
      .attr('r', function(d){return circleR;});
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
