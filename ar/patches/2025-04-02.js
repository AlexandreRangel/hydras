speed=0.7
osc(64,0.01,0).luma(0.995,0).rotate(Math.PI/2)
//.modulate( noise( 2 ,0.01,0) )
.modulateRotate( noise(2,0.005,0).thresh(0.5,0.5), ()=>Math.sin(time/33) )
//.colorama( ()=>Math.sin(time/33)*0.5 )
.out()
