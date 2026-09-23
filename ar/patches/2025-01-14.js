await loadScript("https://hyper-hydra.glitch.me/hydra-blend.js")

await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

speed=0.05
shape(4,0.3,0.02).scrollX(0.025,-0.04).scrollY(0.0250,-0.0401).color(0,0,1)
.diff( shape(4,0.25,0).scrollX(0.025,-0.045).scrollY(0.025,-0.0451) )
.diff( shape(4,0.2,0).scrollX(0.025,-0.055).scrollY(0.025,-0.0551) )

.diff( shape(4,0.15,0).scrollX(0.025,0.035).scrollY(0.025,0.0352) )
.diff( shape(4,0.10,0).scrollX(0.025,0.031).scrollY(0.025,0.032) )
.diff( shape(4,0.05,0.02).scrollX(0.025,0.021).scrollY(0.025,0.022).color(1,0,0) )
.out(o1)


src(o1).kaleid(2)
.diff( src(o1).kaleid(4) )
.diff( src(o1).repeat(2).invert().kaleid(4)
     .repeat( ()=>Math.sin(time/19)*3.5+5 )
     .color( ()=>Math.cos(time/10)*1,
             ()=>Math.sin(time/11.1)*0.8-0.4,
             ()=>Math.cos(time/12.2)*1
           )
    .modulateScale(src(o1).kaleid(4)) )
.rotate(Math.PI/2).repeat([2,4,4,8,8,10,4,2].fast(0.7),[2,2,4,8].fast(0.35))
.scrollY(0.1,0.02)
.pixelate(160,160)

.modulateScale( shape(4,0.45,0), 10.99 )
.modulateRotate( shape(4,0.45,0), Math.PI/-1  )

.out(o2)

src(o2).edge().out(o3)

src(o2)

.negate(src(o3).dilate().dither2(), 1)

.out()
