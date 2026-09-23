osc(2222,-0.01,0).thresh(0.5,0.5)
.modulateScale( osc(5,-0.0007,0).kaleid(250),2 )

.mult(
  osc(60,-0.01,2)
  //.rotate( ()=>time/30 )
.modulateScale( osc( ()=>Math.sin(time/30)*14+15 ,-0.001,0).kaleid(250),2 )
)

.out()
