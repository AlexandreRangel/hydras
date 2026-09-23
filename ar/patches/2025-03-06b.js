speed=0.2222

voronoi(1.2222,0.05)
.out(o1)

src(o1)
.modulate( voronoi( ()=>Math.sin(time/33)+2 ,0.01) , ()=>Math.sin(time/30)*2+5 )
.scale(0.8)
.colorama( ()=>Math.cos(time/21) )
.out(o2)

src(o1).invert()
.layer( src(o2).scale(2).color(2,0,0).mask(src(o1).luma(0.1,0.4) ) )

.colorama( ()=>Math.sin(time/55) )

.modulateRotate( shape(2,0.2,0).rotate(Math.PI/2) , ()=>time/11 )
.modulateScale( shape(2,0.16,0).rotate(Math.PI/2) , 1.4444)

.out()
