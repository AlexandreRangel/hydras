await loadScript("https://hyper-hydra.glitch.me/hydra-text.js")


speed=0.3
osc(32,-0.004,1.25)//.thresh(0.5,0.6)
.modulateScrollX( noise(4,0.04).pixelate(80), 0.7 )
.modulateScrollY( noise(10,0.01).pixelate(120), 0.7 )
.modulateHue( noise(1,0.009).pixelate(80), 180 )
.color(1,1,0.5)
.modulateScale( noise(2.2,0.04).pixelate(8).thresh(0.5,0.2), 1 )

.modulateScale( noise(1.2,0.03).pixelate(4).thresh(0.5,0.1), 1.5 )
.colorama(0.0001)
.modulateScale( shape(4, ()=>Math.cos(time/10)*0.5+0.5 ,0.000), ()=>Math.sin(time*1)*0.5+1.5 )

.modulate( shape(2, ()=>Math.cos(time/10)*0.5+0.5 ,0.000), ()=>Math.sin(time/2)*0.5+0.5 )

.sub( text( '1100000000' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2),0,0) )
.add( text( '0000000011' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.1),0) )
.sub( text( '1111111111' ).scale(0.06).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2),0,0) )
.sub( text( '1010101010' ).scale(0.06).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.1),0) )
.add( text( '1101010100' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2.2),0,0) )
.sub( text( '0000000000' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.3),0) )
.sub( text( '1100000000' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1),0,0) )
.add( text( '1111111111' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.1),0) )
.sub( text( '0000000000' ).scale(0.075).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1),0,0) )
.sub( text( '1010101010' ).scale(0.075).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.1),0) )
.add( text( '1101010100' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1.3),0,0) )
.sub( text( '0010101011' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.3),0) )

.out(o1)

src(o1).diff(src(o1).scale(1.006),0.5)

.sub( text( '1100000000' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2),0,0) )
.add( text( '0000000011' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.1),0) )
.sub( text( '0101010101' ).scale(0.06).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2),0,0) )
.sub( text( '1010101010' ).scale(0.06).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.1),0) )
.add( text( '1101010100' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(2.2),0,0) )
.sub( text( '0010101011' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(2.3),0) )
.sub( text( '1100000000' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1),0,0) )
.add( text( '0000000011' ).scale(0.05).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.1),0) )
.sub( text( '0101010101' ).scale(0.075).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1),0,0) )
.sub( text( '1010101010' ).scale(0.075).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.1),0) )
.add( text( '1101010100' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color([1,0,1,0].fast(1.3),0,0) )
.sub( text( '0010101011' ).scale(0.1).scrollX(()=>Math.random()).scrollY(()=>Math.random()).color(0,[1,0,1,0].fast(1.3),0) )


.out()
