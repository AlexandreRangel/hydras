noise(5,0.02).thresh(0.5,0).color(1,0.1,0.1)
.add( noise(5,0.022).thresh(0.5,0).color(1,0.1,0).rotate(-0.01,0.01) , 0.75)
.add( noise(7,0.024).thresh(0.5,0).color(1,0,0) , 0.5)
.modulate( noise (1,0.02) )

.add( noise(15,0.10).thresh(0.7,0).color(1,0,0).rotate(0.01,0.012) , 0.5)
.add( noise(25,0.09).thresh(0.8,0).scale(1,1,0.61).color(1,0.333,0) , 0.75)
.add( noise(30,0.08).thresh(0.8,0).scale(1,1,0.61).color(1,0.333,0) , 0.75)

.add( noise(10,0.08).thresh(0.7,0).scale(1,1,0.61).color(0,1,0) , 0.75)

.add( noise(35,0.07).thresh(0.75,0).scale(1,1,0.61).color(1,0.333,0).rotate(0.01,0.008) , 0.75)

.add( noise(2,0.01).thresh(0.8,0.5).scale(1,1,0.5).color(1,0.25,0) , 0.75)
.diff( noise(0.5,0.011).thresh(0.8,0.5).scale(1,1,0.5).color(2,0,0) , 0.75)

.mult( shape(4,0.8,0.2) )
.contrast(10)
.out()
