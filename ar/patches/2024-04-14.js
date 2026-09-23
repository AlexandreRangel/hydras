await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")
//s1.initScreen() // run just once

speed=0.000001
whitenoise( 800,1.01 ).color(0,0,1)
.diff( whitenoise( 400,1.02 ).color(1,0,0).scrollX(0.1,-0.01) )
.diff( whitenoise( 200,1.03 ).color(1,1,0).scrollX(0.05,-0.01) )
  .modulateScale( whitenoise( 25,1 ),0.5 )
.diff( whitenoise( 100,1.04 ).scrollX(0.025,-0.005) )
.diff( whitenoise( 50,1.05 ) )
  .modulateScale( noise(3,3000).contrast(20).pixelate(30,30),1.01 )

  .out(o1)

  src(o1)
    .color(1,0.333,1)
  .colorama(-0.01)
  .scale(1.2)
    .mult(src(o1).scale( ()=>Math.sin(time)*0.333+1.2 ) )
    .color(1,1,0.5)
  .colorama(0.01)
    .diff( src(s1) )
  .mult(src(o1).scale(2), 0.5 )
.rotate( ()=>Math.PI*time*1000 )
.modulateScale( osc(3.5,0,29999900), 1.34 )
        .add( src(s1) ,0.4)
.out()
