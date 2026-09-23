speed=0.5
osc(60,-0.04,0).thresh(0.5,0.1)
.add(
osc(60,-0.02/2,0).thresh(0.5,0.3).color(1,0,2)
)
.diff(
osc(60,-0.01/2,0).rotate(Math.PI/2).thresh(0.5,0.02)
)
.pixelate(
  ()=>Math.sin(time/21)*15+16,
  ()=>Math.cos(time/14)*15+16,
)  
.saturate( ()=>Math.sin(time/3)*0.7+0.7 )
// them distorts
.modulateRotate(
  osc(10,0.01).kaleid(99),()=>Math.sin(time*0.2)*-Math.PI/4
)
.modulateScale(
  osc(10,0.01).kaleid(63),()=>Math.cos(time*0.4)*.3-0.4
)
  .out()
