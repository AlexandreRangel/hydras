osc( Math.random()*50, Math.random()*-0.05 )
.kaleid( 100 )
.diff(
osc( Math.random()*40, Math.random()*0.04 )
.kaleid( 8 )
)
.diff(
osc( Math.random()*30, Math.random()*-0.03 )
.kaleid( 12 )
.colorama( Math.random()*-0.25 ) 
)
.modulateScale(
osc( Math.random()*20, Math.random()*0.02 )
.kaleid( 4 )
  , (Math.random()*2)-1
)
.modulateScale(
osc(3,-0.01).kaleid(100)
  ,2)
.pixelate(100,20)
.out()
