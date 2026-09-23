voronoi(1,0.015).color(0,0,1)
.add( voronoi(1,0.016).color(1,0,0) )
.add( voronoi(1,0.017).color(1,0,1) )
.add( voronoi(1,0.018).color(0,0,1) )
.diff( voronoi(1,0.019).color(1,0,1) )
.diff( voronoi(1,0.020).color(1,0,0) )
.mult( voronoi(1,0.021).color(1,0,1) )
.repeat(2,1)

.modulate( noise(1,0.01).contrast(0.5) )

.out()
