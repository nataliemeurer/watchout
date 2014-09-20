
var xy = [250, 250];
var setPlayer = function(item) {
  var player = svg.selectAll('path')
    .data([item], function(d) {return d;});

  player.attr('transform', function(d) { return 'translate(' + d[0] + ', ' + d[1] + ')'});

  player.enter().append('path')
    .attr('class', 'player')
    .attr('d', 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z')
    .attr('transform', function(d) { return 'translate(' + d[0] + ', ' + d[1] + ')'});

  return player;
}

var thePlayer = setPlayer(xy);
var drag = d3.behavior.drag();

drag.on('drag', function(d) {
  d3.select(this)
    xy[0] = Math.max(circleR + buffer, d3.event.x - buffer);
    xy[1] = Math.max(circleR + buffer, d3.event.y - buffer);
  setPlayer(xy);
});
// Math.max(circleR + buffer, (Math.random() * width) - buffer);
//     coords[i][1] = Math.max(circleR + buffer, (Math.random() * height) - buffer);

thePlayer.call(drag);
