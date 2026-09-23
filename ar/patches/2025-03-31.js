speed=0.3
shape(4,0.05,0.002).scale(1,1,16/9)
.scrollX( ()=>Math.sin(time/15)*0.25 ).scrollY( ()=>Math.sin(time/15)*0.45 ).scrollX( ()=>Math.cos(time/15)*0.25/2 )

.diff(
	shape(4,0.1,0.002).scale(1,1,16/9)
	.scrollX( ()=>Math.cos(time/17)*0.25 ).scrollY( ()=>Math.cos(time/17)*0.45 ).scrollX( ()=>Math.sin(time/17)*0.25/2 )
).out(o1)

src(o1)
.diff( src(o1).scale(1.1/3.5) )
.diff( src(o1).scale(1.6/3.5) )
.diff( src(o1).scale(1.8/3.5) )
.diff( src(o1).scale(2.5/3.5) )
.diff( src(o1).scale(3.6/3.5) )
.add( src(o1).scale(0.9/3.5), 0.25 )
.out(o2)

src(o2)
.diff( src(o2).scale( ()=>Math.sin(time/3)*0.1+1 ) )
.add( src(o1).scale( ()=>Math.cos(time/10)*0.1+1 ).color(1,0,0).rotate(0.004,0.004) )
.out()
