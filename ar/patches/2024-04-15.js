await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-color.js")


noise(0.6,0.0125).color(1,0,0).pixelate(80,45)
.add( noise(0.7,0.015).color(0.5,0,0.5).pixelate(80,45) )
.add( noise(0.8,0.0175).color(0,0,1).pixelate(80,45) )
.diff( noise(0.9,0.02).pixelate(80,45) )
.modulatePixelate( noise(0.9,0.01), 3 )
.contrast( ()=>Math.sin(time/3)*0.5+1.5 )
.rotate( ()=> time * 0.002 )
.monotone(16, ()=>Math.sin(time*0.002)*0.5+0.5, 0.5)
.out()
