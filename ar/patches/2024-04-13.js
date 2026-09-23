s0.initScreen() // grab Sonic Pi Lisajous graph

src(s0).scrollY(0.01,0.01).kaleid(8).color(0,0.2,1).pixelate(50,20)
.add( src(s0).scrollY(0.005,0.005).kaleid(16).color(1,2,0).pixelate(400) )
.add( src(s0).pixelate(400,10) )
.diff( src(s0).contrast(1).scale(1.1,1,1) )
.out()
