var c = document.getElementById('canvas');
var ctx = c.getContext("2d");
var Box = {width:400 , height:400, down:200 ,left:0}
var mouseMovement = {posX:0,posY:0};
var stone = {startPosX:0,startPosY:0,posX:0,posY:0,drop:0,size:10};
var coin = {posX:0,posY:0,size:10}
var whenShootInAir = false;
// c.style.height = "100%";
// c.style.width = '100%';

randomCoinPosition()
setInterval(gameLoop, 10);

function gameLoop(){
    if (whenShootInAir == true){
        //console.log(stone.posY)

        if(stone.posX<1600 && mouseMovement.posY<800){
            shootStone();
        }else{
            console.log('rgeg');
            whenShootInAir = 0;
        }
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBox()
        makeStone(mouseMovement.posX,mouseMovement.posY+scrollFromTop())
    }
    drawCoin();
        
    if( ((stone.posX >= coin.posX           && stone.posX <= coin.posX+coin.size*2) 
        ||
        (stone.posX+stone.size*2 >= coin.posX && stone.posX+stone.size*2 <= coin.posX+coin.size*2)) 
        &&
        ((stone.posY >= coin.posY           && stone.posY <= coin.posY+coin.size*2) 
        ||
        (stone.posY+stone.size*2 >= coin.posY && stone.posY+stone.size*2 <= coin.posY+coin.size*2)))
        {
            randomCoinPosition()
            
    }
}

function drawBox(){
    ctx.rect(Box.left, Box.down, Box.width, Box.height);
    ctx.stroke()  
}

function makeStone (x,y){
    ctx.beginPath();
    ctx.arc(x, y, stone.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();  
}
function scrollFromTop(){
   return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
c.addEventListener("mousemove", function( e ) { 
    mouseMovement.posX =e.clientX
    mouseMovement.posY =e.clientY
      
})
c.addEventListener('click',function(e){
     //console.log(e.clientX > Box.left , e.clientX < Box.width , e.clientY+scrollFromTop() > Box.height , e.clientY+scrollFromTop() < Box.down + Box.height)
    if(e.clientX > Box.left && e.clientX < Box.width && e.clientY+scrollFromTop() > Box.down && e.clientY+scrollFromTop() < Box.down + Box.height ){
        stone.drop = 0
        stone.startPosX = (mouseMovement.posX - Box.width)*-1;
        stone.startPosY = ((mouseMovement.posY+scrollFromTop()) - Box.down)
        stone.posX = mouseMovement.posX
        stone.posY = mouseMovement.posY
        whenShootInAir = true;
    }
})


function shootStone(){

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBox();
            
            makeStone(stone.posX,stone.posY);
            stone.posX+=stone.startPosX/30;
            stone.posY-=(stone.startPosY/30)-stone.drop;
            stone.drop+=0.1
        }
           
function randomCoinPosition(){
    coin.posX = (Math.random()*600) + 700
    coin.posY = (Math.random()*500) 
}
function drawCoin(){
    ctx.beginPath();
    ctx.arc(coin.posX,coin.posY, coin.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
