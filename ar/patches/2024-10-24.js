await loadScript("https://hyper-hydra.glitch.me/hydra-fractals.js")
await loadScript("https://hyper-hydra.glitch.me/hydra-wrap.js")
//hydraWrap.setMirror()
hydraWrap.setNoWrap()


//s0.initScreen()
src(s0).scale(1).scale(-1,1,-1)

  .scrollX(0.25,0)
.scrollY(0.25,0)
.modulateScale(noise(2,.1),.9)
.mirrorX(0,1)
.mirrorY(0,1)
//.colorama(0.1)
//.inversion()
.out()
