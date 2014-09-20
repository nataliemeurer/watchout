//declare width, height, enemey radius
var width = 1700,
    height = 900,
    circleR = 10,
    buffer = 5,
    setTime = 2500;

//declare svg element to display game
var svg = d3.select('body').append('svg')
    .attr('class', 'boardGame')
    .attr('width', width)
    .attr('height', height);


//ENEMY MOVEMENT AND INSTANTIATION
var updateEnemies = function(coords){
  var enemy = svg.selectAll('circle')
      .data(coords, function(d){ return d; });

  enemy.transition()
      .duration(2500)
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

