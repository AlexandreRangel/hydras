osc(70,0.01/2.5).rotate(Math.PI/2).luma(0.99,0.01)
.modulate( voronoi(3,0.1) )
.kaleid(4).rotate(0.1,0.01)
.brightness(-0.5)
.out(o1)

src(o1)
.add(
  src(o1)
  .rotate(0.1,0.02)
  .kaleid(8)
  , 0.4 )

.kaleid(32)
.scale(1,1,16/9)
.out()
