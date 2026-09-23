// as a mandala

// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// "egg of the phoenix"
// Alexandre Rangel
// www.alexandrerangel.art.br/hydra.html

speed=0.3


shape(99,.15*1.79,.5).color(0,1,2)

.diff( shape(240,.5*1.79,0).scrollX(.05).rotate( ()=>time/10 ).color(1,0,.75) )
.diff( shape(99,.4*1.79,0).scrollX(.10).rotate( ()=>time/20 ).color(1,0,.75) )
.diff( shape(99,.3*1.79,0).scrollX(.15).rotate( ()=>time/30 ).color(1,0,.75) )
.diff( shape(99,.2*1.79,0).scrollX(.20).rotate( ()=>time/40 ).color(1,0,.75) )
.diff( shape(99,.1*1.79,0).scrollX(.25).rotate( ()=>time/50 ).color(1,0,.75) )

.modulateScale(
  shape(240,.5*1.79,0).scrollX(.05).rotate( ()=>time/10 )
  , ()=>(Math.sin(time/3)*.2)+.2 )
//.scale(1.1)
//.scale(1.6,.6,1)
.scale(0.25)
.colorama( ()=>(Math.sin(time*0.2)*.27)-0.15 )
.kaleid(6)
.out()
