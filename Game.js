let canvas = document.getElementById("GameBoard");
let game = canvas.getContext("2d");
let max = 140;
let Start = document.getElementById("Start");
let alea = [];
let speed ;
let c = 0;
let nu = 1;
let j =0;
let B = false;

let score = 0;
let intervalID;
let intervalID1;

let GameBoard = {
    height: 150,
    width: 300,
};
let square = {
    height : 10,
    width : 10,
    PosX : 50,
    PosY : 65,
    color : "red",
};

let RectsBottom = []
let RectsTop = [];
function drawBoundaries(){
    game.fillStyle = "Blue";
   game.fillRect(0,0,35,1000);
   game.fillStyle = "Blue";
   game.fillRect(265,0,35,1000);
}


function addElement() {
    RectsTop.push({height : 1000,
        width : 35,
        PosX : 0,
        PosY : 0,
        color: "green"});
    RectsBottom.push({height : 1000,
        width : 35,
        PosX : 0,
        PosY : 0,
        color: "green"})
    alea.push(0);
}
  

let st = "Flappy Square";

game.fillStyle = "yellow";
game.fillRect(0,0,300,150);

setTimeout(
    ()=>{
game.font = "30px MV Boli";
game.fillStyle = "red";
game.fillText(st, 52, 65);},500
);

setTimeout(()=>{
    game.font = "10px MV Boli";
    game.fillStyle = "black";
    game.fillText("Press Start to play", 100, 90);},1000);

Start.addEventListener("click",()=>{StartGame();
  window.addEventListener("keydown",Jump);});
   

intervalID1 = setInterval(addElement, 5);
function StartGame(){
    clearInterval(intervalID);
    clearInterval(intervalID1);
   score = 0;
   document.getElementById("LabelCont").textContent = 0;
    clearBoard();
    drawSquare(65);
for(let k = 0; k < RectsBottom.length;k+=1)
    {createRects(k);}
    
    intervalID = setInterval(stillAlive,2);



};
function Jump(event){
    
        if(event.key == "z" && square.PosY > 0){
       
      
            square.PosY -= 18;
             drawSquare(square.PosY);
;}}
function stillAlive() {
    // ...
clearBoard();
    for(let k = 0;k< 100;k+=1)   
    {moveRects(k);}  
    for (let i = 0; i < 100; i++) {
        if (NotLoose(i) == false) {
    
            EndGame();
            clearInterval(intervalID);
            clearInterval(intervalID1);
            square.PosY = 0;
            return;}}
        Down();


    
}

function clearBoard(){
    game.fillStyle = "white";
    game.fillRect(0,0,GameBoard.width,GameBoard.height);
    
};

function drawSquare(SquareY){
    game.fillStyle = "red";
    square.PosY = SquareY;
    game.fillRect(50,square.PosY,10,10);
}
function createRects(i){
    alea[i] = Math.floor(Math.random()*80 +50);
    drawRects(i,300*(i+1)-j*5,300*(i+1)-j*50,alea[i]);
}
function drawRects(i,RectBottomPosX,RectTopPosX,RectBottomPosY){
    
    RectsBottom[i].height = 1000;
    RectsBottom[i].width = 35;
    RectsBottom[i].PosX = RectBottomPosX;
    RectsBottom[i].PosY = RectBottomPosY;

    RectsTop[i].PosX = RectTopPosX;

    RectsTop[i].PosY = 0;
    RectsTop[i].width = 35;

    RectsTop[i].height = RectBottomPosY - 30;

    game.fillStyle = "green";
    game.fillRect(RectsBottom[i].PosX,RectsBottom[i].PosY,RectsBottom[i].width,RectsBottom[i].height);

    game.fillStyle = "green";
    game.fillRect(RectsTop[i].PosX,RectsTop[i].PosY,RectsTop[i].width,RectsTop[i].height);
   }
function moveRects(i){

RectsBottom[i].PosX -= 0.5;
    RectsTop[i].PosX -= 0.5;

drawRects(i,RectsBottom[i].PosX,RectsTop[i].PosX,RectsBottom[i].PosY);
}
function Down(){

    square.PosY+=0.3;

    drawSquare(square.PosY);
    
}



function EndGame(){
    
    game.fillStyle = "black";
    game.fillRect(0,0,300,150);
    
    setTimeout(()=>{
    game.font = "30px MV Boli";
    game.fillStyle = "white";
    game.fillText("You loose", 80, 65);},500);
    
    setTimeout(()=>{
        game.font = "10px MV Boli";
        game.fillStyle = "white";
        game.fillText("Press Start to replay", 100, 90);},1000); 

    }
function Collision(i){
        if (i < RectsTop.length  && i < alea.length && i < RectsBottom.length) 
       {if (
            (
                (square.PosY > RectsBottom[i].PosY)
                &&(square.PosX > RectsBottom[i].PosX)
                &&(square.PosX + square.width < RectsBottom[i].PosX + RectsBottom[i].width)
             ||
                (square.PosY < RectsTop[i].height)
                &&(square.PosX > RectsTop[i].PosX)
                &&(square.PosX + square.width < RectsTop[i].PosX + RectsTop[i].width)
            )
        ) {
            return true;
        }
    else{
    if((square.PosY < RectsBottom[i].PosY)
    &&(square.PosX + square.width == RectsBottom[i].PosX )
  &&
    (square.PosY > RectsTop[i].height)
    &&(square.PosX + square.width == RectsTop[i].PosX)
    ) 
    {
   score+=1;
   document.getElementById("LabelCont").textContent = score;
    }    
    return false;
        }
    }

    }
    
function NotLoose(i){
    if (i < RectsTop.length  && i < alea.length && i < RectsBottom.length) 
    {{if((square.PosY >= 140) || Collision(i) ){
        return false;
    }
 else { return true;}}}
 else{return false;}
}
   