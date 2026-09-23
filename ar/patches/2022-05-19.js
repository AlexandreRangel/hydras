speed=0.75

x=()=>
osc(35,0,0).rotate(Math.PI/2).thresh(0.05,0)
.modulateScrollY( osc(40,-0.02,0) , ()=>Math.sin(time/2)*0.075 )
.mult(
osc(35,0,0).rotate(Math.PI/2).thresh(0.05,0).scrollY(0.1)
.modulateScrollY( osc(40,-0.02,0) , ()=>Math.cos(time/4)*0.075 )
)
.scrollY(.01,-.025)

x()
.mult(
  x()
  .modulatePixelate( gradient(1) , 100)
  .diff(gradient(0.25).rotate(()=>time/3)).color(1,0.5,1)
  .saturate( ()=>Math.sin(time/3)*2 )
)
.rotate(Math.PI)

  .out()
