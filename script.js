


  var deslocamento = 0.0;
  var car_sprite = new Image(200, 100);
  var sprite_1 = new Image(100, 50);//placa_left
  var sprite_2 = new Image(100, 50);//placa_right
  var press = {}; 
  var release = {}; 
  var speed; //metros por segundo
  var maxspeed =33.33; //metros por segundo
  var airForce = 0.0001;
  var print =0;
  var increment = 0;
  var distancia_em_metros;


 window.onload = function () {

    // console.log("start");
    gameStart();


    main();


    document.addEventListener("keydown", (e) => {
        const key = e.key
        console.log(e)
        if (press[key]) {
            press[key]()
        } else {

        }
    });

    document.addEventListener("keyup", (e) => {
        const key = e.key
        console.log(e)
        if (release[key]) {
            release[key]()
        } else {

        }
    });
 }
 


function gameStart() {
  
    gc = document.getElementById('gameCanvas');
    ctx = gc.getContext('2d');
    winW = 1280;
    winH = 768;
    // ctx.canvas.width  = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
    ctx.canvas.width  = winW;
    ctx.canvas.height = winH;


    horizon = 400;
    pista = getPista();

    trackPosition = 1;
    centimetro = 0;
    speed = 1
    frames = 0
    forca_g = 0;
  

    altura = 30;
    alturaD = 1;
    distancia = 0;
  
  
     player = {
        position: 0,
        acelerating: 0,
        breaking: 0,
        direction: 0
    }
    game ={
        paused:false
    }


     grama_colors = ["#00AA00", "#00FF00"]; // verde escuro / verde claro
     rw = ["#FF0000", "#FFFFFF"]; // vermelho / branco
     lg = ["#AAAAAA", "#777777"]; // cinza claro / cinza escuro
     bw = ["#FFFFFF", "#000000"]; // cinza claro / cinza escuro

    //  car_sprite.onload = renderPlayer; // Draw when image has loaded

     // Load an image of intrinsic size 300x227 in CSS pixels
     car_sprite.src = './assets/car1.png';
     sprite_1.src = './assets/placa_left.png';
     sprite_2.src = './assets/placa_right.png';


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

    var music = new Sound("assets/music1.mp3", 100, true,"music");
    // music.start();
    
  

}

    function main() {
        
        if(trackPosition >= pista.length){
            trackPosition = 0;
        }
        if(centimetro > 100){
            centimetro = 0;
        }

        //   speed += 0.01;

        distancia_em_metros = Math.floor(distancia / 33)

        render();
        update()
        requestAnimationFrame(main);
    }

 function renderPlayer(){

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    var curveAdd = 0;

    if(trackData.curve > 0){
        if(deslocamento > 100){
            curveAdd = 200;
        }
        
    }
    if(trackData.curve < 0){
        if(deslocamento < 100){
            curveAdd = -200;
        }
        
    }

    if(player.direction > 0){
        curveAdd += 200;
    }
    if(player.direction < 0){
        curveAdd -= 200;
    }

    ctx.drawImage(car_sprite, 400 + curveAdd ,0,200,100, (winW/2)  - 150, winH - 280, 300, 150);
    

 }

 

 function renderHud(){

    var kmh = Math.floor(speed * 3.6);
    var mh = Math.floor(speed * 2.23694);

    ctx.font = "30px Arial";
    ctx.fillText("Speed:"+kmh +" km/h", 50, 50);

    ctx.fillText("debug a:"+  speed  +" ", 50, 150);
    ctx.fillText("debug b:"+  distancia_em_metros  +" metros ", 50, 250);

 

 }

 function renderTrack(){



    deslocamento =Math.round(deslocamento * 1000) / 1000

    lastObjPos = distancia;

    let trackWidth = 400;
    
   for (let i = 0; i <= horizon; i++) {
       //  let n = i * Math.log((horizon - i )/ 100)
       //  let n = (i * Math.log((horizon - i ) / horizon))*-1 ;
        let n = (100* Math.log(horizon - i))*-1  ;
       let size = 200;
       let colorMatch = 100;
       
       y = winH  - i;
       
       ctx.fillStyle = grama_colors[Math.floor((n + distancia) % size / colorMatch)];
       ctx.fillRect(0, y, winW, 1);
       
       var trackCenter = winW/2;

       ctx.fillStyle = rw[Math.floor((n + distancia) % (size/2) / (colorMatch/2) )];
       st_left = trackCenter - (trackWidth+60) - (horizon - i*2.04)  ;
       st_rigth = winW - st_left * 2 ;
      ctx.fillRect( st_left + n * deslocamento +player.position ,y, st_rigth  , 1);

       ctx.fillStyle = lg[Math.floor((n + distancia) % (size/2) / (colorMatch/2) )];
        st_left = trackCenter - (trackWidth) - (horizon - i*1.9)  ;
        st_rigth = winW - st_left * 2 ;
       ctx.fillRect( st_left + n* deslocamento +player.position ,y, st_rigth  , 1);


    }

}

 function renderSigns(){



     deslocamento =Math.round(deslocamento * 1000) / 1000

     lastObjPos = distancia;

     let trackWidth = 400;
     
    for (let i = 0; i <= horizon; i++) {
        //  let n = i * Math.log((horizon - i )/ 100)
        //  let n = (i * Math.log((horizon - i ) / horizon))*-1 ;
         let n = (100* Math.log(horizon - i))*-1  ;
        let size = 200;
        let colorMatch = 100;
        
        y = winH  - i;
        
        ctx.fillStyle = grama_colors[Math.floor((n + distancia) % size / colorMatch)];
        ctx.fillRect(0, y, winW, 1);
        
        var trackCenter = winW/2;
        // trackCenter += player.position;
       

        ctx.fillStyle = rw[Math.floor((n + distancia) % (size/2) / (colorMatch/2) )];
        st_left = trackCenter - (trackWidth+60) - (horizon - i*2.04)  ;
        st_rigth = winW - st_left * 2 ;
       ctx.fillRect( st_left + n * deslocamento +player.position ,y, st_rigth  , 1);

        ctx.fillStyle = lg[Math.floor((n + distancia) % (size/2) / (colorMatch/2) )];
         st_left = trackCenter - (trackWidth) - (horizon - i*1.9)  ;
         st_rigth = winW - st_left * 2 ;
        ctx.fillRect( st_left + n* deslocamento +player.position ,y, st_rigth  , 1);

        
       
       
        
     }

    var x = 1;
    let pos =  2300;
    let xp =  5300 ;

    for (let i = 0; i <= horizon; i++) {
        //  let n = i * Math.log((horizon - i )/ 100)
        //  let n = (i * Math.log((horizon - i ) / horizon))*-1 ;
         let n = (100* Math.log(horizon - i))*-1  ;
        
        y = winH  - i;
        
      
        st_left = trackCenter - (trackWidth) - (horizon - i*1.9)  ;
        st_rigth = winW - st_left * 2 ;
         
        if (Math.floor(n + distancia) % 100 in [0] ){
      
               ctx.drawImage( sprite_2, st_left + n* deslocamento +player.position     ,y - (horizon -i), (horizon -i) ,(horizon - i));
        }
    }
       
 
//     for (let i = horizon; i >= 0; i--) {
//         //  let n = i * Math.log((horizon - i )/ 100)
//         let n = (100* Math.log(horizon - i))*-1 ;
        
//         let nx = (x * Math.log((x ) / horizon)) *-1 ;
        
//         y = winH  - i;
        
//         var trackCenter = winW/2;

//         let trackWidth = 400;
//         st_left = trackCenter - (trackWidth+60) - (horizon - i*2.04)  ;
//         st_rigth = winW - st_left * 2 ;
//         hi = horizon - i;
//         if (Math.floor(n + distancia) % 100 == 0 ){
//             print = i;
//              ctx.drawImage( sprite_2,  st_left + n * deslocamento +player.position     ,y - (horizon -i), (horizon -i) ,(horizon - i));
//         }



//         ctx.fillStyle = bw[0];
//         ctx.fillRect(i,n,  1 , 1);


// // if (pos >= 400 && pos <= 402){
//         //     ctx.drawImage( sprite_2,  st_left + n * deslocamento +player.position     ,y - (horizon -i), (horizon -i) ,(horizon - i));
//         // }
//         // if (pos >= 1400 && pos <= 1402){
//         //     ctx.drawImage( sprite_2,  st_left + n * deslocamento +player.position     ,y - (horizon -i), (horizon -i) ,(horizon - i));
//         // }
//                 // if(deslocamento > 0.1){
//                 //     ctx.drawImage( sprite_2,  st_left + n * deslocamento +player.position     ,y - (horizon -i), (horizon -i) ,(horizon - i));
//                 // }
//                 // if(deslocamento < -0.1){
//                 //     ctx.drawImage( sprite_1,  st_left + n * deslocamento + player.position  + st_rigth    ,y - (horizon -i), (horizon -i) ,(horizon - i));
//                 // }
           
//                 x++;
        
//     }




 }
 function getTrackDataForPosition(){

    var pista_trecho = new Array();
    for (let i = 0; i < 100; i++) {
        trackPosition =  (distancia_em_metros + i) % pista.length ; 
        trackData = pista[trackPosition ];
        pista_trecho.push(trackData);
    }

  
    return pista_trecho
 }

 function renderObjects(){

    objs = getTrackDataForPosition();
    for (let i = 0; i < horizon; i++) {
        

    }
 }

 function render() {
     if (game.paused){
         return;
     }
    ctx.fillStyle = "#3333FF";
    ctx.fillRect(0, 0, winW, winH);

    trackPosition =  distancia_em_metros % pista.length ; 
    console.log("track-position:"+trackPosition);
    trackData = pista[trackPosition ];

    if(centimetro == 0){
        // console.log(trackData.numero);
        // console.log("FRAMES: "+frames);
        // console.log("DESLOCAMENTO: "+deslocamento);
        // console.log("CURVE: "+trackData.curve);
        frames = 0;
        trackPosition++;
        
    }
    

    // player.position += 20;
    // if (player.position > 400) {
    //     player.position = 400
    // } 


    calculatePosition();
    calculateCurve();
    calculateSpeed();

    renderTrack();

    renderObjects();


    renderPlayer();
    renderHud();
   
    // console.log("n:"+ n);

    // Avança pela pista (nesse exemplo, na velocidade do render; na prática, usar o tempo)
    distancia += speed/2.5;

    centimetro += speed/2.5;

    frames++;

        // Limpa o cenário com a cor do céu
       


     

    }

    function calculateCurve(){

        
        // curve = trackData.curve/90;
        // forca_g = curve * speed;

        // if (curve < 0){
            
        //     deslocamento -= 0.005;
        //     if (deslocamento < curve ){
        //         deslocamento += 0.005;
        //     }
        //       speed += curve/30;
            
    
        // } 

        // if (curve > 0){
            
        //     deslocamento += 0.005;
        //     if (deslocamento > curve ){
        //         deslocamento -= 0.005;
        //     }
        //       speed -=  curve/30;
    
        // } 
       
        // if (curve == 0)
        // {
        //     if (deslocamento < 0){
        //         deslocamento += 0.005;
        //     }
        //     else
        //     if (deslocamento > 0){
        //         deslocamento += -0.005;
        //     }
        //     else{

        //     }
        // }
    
       
        // if (deslocamento < -1.0 ){
        //     deslocamento = -1.0;
        // }
        // else
        // if (deslocamento > 1.0){
        //     deslocamento = 1.0;
        // }
    }

    function calculatePosition(){

        ls = Math.log(maxspeed  - speed);

        if (player.direction > 0){
            player.position -= (maxspeed * 1.4  - speed) /4;
        }
        if (player.direction < 0){
            player.position +=( maxspeed * 1.4 - speed)  /4;
        }

        

        player.position +=  forca_g/2;

        if(player.position > 800 ){
            player.position = 800;
        }
        if(player.position < -800 ){
            player.position = -800;
        }
    
    }

    function calculateSpeed(){
        increment = 0;
        if (player.acelerating > 0){
           if(speed < maxspeed){
               ls = Math.log(1+speed)/10;
                increment = speed + ls ;
                speed = 0.0001 + increment;
           }
        }
        if (player.breaking > 0){
            if(speed > 0){
                speed = speed * player.breaking;
            }
         }
        
         speed =  speed * 0.995;
        if (speed < 0) {
            speed = 0;
        }
    
        if(speed > maxspeed){
            speed = maxspeed;
        }
    }


    function update(plTime) {
        // ctx.fillStyle = "#000";
        // ctx.fillRect(player.position, 225, 50, 50)
    }

   

    // document.addEventListener("keydown", (e) => {
    //     const keyPressed = e.key
    //     console.log(e)
    //     if (mov[keyPressed]) {
    //         mov[keyPressed]()
    //     } else {

    //     }
    // });

    // const mov = {
    //     "a": () => { player.position = 150 },
    //     "s": () => { player.position = 275 },
    //     "d": () => { player.position = 400 },
    //     "w": () => { turbo = !turbo },
    //     "ArrowRight": () => {
    //         if (player.position === 150) {
    //             player.position = 275
    //         } else if (player.position === 275) {
    //             player.position = 400
    //         }

    //     },
    //     "ArrowLeft": () => {
    //         if (player.position === 275) {
    //             player.position = 150
    //         } else if (player.position === 400) {
    //             player.position = 275
    //         }
    //     },
    //     "ArrowUp": () => {
    //         turbo = !turbo
    //     }

    // }

   





