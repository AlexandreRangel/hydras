speed=1
//s0.initScreen()
a=()=>osc(50,0).thresh(0.5,0)
b=()=>osc(75,0).thresh(0.5,0)
c=()=>osc(100,0).thresh(0.5,0)

v1=Math.random()
v2=Math.random()
v3=Math.random()
v4=Math.random()*-0.00001/4.3
v5=Math.random()*0.000012/4.3
v6=Math.random()*-0.000013/4.3

a().mask(
  shape(4,Math.random()*0.7)
  .scrollX( Math.random()*2-1)
    .scrollY( [v2,v3,v1].fast(0.213) )
      .modulateRotate(src(s0).scale(1.3),Math.PI)

)
.diff(
  b().mask(
  shape(4,Math.random()*0.7)
  .scrollX( Math.random()*2-1)
  .scrollY( [v1,v2,v3].fast(0.123) )
        .modulateRotate(src(s0).scale(1.3),Math.PI/2)
)
)
.diff(
  c().mask(
  shape(4,Math.random()*0.7)
  .scrollX( Math.random()*2-1)
   .scrollY( [v3,v1,v2].fast(0.3) )
    .modulateRotate(src(s0).scale(1.3),Math.PI/3)
)
)
.diff(
  src(o0).scrollY( Math.random()*0.00002, Math.random()*0.00000113)
  .scrollX( [v4,v5,v6],[v6,v4,v5]  )
  )
.mask(src(o0).brightness([12,2,7,3,5].smooth(0.7)).contrast([14,5,7].smooth(1).fast(0.43)))
.color(0,[v1,v3,v2].smooth(0.5),0)
.scrollY(0.00001,0.00002)
.scale(1.001)
.mask( src(s0).scale(1.3).contrast(10) )
.add( src(s0).scale(1.3) )
.mult( src(s0).scale(1.3),0.5 )
.out()
