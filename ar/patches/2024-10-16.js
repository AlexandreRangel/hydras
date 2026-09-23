speed=0.52
osc(10,-0.07,1)
  .modulateScale( noise(4,0.03), 1.1 )
  //.scrollY(0.1,-0.03)
.kaleid(6)
.mult(
osc(20,0.04,12)
.modulateScale( noise(2,0.06), 0.9 )
.scrollX(0.1,-0.02)
.kaleid(8)  
)
.add(
osc(20,0.013,0.5)
.modulateScale( noise(2,0.06),.04 )
.scrollX(0.1,-0.02)
.kaleid(16)  
  ,.75
)
.scale(0.9)
.saturate(1.125)
.brightness(-0.3)
.contrast(1.125)
//.scale(1,9/16,1)

  .out()
