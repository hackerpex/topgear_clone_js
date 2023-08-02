// http://www.extentofthejam.com/pseudo/


window.onload = function () {
    setup()
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    update()
   
    document.addEventListener("keydown", (e) => {
        const key = e.key
        
        if (press[key]) {
            press[key]()
        } else {

        }
    });

    document.addEventListener("keyup", (e) => {
        const key = e.key
        
        if (release[key]) {
            release[key]()
        } else {

        }
    });

}

function setup(){
  
    gc = document.getElementById('gameCanvas');
    ctx = gc.getContext('2d');
    W = 800;
    H = 600;
    ctx.canvas.width  = W;
    ctx.canvas.height = H;

    drawDistance = 20000;
    drawlines = true;
    linesColor = "#000000"

    horizon = H/2;

      
    player = {
        position: 0,
        acelerating: 0,
        breaking: 0,
        direction: 0
    }

    game ={
        paused:false
    }

    press = {
        "ArrowRight": () => {            
             player.direction = 1;

        },
        "ArrowLeft": () => {            
              player.direction = -1;
        },
        "ArrowUp": () => {
            player.acelerating = 1.0;
           
        },
        "ArrowDown": () => {
             player.breaking = 0.95;
        },
        "Enter": () => {
            game.paused = !game.paused;
        }
        ,
        " ": () => {
             player.breaking = 0.99;
        }
    }

    release = {
        "ArrowRight": () => {
            if(player.direction > 0){
                player.direction = 0;
            }
           

        },
        "ArrowLeft": () => {
            if(player.direction < 0){
                player.direction = 0;
            }

             
        },
        "ArrowUp": () => {
            if(player.acelerating > 0){
                player.acelerating = 0;
            }
        },
        "ArrowDown": () => {
            if(player.breaking > 0){
                player.breaking = 0;
            }
        },
        " ": () => {
            if(player.breaking > 0){
                player.breaking = 0;
            }
        }
       
    }

    grama_colors = ["#00AA00", "#00FF00"]; // verde escuro / verde claro
    rw = ["#FF0000", "#FFFFFF"]; // vermelho / branco
    lg = ["#AAAAAA", "#777777"]; // cinza claro / cinza escuro
    bw = ["#FFFFFF", "#000000"]; // cinza claro / cinza escuro

    deslocamento  = 0
    distancia = 0;

    speed = 15;
    maxspeed = 50;

    x_offset = 0;
    y_offset = 0;


    alturaNoise = CombineNoise(GenerateNoise(8, 8   , 12, 1, 99999));
    noisePosition = 0;
    camera=1;
    fov_angle=60; //field of view 60 graus
    scaling =  Math.tan(fov_angle)
    
    y_world = Math.sin(0/2);
    x_world = 0/2;
    z_world = camera + 0 ;
    

    X = (x_world/z_world) + (W/2)
    Y = (y_world/z_world) + (H/2)

    // console.log(scaling)

   
}

function processPosition(){

    if(player.direction > 0){
        x_offset -=speed;
    }
    if(player.direction < 0){
        x_offset +=speed;
    }
    if(player.acelerating > 0){        
        if(speed < maxspeed ){
            speed += 0.1;
        }
    }
    else{
        if(speed > 0 ){
            speed -= 0.1
        }
        else{
            speed = 0;
        }
        
    }    
}

function drawHud(){

    drawNumber(ctx,Math.floor(speed*3),25,30,30,50)
    
}

function cordinatesForX(x,z){
    worldDistance = scaling + z/1000 ;
    // newX = ((x*scaling)/worldDistance )+ X
    newX =(scaling * x / worldDistance ) + X
    
    // console.log(newX)
    return newX;
}

function cordinatesForY(y,z){
    worldDistance = scaling + z/1000 ;
    newY = ((y*scaling)/worldDistance) + Y
    return newY;
}

function update(){
   
    if(game.paused == false)
    {
        ctx.clearRect(0, 0, W, H);
        processPosition()
        renderTrack()
        drawHud()

        
    }
   
         requestAnimationFrame(update);
}
function renderTrack(){
    
    trackWidth = 2000
    
    amplitude = 3
    factor = 10000

    step = 500;
    offset = distancia % step * 2 ;

   

    for (let ponto = 0; ponto < drawDistance; ponto+= step) {
        p = ponto;
        
        p2 = ponto + step ;
        intervalIndex = ponto / step;
  
        color = grama_colors[Math.floor( intervalIndex  % 2)];
        
        altitude = alturaNoise.pos[Math.floor(distancia+ponto/step/factor)] * amplitude   
        altitude2 =  alturaNoise.pos[Math.floor(distancia+ponto/step*2/factor)] * amplitude    
        // aqui a dificuldade é alinhar o array de altura com a posicao na distancia
        altitude = 0   
        altitude2 = 0
    
        
        
        DrawRoadLine(-trackWidth/2+x_offset ,350+altitude,trackWidth/2+x_offset,350+altitude2,p-offset,p2-offset,color)
        
        
        

        // DrawPoint(1000,350,index*500);
        // DrawPoint(-1000,350,index*500);
        
    }

    distancia +=speed;
    
}

function DrawLine(posy,L,h,distancia){
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
//    ctx.moveTo(0, h);
//   for(var i = 0; i < L.pos.length; i++){
//      // console.log(posy + L.pos[i])
//     if (i== 0){
//         ctx.moveTo(0,  posy + L.pos[i]);
//     }
//     ctx.lineTo(i, posy + L.pos[i]);
//   }
  

  const circle = new Path2D();
  circle.arc(distancia/100, posy + L.pos[Math.floor(distancia/100)] , 5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill(circle);
}



function DrawPoint(x,y,z){
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
  const circle = new Path2D();
  circle.arc(cordinatesForX(x,z), cordinatesForY(y,z) , 5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill(circle);
}

function DrawRoadLine(x,y,x2,y2,z,z2,color){

    
    if(z<0) z = 0;
    if(z2<0) z2 = 0;
  
  
  ax = cordinatesForX(x,z);
  ay = cordinatesForY(y,z);
  bx = cordinatesForX(x2,z);
  by = cordinatesForY(y,z);
  cx = cordinatesForX(x2,z2);
  cy = cordinatesForY(y2,z2);
  dx = cordinatesForX(x,z2);
  dy = cordinatesForY(y2,z2);
  
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx,by);
    ctx.lineTo(cx, cy);
    ctx.lineTo(dx, dy);
    ctx.closePath();
    ctx.fill();
    if(drawlines){
        ctx.strokeStyle = linesColor    ;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
   

  
}