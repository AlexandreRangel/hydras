speed=0.7
mySpeed=0.16
osc(2040,-0.002*mySpeed,0)
.mult( osc(40,-0.003*mySpeed,0).thresh(0.5,0) )
.diff( osc(20,0.002*mySpeed,0).thresh(0.5,0).color(2,0,0) )
.diff( osc(10,0.003*mySpeed,0).thresh(0.5,0).color(0,0,0.5) )
.diff( osc(10,-0.01*mySpeed,2) )
.modulateScale( osc(4.5,-0.04*mySpeed,2),0.81 )
.diff( osc(10,0.01*mySpeed,2) )
.color(1,0.81,1)
.modulate(
  osc( ()=>Math.sin(time/9)*1.5+6.5 ,0,0).thresh(0.5,0)
  .diff( osc(6.27,0,0).rotate(Math.PI/2).thresh(0.5,0) )
  ,0.2
)
.rotate( ()=>time/-90 )
.scrollY(0.01,-0.005)
.scale(1.75)
.rotate( ()=>time/77 )
// .modulate(
//   osc( ()=>Math.sin(time/18)*1.5+6.5 ,0,0).thresh(0.5,0)
//   .diff( osc(6.27,0.001,0).rotate(Math.PI/2).thresh(0.5,0)H )
//   ,0.1
// )
.diff( osc(4,-0.04, ()=>time/54.0 ) )
.mult(
  shape(100,0.56,0.002).scale(1,1,16/9)
  .add( shape(100,0.15,0.002).scale(1,1,16/9).scrollX(0.395,0).scrollY(0.01, 0.01) )
  .add( shape(100,0.15,0.002).scale(1,1,16/9).scrollX(-0.395,0).scrollY(0.01, -0.01)  )
)
.out()
