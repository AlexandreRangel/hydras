//s0.initScreen()

osc(20,-0.09,2).rotate(Math.PI/-2)
  //.colorama( ()=>Math.sin(time/2)*0.2 )
.modulate(src(s0)
               .saturate(0)
          .contrast(0.9)
               .scale(1),0.5 )
  .out(o0)
