// made for https://hydra.ojack.xyz/dev

await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")


osc(0.75 * Math.PI, 0.11, 0.6)
.modulateRotate(warp(0.7, 0.012, 1, 4)
.diff(gradient(), -1), Math.PI*1.5)
.rotate(()=>time*0.03)
.modulateScale(warp(0.2, 0.012, 1.5, 2),0.9)
.out()
