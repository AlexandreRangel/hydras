speed=0.3
noise(1,0.1/2).pixelate(16,9)
.mult( noise(2,0.1/4).pixelate(16*2,9*2) )
.diff( noise(2.5,0.1/6).pixelate(16*4,9*4) )
.diff( noise(3,0.1/8).pixelate(16*8,9*8) )
.modulatePixelate( noise(2,0.1/2), ()=>Math.sin(time/9)+1.5 )
.colorama( ()=>Math.sin(time/9)-0.5 )
.out()
