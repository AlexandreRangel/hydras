// quad

shape(100,.9,.002)

.diff( shape(100,()=>Math.sin(time/9)+0.9,.002) ).color(1,1,0)
.diff( shape(100,()=>Math.cos(time/11)+0.7,.002) )

.diff( shape(100,()=>Math.sin(time/13)+0.5,.002) ).color(0,1,0)
.diff( shape(100,()=>Math.cos(time/15)+0.4,.002) )

.diff( shape(100,()=>Math.sin(time/17)+0.3,.002) ).color(0,1,1)
.diff( shape(100,()=>Math.cos(time/19)+0.2,.002))

.diff( shape([1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9].fast(0.8),0.5,0)
      .rotate([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1].fast(0.4))
      .rotate(1)
      .scrollX(0.010,-0.012) )
.out()
