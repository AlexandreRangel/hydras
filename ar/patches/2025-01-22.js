await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

speed=0.5

shape(4,1,0.001).scale(1,0.01,0.5).scrollX( ()=>Math.sin(time/5)*0.2,0.01).scrollX(-0.025,0)
.add( shape(4,1,0.001).scale(1,0.01,0.5).scrollX( ()=>Math.sin(time/5)*0.2,0.01) )
.add( shape(4,1,0.001).scale(1,0.01,0.5).scrollX( ()=>Math.sin(time/5)*0.2,0.01).scrollX(+0.025,0) )

.add(shape(4,1,0.001).scale(1,0.02,0.7).scrollX( ()=>Math.sin(time/6)*0.2,0.01).scrollX(-0.05,0) )
.add( shape(4,1,0.001).scale(1,0.02,0.7).scrollX( ()=>Math.sin(time/6)*0.2,0.01) )
.add( shape(4,1,0.001).scale(1,0.02,0.7).scrollX( ()=>Math.sin(time/6)*0.2,0.01).scrollX(+0.05,0) )


.diff( shape(4,1,0.001).scale(1,0.03,0.8).scrollX( ()=>Math.sin(time/7)*0.2,0.01).scrollX(-0.075,0) )
.diff( shape(4,1,0.001).scale(1,0.03,0.8).scrollX( ()=>Math.sin(time/7)*0.2,0.01) )
.diff( shape(4,1,0.001).scale(1,0.03,0.8).scrollX( ()=>Math.sin(time/7)*0.2,0.01).scrollX(+0.075,0) )
.out(o0)

src(o0)
.modulate( src(o0).scale(1.01).dither4() )
.add( src(o0).scale(3,1,0.2) , 0.05 )
.add( src(o0).scale(3,1,0.19) , 0.075 )
.out(o3)

src(o0)
.modulate( src(o0).scale(1.01).dither4().dither() )
.diff( src(o0).scale(3,1,0.2) , 0.05 )
.diff( src(o0).scale(3,1,0.19) , 0.075 )
//.scale(1,-1,1)
.out(o2)

src(o0)
.modulate( src(o0).scale(1.01).dither4() )
.out(o1)

render()
