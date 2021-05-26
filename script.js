function start() {

    function escondeDiv() {
        document.getElementById("genius").style.display = "grid";

        $("#inicio").hide();
    
    }

    let order = [];
    let clickOrder = []
    let score = 0;
    
    const blue = document.querySelector('.blue');
    const red = document.querySelector('.red');
    const green = document.querySelector('.green');
    const yellow = document.querySelector('.yellow');
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='nextLevel'></div>");
    
    let shuffleOrder = () => {
        let colorOrder = Math.floor(Math.random() * 4);
        order[order.length] = colorOrder;
        clickOrder = [];
        
        for(let i in order) {
            let elementColor = createColorElement(order[i]);
            lightColor(elementColor, Number(i) + 1);
        }
    }
    
let lightColor = (element, number) => {
    setTimeout(function() {
    number = number * 900;
    setTimeout(() => {
        element.classList.add('select');
    }, number - 800);
    setTimeout(() => {
        element.classList.remove('select');
    },number - 100);
}, 1500);
}

let checkOrder = () => {
    for(let i in clickOrder) {
        if(clickOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickOrder.length == order.length) {
        if(score){
            $("#nextLevel").html("<h1>Next Level");
        }
        $("#placar").html("<h2> Score: " + score + "</h2>");
        nextLevel();
        setTimeout(function() {
            $("#nextLevel").html("<h2>" + "</h2>")
        }, 1500);
    }
}


//funcao para o clique do usuario
let click = (color) => {
    clickOrder[clickOrder.length] = color;
    createColorElement(color).classList.add('select');

    setTimeout(() => {
        createColorElement(color).classList.remove('select');
        checkOrder();
    },250);
}
    
let createColorElement = (color) => {
    if(color == 0){
        return green;
    }else if(color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

let nextLevel = () => {
    score++
    shuffleOrder();
}

let gameOver = () => {

    $("#fundoGame").append("<div id='fim'></div>");
    if (score > 0){
        score = score - 1
    }
    $("#fim").html("<h1>Game Over\n<h2>Your score: " + score + "\n<h3>click here to start again");
    order = [];
    clickOrder = [];
    score = 0;
    document.getElementById("genius").style.display = "none";
    $("#placar").hide();
    $("#fim").click(function(){
        $("#fim").remove();
        setTimeout(function() {
            location.reload();
        }, 400);
    
    });
    
}


let playGame = () => {

    escondeDiv()
    score = 0;
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//iniciar do jogo
playGame();
}

