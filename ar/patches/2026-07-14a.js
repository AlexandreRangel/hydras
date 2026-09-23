speed=0.25
a.setSmooth(0.89)
osc(4, 0.1, ()=>a.fft[0]*2.4 ).color(1.04,0, -1.1)
.rotate(()=>a.fft[2], ()=>a.fft[2]/5).pixelate(2, 20)
.modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time)).out(o0)
