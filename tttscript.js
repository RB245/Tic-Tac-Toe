let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count =0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //console.log("box was clicked");
        
        if(turnO){
            box.innerText = "O";
            turnO =false;
            box.style.color = "blue";
        }
        else{
            box.innerText = "X";
            turnO = true;
            box.style.color = "#b0413e";
        }
        box.disabled=true;
        count++;
        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const resetGame = () => {
    turnO= true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let patterns of winPatterns){
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "" ){
            if(pos1 === pos2  && pos2 === pos3){
                showWinner(pos1);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);