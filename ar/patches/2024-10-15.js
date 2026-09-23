speed=0.3
osc(10,-0.07,1)
  .modulate( noise(4,0.03) )
  //.scrollY(0.1,-0.03)
.kaleid(6)
.diff(
osc(20,0.04,12)
.modulate( noise(2,0.06) )
.scrollX(0.1,-0.02)
.kaleid(8)  
)
// .diff(
// osc(20,0.013,0.5)
// .modulate( noise(2,0.06) )
// .scrollX(0.1,-0.02)
// .kaleid(16)  
// )
.scale(1,9/16,1)
  .out()
