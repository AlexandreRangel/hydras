speed=-0.5

voronoi(1.5,0.03/2,1.25).color(2,0,0)
.diff( voronoi(1.6,-0.04/2,1.25).color(0,2,0) )
.diff( voronoi(1.7,0.05/2,1.25).color(0,0,2) )
.kaleid(2)

.diff( voronoi(1.8,-0.06/2,1.25).color(2,0,0) )
.diff( voronoi(1.9,0.07/2,1.25).color(0,2,0) )
.diff( voronoi(1.0,-0.08/2,1.25).color(0,0,2) )
.rotate(0.005,-0.005)

.diff( voronoi(1.8/2,-0.06/3,1.25).color(2,0,0) )
.diff( voronoi(1.9/2,0.07/3,1.25).color(0,2,0) )
.diff( voronoi(1.0/2,-0.08/3,1.25).color(0,0,2) )
.rotate(0.003,-0.003)

.diff( voronoi(1.8/3,-0.06/4,1.25).color(1,0,0) )
.diff( voronoi(1.9/3,0.07/4,1.25).color(0,1,0) )
.diff( voronoi(1.0/3,-0.08/4,1.25).color(0,0,2) )
.rotate(0.002,-0.002)

//.kaleid(4)

.colorama(-0.025)

//.kaleid(16)

.scale(1,1/3,1)
.color(1.5,0.1,1.75)

  .out()
