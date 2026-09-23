// made for https://hydra.ojack.xyz/dev

await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

speed=0.75
r1 = () => 0.1 * time /2.0;
r2 = () => 0.05 * time /2.0;
r3 = () => -0.025 * time /2.0;
r4 = () => -0.075 * time;
spiral(2.0, 5.0, 0.2).rotate(r1).modulateRotate( noise(0.75,0.015) )
  .mult( spiral(1.0, 3.0, 0.2).color(0,0.75,0.75).modulateRotate( noise(0.75,0.020) ) )
  .diff( spiral(2.0, 5.0, 0.15).rotate(r2).color(0.333,0,0).modulateRotate( noise(0.75,0.025) ) )
  .diff( spiral(2.0, 5.0, 0.15/2.0).rotate(r3).color(0,0,0.333).modulateRotate( noise(0.75,0.030) ) )
.rotate(r4)
.out()
