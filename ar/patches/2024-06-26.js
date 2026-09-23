speed=0.36

osc(10,-0.015,0)
.rotate(Math.PI/2)
.pixelate(10)
.mult( osc(4,0.00333,12).rotate(Math.PI/2) ) //color
.modulateScrollY( osc(20,0.001,0).pixelate(33) ,1)

.out(o0)

src(o0)
.diff(
  src(o0).pixelate(3)
)
.colorama(-0.01)
.out(o1)

render(o1)
