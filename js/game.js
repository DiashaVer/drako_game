var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var drako = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта


drako.src = "img/drako.png"; // Указание нужного изображения
bg.src = "img/bg.png"; // Аналогично
fg.src = "img/fg.png"; // Аналогично
pipeUp.src = "img/pipeUp.png"; // Аналогично
pipeBottom.src = "img/pipeBottom.png"; // Аналогично

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
//отступ блоков 
 var gap = 199;

// При нажатии  на какую-либо кнопку 
 document.addEventListener("keydown", moveUp);

 function moveUp(){
   yPos -= 25;
   fly.play();

}

// Создание блоков
 var pipe = [];

 pipe[0] = {
   x : cvs.width,
   y : 0
}

 var score = 0; 

// Позиция drako
 var xPos = 10;
 var yPos = 150;
 var grav = 1.5;

 function draw() {
   ctx.drawImage(bg, 0, 0);

  for(var i = 0; i < pipe.length; i++) {
   ctx.drawImage(pipeUp, pipe[i].x , pipe[i].y);
   ctx.drawImage(pipeBottom, pipe[i].x , pipe[i].y + 
   pipeUp.height + gap);

   pipe[i].x--;
    //создание следующих блоков
   if(pipe[i].x == 125) {
     pipe.push({
       x : cvs.width,
       y : Math.floor(Math.random() * pipeUp.height) -
       pipeUp.height
     }); 
    } 

   // Отслеживание прикосновений 
   if(xPos + drako.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
      || yPos + drako.height >= pipe[i].y + pipeUp.height +
    gap) || yPos + drako.height >= cvs.height - fg) {
       location.reload();// Перезагрузка страницы
     }
  if(pipe[i].x ==5){
   score++;
   score_audio.play();
     } 
    }   

   ctx.drawImage(fg, 0, cvs.height - fg.height);
   ctx.drawImage(drako, xPos, yPos);

   yPos += grav; 

   ctx.fillStyle = "#000";
   ctx.font = "24px Verdana";
   ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

   
 

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
  