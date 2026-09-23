await loadScript("https://hyper-hydra.glitch.me/hydra-blend.js")
await loadScript("https://hyper-hydra.glitch.me/hydra-wrap.js")
hydraWrap.setNoWrap()
s0.initImage("https://alexandrerangel.art.br/temp/linha-1.png")


src(s0).scale(0.8,1,0.24).scrollX( ()=>Math.cos(time/7)*0.45 ,0).kaleid(2)
.add( src(s0).scale(0.8,1,0.24).scrollX( ()=>Math.cos(time/7)*0.45 ,0) )
.add( src(s0).scale(0.8,1,-0.24).scrollX( ()=>Math.cos(time/7)*-0.45 ,0).scrollY(-0.2) )
.add( src(s0).scale(0.8,1,-0.24).scrollX( ()=>Math.cos(time/7)*-0.45 ,0).scrollY(+0.2) )
.add( src(s0).scale(0.8,1,0.24).scrollX( ()=>Math.cos(time/7)*0.75 ,0).scrollY(-0.4) )
.add( src(s0).scale(0.8,1,0.24).scrollX( ()=>Math.cos(time/7)*0.75 ,0).scrollY(+0.4) )

.out()
