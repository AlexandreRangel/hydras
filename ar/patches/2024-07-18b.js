speed=-0.16
noise(8.81,0.02).contrast(3.5)
.mult( osc(3,-0.2,1) )
.diff( osc(3,-0.1,1).rotate(Math.PI/2) )
.invert()
.add( noise(3,0.09).rotate( ()=>time/22 ) , 1 )
.scale(0.55)
.modulate( osc( ()=>Math.sin(time/99)*0.5+3 ,0.015,1),1.25  )
.out(o0)

src(o0)
.blend( src(o0).scale(1.005).scrollX(0.001).color(1,0,1),0.222 )
.blend( src(o0).scale(1.005).scrollX(0.002).color(1.3,0.3,1.3).modulate(src(o0),0.14),0.2 )
.kaleid(8)
.out(o1)

render(o1)
