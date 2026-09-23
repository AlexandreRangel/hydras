speed=0.7
const date = new Date();
let ms = ()=>date.getMilliseconds();
let ms2 = ()=>date.getMilliseconds()*2;
let ms3 = ()=>date.getMilliseconds()*3;
let ms4 = ()=>date.getMilliseconds()+9999;
let a = Math.random()*0.4+0.6
let b = Math.random()*0.4+0.6
let c = Math.random()*0.4-1.1
let d = Math.random()*0.4-1.1

solid(Math.random(),Math.random(),Math.random())
.mult(noise(1.505,0.05))
.diff(noise(2.71,0.022))
.rotate(()=>Math.sin(time/600+ms())*Math.PI*2)
.modulateScale(osc(()=>Math.sin(time/160+ms())+2,0.01).contrast(1.5).kaleid(50)
  ,2)
.modulateRotate(osc(()=>Math.cos(time/298-ms())+2.5,-0.005).contrast(1.8).kaleid(50)
  ,Math.PI*-1).saturate(2)
.add(osc(2,0.05,()=>Math.cos(time/170+ms3())*0.5+1.5).contrast(2),0.1)
  .mask(shape(100,0.7,0.13))
  .scale(1,innerHeight/innerWidth,1)
.invert([0,-1,0,-1,a,-.75,0,c,.5,1,0.75,0,-0.5,-1].smooth(0.57).fast(0.154+(Math.random()*0.1)))
.diff(shape(6,0.75,0.0).scrollX(0.075,-0.075))
.modulateScrollX(voronoi(0.9,0.02),.2)
.out(o0)

solid(Math.random(),Math.random(),Math.random())
.mult(noise(1.5,0.05))
.diff(noise(2.6,0.023))
.rotate(()=>Math.sin(time/600+ms2())*Math.PI*2)
.modulateScale(osc(()=>Math.sin(time/155+ms2())+2,0.009).contrast(1.5).kaleid(50)
  ,2)
.modulateRotate(osc(()=>Math.cos(time/333+ms3())+2.5,0.005).contrast(1.8).kaleid(50)
  ,Math.PI*-1).saturate(2)
.add(osc(2,0.05,()=>Math.cos(time/222+ms())*0.5+1.5).contrast(2),0.1)
  .mask(shape(100,0.7,0.13))
  .scale(1,innerHeight/innerWidth,1)
.diff(src(o2).scale(1.015).invert(),
       ()=>Math.sin(time*0.6+ms())*0.26+0.58)
.invert([b,c,.75,a,1,0.75,0,-0.75,d,-1,-.75].smooth(0.57).fast(0.15+(Math.random()*0.1)))
.diff(shape(6,0.75,0.0).scrollX(0.05,0.05))
.modulateScrollX(voronoi(0.8,0.02),.2)
.out(o1)

solid(Math.random(),Math.random(),Math.random())
.mult(noise(1.51,0.05))
.diff(noise(2.42,0.021))
.rotate(()=>Math.sin(time/600+ms2())*Math.PI*2)
.modulateScale(osc(()=>Math.sin(time/157+ms3())+2,-0.008).contrast(1.5).kaleid(50)
  ,2)
.modulateRotate(osc(()=>Math.cos(time/310-ms2())+2.5,0.005).contrast(1.8).kaleid(50)
  ,Math.PI*-1).saturate(2)
.add(osc(2,0.05,()=>Math.cos(time/220-ms2())*0.5+1.5).contrast(2),0.1)
  .mask(shape(100,0.7,0.13))
  .scale(1,innerHeight/innerWidth,1)
.invert([c,b,-0.75,-1,b,a,-.75,0,.5,1,0.75,c,0,a,1,-1,a].smooth(0.57).fast(0.14+(Math.random()*0.1)))
.diff(shape(6,0.65,0.0).scrollX(0.05,0.05))
.modulateScrollX(voronoi(0.7,0.02),.15)

.out(o2)

solid(Math.random(),Math.random(),Math.random())
.mult(noise(1.53,0.05))
.diff(noise(2.56,0.02))
.rotate(()=>Math.sin(time/600+ms2())*Math.PI*2)
.modulateScale(osc(()=>Math.sin(time/150+ms3())+2,0.01).contrast(1.5).kaleid(50)
  ,2)
.modulateRotate(osc(()=>Math.cos(time/300-ms())+2.5,0.005).contrast(1.8).kaleid(50)
  ,Math.PI*-1).saturate(2)
.add(osc(2,0.05,()=>Math.cos(time/200-ms())*0.5+1.5).contrast(2),0.1)
  .mask(shape(100,0.7,0.13))
  .scale(1,innerHeight/innerWidth,1)
.diff(src(o0).scale(1.015)
      .invert([d,a,-1,-.75,0,.75,1,0.75,0,-0.75].smooth(0.57).fast(0.135+(Math.random()*0.1))),
       ()=>Math.sin(time*0.6+ms())*0.26+0.58)
.diff(shape(6,0.5,0.0).scrollX(0.025,0.025))
.modulateScrollX(voronoi(0.6,0.02),.2)

.blend(src(o0).scale(1.015),
       ()=>Math.sin(time*0.6+ms())*0.26+0.58)

.out(o3)


render()
