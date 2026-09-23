// many red lines

osc( ()=>Math.sin(time/2)*30+130,0.1,0)
.rotate(Math.PI/2)
.thresh(0.99,0.02)
.modulate( noise(()=>Math.sin(time/3)*0.1+0.9,1.25),0.2 )
.modulateScale( osc(2,0.1),0.5 )
.color(1,0,0)
.out()

speed=0.1
osc( ()=>Math.sin(time/2)*30+130,0.02,0)
.rotate(Math.PI/2)
.thresh(0.99,0.02)
.modulate( noise(()=>Math.sin(time/3)*0.1+0.9,1.25),0.1 )
.modulateScale( osc(2,0.05),0.5 )
.color(1,0,0)
.out()
