speed=0.25

osc(22,-0.004).thresh(0.5, ()=>Math.sin(time*0.4)*0.25+0.75 ).out(o1)

osc( ()=>Math.sin(time*0.05)*10+30 ,-0.005).rotate(Math.PI/2).thresh().modulate( src(o1) ).out(o2)

osc(3,0.002).rotate(Math.PI/2).contrast(0.75).brightness(-0.25)
.modulate( src(o2).contrast(10) )
.out()
