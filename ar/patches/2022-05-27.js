speed=0.5
shape([3,4,5,4].fast(0.3).smooth(0.5))
.diff(o0, ()=>Math.sin(time/3)*0.5+0.3 )
.repeat([1,2,1,2,1].fast(0.3),[1,2].fast(0.3))
.repeat(1,[2,1].fast(0.3))
.scrollX(0.01,-0.01)
.pixelate(40,40)
.out()
