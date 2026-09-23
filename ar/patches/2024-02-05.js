await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-softpattern.js")

phasenoise( ()=>Math.sin(time/12)*0.5+0.5, 0.1, 1, 0.05, 0.025)
.dither2()
  .out()
