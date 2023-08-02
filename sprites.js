let ss_numbers = new Image();
ss_numbers.onload = function() {
};
ss_numbers.src = 'assets/ss_numbers.png';

let bg_speed = new Image();
bg_speed.onload = function() {
};
bg_speed.src = 'assets/bg_speed.png';


function drawNumber(ctx, number, startX, startY, spriteWidth, spriteHeight) {
    // Converte o número em uma string para que possamos iterar sobre cada dígito.
    const numberString = number.toString();
  
    ctx.drawImage(bg_speed, 0, 0, 180, 75, startX-20, startY-20, 180, 75);
    startX += 20 + spriteWidth * 3
     // Calcula a posição inicial X para o número, com base no número de dígitos e a largura do sprite.
    const initialX = startX - numberString.length * spriteWidth;

    for (let i = 1; i <= 3; i++) {
        // Encontra a posição do dígito no spritesheet.
        const digit = 10;
        const sourceX = digit * spriteWidth;
        const destX = startX - i * spriteWidth;
        ctx.drawImage(ss_numbers, sourceX, 0, spriteWidth, spriteHeight, destX, startY, spriteWidth, spriteHeight);
    }

    for (let i = 0; i < numberString.length; i++) {
      // Encontra a posição do dígito no spritesheet.
      const digit = numberString[i];
      const sourceX = digit * spriteWidth;

      // Calcula a posição X para o dígito no canvas.
      const destX = initialX + i * spriteWidth;
  
      // Desenha o dígito no canvas.
      ctx.drawImage(ss_numbers, sourceX, 0, spriteWidth, spriteHeight, destX, startY, spriteWidth, spriteHeight);
    }
  }