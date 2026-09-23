speed=0.54
noise(9,0.02).contrast(3.5)
.mult( osc(3,-0.2,1) )
.diff( osc(3,-0.1,1).rotate(Math.PI/2) )
.invert()
.add( noise(3,0.09).rotate( ()=>time/22 ) , 1 )
.scale(0.74)
.modulate( osc( ()=>Math.sin(time/99)*0.5+3 ,0.01,1),1.5  )
.out()
