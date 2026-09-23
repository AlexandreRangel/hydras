//s0.initCam()
//src(s0).saturate(2).contrast(1.3).layer(src(o0).mask(shape(4,2).scale(0.5,0.7).scrollX(0.25)).scrollX(0.001)).modulate(o0,0.001).out(o0)


speed=0.1
s0.initCam()
// Core layer: "Straight-edged circles" simulated with square-based rotations
shape(4, 0.6, 0.9)
  .scale(() => Math.abs(Math.sin(time * 0.3)) * 0.5 + 0.4) // Dynamic size change
  .repeat(4, 4) // Create a grid-like structure
  .modulate(osc(10, 0.2, 0.8).rotate(Math.PI / 4)) // Use square-based distortion
  .rotate(({time}) => Math.sin(time * 0.1) * Math.PI / 4) // Rotation skewing the idea of curves
  .color(1.0, 0.3, 0.6)
  .luma(0.2)
  .out(o0);

// Background layer: Square "curves" with sharp oscillating brightness
osc(15, 0.05, 0.8)
  .kaleid(4) // Reinforce symmetry of "4"
  .modulateRotate(shape(4, 0.4).scale(2).luma(0.5).invert(), 0.3)
  .colorama(0.8)
  .scale(() => Math.abs(Math.cos(time * 0.4)) * 0.3 + 1.2) // Dynamic breathing
  .blend(noise(3, 0.5).modulate(osc(10), 0.3), 0.5)
  .out(o1);

// Secondary modulation layer: Overlays to distort "geometry"
osc(8, 0.03, 0.9)
  .rotate(() => Math.abs(Math.sin(time * 0.5)) * Math.PI / 4) // Exaggerating square-based rotation
  .mult(shape(4, 0.7).rotate(Math.PI / 4))
  .modulate(noise(6, 0.3), 0.6)
  .add(shape(4, 0.4).scale(2).invert(), 0.4)
  .color(0.6, 0.9, 1.0)
  .scrollY(0.3, 0.1)
  .out(o2);

// Combine all layers with square-distorted interactions
src(o0)
  .layer(src(o1).blend(src(o2).scale(0.8).rotate(Math.PI / 4), 0.6))
  .modulate(osc(6, 0.05, 0.8).kaleid(4), 0.3)
  .add(shape(4, 0.8).scale(1.5).luma(0.5).invert(), 0.2)
  .blend(osc(5, 0.2, 0.6).kaleid(4).modulateRotate(noise(2), 0.4), 0.5)
.rotate(0.1,0.003)
.kaleid(4)
.scale(()=>Math.sin(time/7)*0.4 + 0.6)
.contrast(1.5)
.color( ()=>Math.sin(time/4.3), ()=>Math.cos(time/5.2) , ()=>Math.sin(time/6.1)  )
.modulateScale(
  src(s0).contrast(3.5)
  , ()=>Math.sin(time*4)* 0.075 + 0.175
)
	.diff( src(s0).contrast(0.75)
    //.color( ()=>Math.sin(time/3), ()=>Math.cos(time/4) , ()=>Math.sin(time/5)  )
         )
.out(o3);

// Render final composite
render(o3);
