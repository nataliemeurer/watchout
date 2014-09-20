
var xy = [width/2, height/2];
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

var thePlayer = setPlayer(xy);
var drag = d3.behavior.drag();

drag.on('drag', function(d) {
  collisions.x = Math.max(circleR + buffer, d3.event.x - buffer);
  collisions.y = Math.max(circleR + buffer, d3.event.y - buffer);
  xy[0] = collisions.x;
  xy[1] = collisions.y;
  setPlayer(xy);
});

// drag.on('change', function(event) {
//   console.log(event);
// })
var total = 0;
var highScore = 0;
var collisionCount = 0;
thePlayer.call(drag);
var checkCollision = function(){
  var pass = true;
  d3.selectAll('circle').each(function(d) {
    var distance = Math.sqrt(Math.pow((collisions.x - this.cx.animVal.value), 2) + Math.pow((collisions.y - this.cy.animVal.value), 2));
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

setInterval(checkCollision, 25);

var getScore = function() {
  return Math.floor(total);
}
