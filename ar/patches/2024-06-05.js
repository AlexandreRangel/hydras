solid(.1,.1,.1).mult( shape(100,0.3,0.001) )

.add(
osc(20,0.01,0).rotate(Math.PI/2).color(0.7,0.1,0.4).contrast(0.95).rotate( ()=> time*-0.0225 )
.mult( shape(100,0.325,0.001)
.mult( shape(1,0,0.001).rotate(-0.8) )
.mult( shape(1,0,0.001).rotate(+0.8) )
.rotate( ()=> time*0.0225 )
))

.add(
osc(20,0.01,0).rotate(Math.PI/2).color(0.3,0.1,0.8).contrast(0.95).rotate( ()=> time*0.025 )
.mult( shape(100,0.325,0.001)
.mult( shape(1,0,0.001).rotate(-0.8) )
.mult( shape(1,0,0.001).rotate(-1.8) )
.rotate( ()=> time*-0.025 )
))

.add(
osc(20,0.01,0).rotate(Math.PI/2).color(0.3,0.1,0.8).rotate( ()=> time*-0.0275 )
.mult( shape(100,0.28,0.001)
.mult( shape(1,0,0.001).rotate(-1.8) )
.mult( shape(1,0,0.001).rotate(-2.8) )
.rotate( ()=> time*0.0275 )
))

.add(
osc(20,0.01,0).rotate(Math.PI/2).color(0.3,0.8,0.2).rotate( ()=> time*0.03 )
.mult( shape(100,0.3,0.001)
.mult( shape(1,0,0.001).rotate(-2.8) )
.mult( shape(1,0,0.001).rotate(-3.8) )
.rotate( ()=> time*-0.03 )
))

.mult( shape(100,0.175,0.001).invert(), 0.333 )
.mult( osc(40,-0.01,1).kaleid(36).mult( shape(100,0.078,0.001).color(.6,.6,.6) ).invert() ) // iris
.add( shape(100,0.111,0.001).mult( shape(100,0.078,0.001).invert() ), 0.7 ) // tarja branca
.mult( shape(100,0.097,0.001).invert().add( shape(100,0.09,0.001) ), 0.75 ) // linha preta

.scale(1,1,16/9)

.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.20,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.22,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.24,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.20,0).scrollY(0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.22,0).scrollY(0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.20,0).scrollY(0.070,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.19,0).scrollY(0.105,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.20,0).scrollY(-0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.22,0).scrollY(-0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.20,0).scrollY(-0.070,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(0.19,0).scrollY(-0.105,0) ) //1

.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.20,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.22,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.24,0) ) //3
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.20,0).scrollY(0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.22,0).scrollY(0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.20,0).scrollY(0.070,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.19,0).scrollY(0.105,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.20,0).scrollY(-0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.22,0).scrollY(-0.035,0) ) //2
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.20,0).scrollY(-0.070,0) ) //1
.add( shape(32,0.0125,0.001).scale(1,1,16/9).scrollX(-0.19,0).scrollY(-0.105,0) ) //1

.scale(1.5)

.out()
