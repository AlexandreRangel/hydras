await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

speed=0.1111

voronoi(1,0.1,0.2222)

.out(o1)

src(o1)
.modulate( voronoi( ()=>Math.sin(time/33)+2 ,0.01), ()=>Math.sin(time/30)*2+5 )

.scale(0.2222)

.colorama( ()=>Math.sin(time/44) )
.dither2()
.scale( ()=>Math.sin(time/55)+1 )
.out(o2)

src(o2)
.mult( src(o2).scale(8) )
.scale(2.5)
.modulateScale( shape(72, ()=>Math.cos(time/3)*1+1.5 ,0.4444), ()=>Math.sin(time/3)*7+7 )
.mult( shape(160,0.995,0.002) )
.out()
