speed=0.16

noise(6,.04)
.mult( osc(9,0, ()=>Math.sin(time/1.5)+2 ) )
.mult(
    noise(9,.025).brightness(1.2).contrast(2)
    .mult( osc(9,0, ()=>Math.sin(time/3)+13 ) )
  .kaleid(4).scale(0.75,1,16/9)
)
.diff(
    noise(15,.02).brightness(.2).contrast(1.3)
    .mult( osc(9,0, ()=>Math.sin(time/5)+2 ) )
    .rotate( ()=>time/45 )
  	.kaleid(8).scale(0.75,1,16/9)
)
.scale( ()=>Math.sin(time/27)*.50+.60 )
.modulateScale(
    osc( ()=>Math.sin(time/36)*4+5 ,0.0052,0).mult( osc(3,0,0).rotate(3.14/2) )
    .rotate( ()=>time/25 ).scale(.39).scale(1,.6,1).invert()
    , ()=>Math.sin(time/27)*1.5+3  )
	.kaleid(12).scale(0.72,1,16/9)

.diff(
    noise(6,.027).brightness(.2).contrast(1.3)
    .mult( osc(9,0, ()=>Math.sin(time/5)+2 ) )
    .rotate( ()=>time/81 )
  	.kaleid(2).scale(0.52,1,16/9)
)

.mult( shape(100,.9,.005).scale(0.612,1,16/9) )

.out()
