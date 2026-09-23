// made for https://hydra.ojack.xyz/dev

await loadScript("https://hyper-hydra.glitch.me/hydra-outputs.js")
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

speed=0.72
oS.setLinear()
r1 = () => 0.1 * time / 2.2;
r2 = () => 0.05 * time / 2.2;
r3 = () => -0.03 * time / 2.2;
r4 = () => -0.09 * time;

n1 = () => Math.sin( time * 0.05) *0.3 + 1.2;

spiral(2.0, 5.0, 0.2).rotate(r1).modulateRotate( noise(0.75,0.015).ditherrndcolor() )
  .mult( spiral(1.0, 3.0, 0.2).color(0,0.75,0.5).modulateRotate( noise(0.75,0.020).ditherrndcolor() ) )
  .diff( spiral(2.0, 5.0, 0.15).rotate(r2).color(0.333,0,0.1).modulateRotate( noise(0.75,0.025).ditherrndcolor() ) )
  .diff( spiral(2.0, 5.0, 0.15/2.0).ditherrndcolor().rotate(r3).color(0.15,0,0.333).modulateRotate( noise(0.75,0.030) ) )
.rotate(r4)
.dither2()
.out(o0)

src(o0)
.add(
  src(o0).scale(0.996)
  .modulateRotate( noise( n1  ,0.007) )
  .modulateHue( noise( n1  ,0.007), 1 )
    ,0.5)
.out(o1)

render(o1)
