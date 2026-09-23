speed=0.2
osc(10,-0.02,0.1) .posterize( ()=>Math.sin(time/7)*4+5 )
.modulate(
  osc(30,0.01,0)
  .posterize( ()=>Math.sin(time/14)*4+5 )
)
.modulateRotate(
  voronoi(3,0.05)
  .posterize( ()=>Math.sin(time/14)*4+5 )
  , [0,Math.PI*2,Math.PI,Math.PI*-2].fast(0.5)
)
.modulateScale(
  osc(3,-0.03,0)
  .posterize( 3 )
  , [1,1.5].fast(1.2)
)
.saturate( 0 ).posterize(16)
//.colorama( [-1,1,-0.2,0.03,-0.5,-0.7,-10,0.2,0.5,1].fast(0.5) )
.out()
