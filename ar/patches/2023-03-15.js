speed=0.7
noise(2,()=>Math.cos(time/44)*0.001 + 0.006)
.colorama(()=>Math.sin(time/99)*0.1)
.pixelate(50,50)
.modulateScale(
  voronoi(1.5,()=>Math.sin(time/55)*0.005+0.015,0)
  ,10.1)
.diff(
  noise(2,()=>Math.cos(time/44)*0.001 + 0.006)
.colorama(()=>Math.cos(time/34)*0.1)
  .mask( voronoi(1,()=>Math.sin(time/55)*0.005+0.015,0) )
)
.modulate( voronoi(1,()=>Math.sin(time/55)*0.005+0.015/2, ()=>Math.cos(time/77)*3+4 ) )
.out()
