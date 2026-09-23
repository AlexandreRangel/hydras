speed=0.333

noise(2,0.01)
.pixelate(5,5)
.scrollX(-0.01,-0.01)
.contrast(2)

.diff(
  noise(2,0.01)
  .pixelate(10,10)
  .scrollX(0.01,0.01)
  .color(1.25,0,0)
  .contrast(2)
)

.add(
  noise(2,0.01)
  .pixelate(20,20)
  .scrollX(-0.007,-0.007)
  .color(0,0,1)
  .contrast(2)
)

.modulate(noise(0.15,-0.007))
.pixelate(50,50)
.colorama(()=>Math.sin(time/333)-1)
.scale(3)
.diff(src(o0).scale(.5))
.sub(src(o0).scale(2).scrollX(()=>random()*0.01,-0.01))
.out()
