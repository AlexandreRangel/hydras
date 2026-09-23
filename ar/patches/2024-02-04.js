await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

speed = 0.2
osc(0.75 * Math.PI, 0.15, 0.6)
	.modulateRotate(warp(0.7, 0.1, 1, 4)
		.diff(gradient(), -1), Math.PI*1.5)
.dither2()
  .out()
