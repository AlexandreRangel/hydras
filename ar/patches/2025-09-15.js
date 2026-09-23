osc(24,-0.03,2)
.diff(shape(2,0.2,0).scrollY(0.4,0))
.diff(shape(2,0.2,0).scrollY(+0.0,0))
.diff(shape(2,0.2,0).scrollY(-0.4,0))
.out(o1)

src(o1)
.modulate( src(o1), ()=>Math.sin(time/9)*.2+0.5  )

.out()
