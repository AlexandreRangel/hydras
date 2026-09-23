noise(1,0.04)
.pixelate(9,16).colorama(-0.1)

.diff(
  noise(0.5,0.04/2)
  .pixelate(9*5,16*5).colorama(-0.05)
)

.diff(
  noise(0.25,0.04/8)
  .pixelate(9*10,16*10).colorama(-2)
)

.out()
