await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

speed=0.19

osc(100,-0.01)
//.thresh(0.5,0.5)
.kaleid(4)
.rotate(0.05,0.04)
.brightness(-0.25)
  .dither2()

.diff( 
  osc(20,-0.01, ()=>Math.sin(time)*0.5+12.5 )
  .kaleid(2)
  .rotate(0.05,0.04)
)
.modulate(
  noise( ()=>Math.sin(time/13)*1+2 ,0.005)
)
.kaleid(4)
.colorama( ()=>Math.sin(time/91)*0.75-0.2).repeat(2,2)
.modulate(osc(10,-0.041).thresh(0.5,0).kaleid(64) )
.repeat(2,2)
  .kaleid(8)

.mult( shape(128,0.992,0.0025) )
  .out()
