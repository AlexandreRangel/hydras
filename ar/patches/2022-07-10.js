shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/1)+1.5).scrollX(Math.random())
.color( Math.random(), Math.random(), Math.random() )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/2)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/3)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/4)+1.5).scrollX(Math.random()) )
.repeat(3)

  .colorama( Math.random() * -100 )

.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/5)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/6)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/7)+1.5).scrollX(Math.random()) )
.repeat(4)

.colorama( Math.random() * -100 )

.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/8)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/9)+1.5).scrollX(Math.random()) )
.diff( shape(4,0.1,0).scrollY(0.1,0.1).scale( ()=>Math.sin(time/10)+1.5).scrollX(Math.random()) )
.repeat( Math.random()*10 )

.modulateScale( shape([2,4] ) , Math.random()* 10)
.modulateRotate( shape(2) , Math.PI/2)

.out()
