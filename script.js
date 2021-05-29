

 window.onload = function () {

    console.log("start");
    gameStart();


    main();
 }


function gameStart() {
  
    gc = document.getElementById('gameCanvas');
    ctx = gc.getContext('2d');
    winW = 800;
    winH = 600;
    altura = 30;
    alturaD = 1;
     delta = 0;
  
  
     player = {
        position: 275
    }


     grama_colors = ["#00AA00", "#00FF00"]; // verde escuro / verde claro
     rw = ["#FF0000", "#FFFFFF"]; // vermelho / branco
     lg = ["#AAAAAA", "#777777"]; // cinza claro / cinza escuro
}

    function main() {
        // console.log("incio");
        render();
        update()
        requestAnimationFrame(main);
    }


 function render() {
        // Limpa o cenário com a cor do céu
        ctx.fillStyle = "#3333FF";
        ctx.fillRect(0, 0, winW, winH);

        // Para cada linha de pixels na tela
        let horizon = (winH/2);
        let n = 0;
        elevacaoProb = Math.floor(Math.random() * 250);
        if(elevacaoProb > 0 && elevacaoProb < 3 ) 
        {
            //baixo
            alturaD = 0
        }
        if(elevacaoProb > 3 && elevacaoProb < 6 ) 
        {
            //baixo
            alturaD = 1
        }
        if(elevacaoProb > 6 && elevacaoProb < 9 ) 
        {
            //baixo
            alturaD = 2
        }

        if(alturaD == 0){
            if(altura > 100){
                altura --;
            }
            

        }

        if(alturaD == 1){
            if(altura > 300){
                altura --;
            }
            if(altura < 300){
                altura ++;
            }
    
            
        }

        if(alturaD == 2){
            if(altura < 500){
                altura ++;
            }
            
        }
       //  console.log(altura);

        for (let i = 0; i < horizon; i++) {
            //  let n = i * Math.log((horizon - i )/ 100)
             let n = (i * Math.log((horizon - i ) / horizon))*-1
            // console.log(n);
            let size = 120;
            let colorMatch = 60;
            
            y = winH  - i;
            
            ctx.fillStyle = grama_colors[Math.floor((n + delta) % size / colorMatch)];
            ctx.fillRect(0, y, winW, 1);
            
            let trackpos = winW/2;
            let trackWidth = 100;
            //deslocamento vai de -1 até 1
            let deslocamento =   -0.1;

            // trackpos = trackpos + (n/50 );

            ctx.fillStyle = rw[Math.floor((n + delta) % (size/2) / (colorMatch/2) )];
            let st_left = trackpos - (trackWidth/2) - (horizon - i);
                
            let st_rigth = winW - st_left * 2 ;
            ctx.fillRect( st_left + n * deslocamento ,y, st_rigth, 1);

            ctx.fillStyle = lg[Math.floor((n + delta) % (size/2) / (colorMatch/2) )];
             st_left = trackpos - (trackWidth/2) - (horizon - i)  +20;
             st_rigth = winW - st_left * 2 ;
            ctx.fillRect( st_left + n* deslocamento  ,y, st_rigth  , 1);

            // ctx.fillStyle = lg[Math.floor((n + delta) % size / colorMatch)];
            // ctx.fillRect(30 + i ,y, winW - 2 * (30 + i), 1);
        }
        // console.log("n:"+ n);

        // Avança pela pista (nesse exemplo, na velocidade do render; na prática, usar o tempo)
        delta += 8;


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

   





