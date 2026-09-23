await loadScript("https://hyper-hydra.glitch.me/hydra-outputs.js")
oS.setLinear()
//oS.setNearest()

await loadScript("https://hyper-hydra.glitch.me/hydra-outputs.js")
oS.setLinear()
//oS.setNearest()

speed=0.9
voronoi(2.5,0.0333,0).thresh(0.5,0.1)
//.color(1,0,0)
//.diff( voronoi(3.5,0.0333,0).thresh(0.5,0.1)  )
.mult( voronoi(3.4,0.03319,0).thresh(0.5,0.1)  )

.color(0.7,0,0)

.add( voronoi(3.33,0.0313,0).thresh(0.81,0.025).color(0,0,1) )
.add( voronoi(4.5,0.0322,0).thresh(0.81,0.025).color(0,0,1) )
//.add( voronoi(5.4,0.03339,0).thresh(0.81,0.025).color(0,0,1) )

.modulateScrollX(
 osc(18.845,0).thresh(0.5,0)
)

.out(o0)
render(o0)
