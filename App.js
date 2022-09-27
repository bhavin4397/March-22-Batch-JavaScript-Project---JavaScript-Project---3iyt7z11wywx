var numSelected = null; //to select the id and apply the digits on the boards
var titleSelected = null;
let tile // this is varibale which we assign to gerate a board row and cell number
var errors = 0; // this variable is to count the errors 
let fillBox=0 //to count the correct moves 
let digits=document.getElementById('digits') //to grab digits div for styling the  toggling the visibilty
let boardId=document.getElementById('board')
let startBtn=document.getElementById('start')
let pauseBtn=document.getElementById('pause')
let restartBtn=document.getElementById('restart')

var board = [
    "38--9-6-5",
    "--156--79",
    "---3--4--",
    "---------",
    "1-3-8--9-",
    "-962--187",
    "9-4-7---2",
    "67--32--1",
    "-------63"
] // dispaly on board

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]; // solution which we will compare to the board


// function to load on the page 
window.onload=function(){
    setGame()
}

function setGame() {
    //this for loop will create and append the digits on the page 
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement('div')
        number.id = i;
        number.innerText = i
        number.addEventListener('click', selectNumber)
        number.classList.add("number")
        document.getElementById('digits').appendChild(number)
    }
    // this for loop will create and append the numbers on the board fixed number
    boardValue()
    
    
}

function boardValue(){
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            
            tile = document.createElement('div')
            tile.id = r.toString() + "-" + c.toString()
            if (board[r][c] != "-") {
                fillBox++
                tile.innerText = board[r][c]
                tile.classList.add('tile-start')
                
            }
            if (r == 2 || r == 5) {
                tile.classList.add('horizontal-line')
            }
            if (c == 2 || c == 5) {
                tile.classList.add('vertical-line')
            }
            tile.addEventListener('click', selectTile)
            
            tile.classList.add('tile');
            document.getElementById('board').appendChild(tile)

        }
    }
    
}



// this all variable are used for timer 
let sec = 0
let timer = false
let minu = 0
let hr = 0
let count = 0
let hour = document.getElementById('hr')
let mintues = document.getElementById('min')
let second = document.getElementById('sec')

// this function will trigger after clicking on start button it will executed the digits to show and timer will start 
function startGame() {
    digits.style.display = 'flex'

    selectTile()
    timer = true
    stopwatch()
    
    pauseBtn.style.display='inline-block'
    restartBtn.style.display='inline-block'
}

function pauseGame() {
    let pauseBtn=document.getElementById('pause')
    
    if(pauseBtn.innerText=='Pause'){
        timer = false
        pauseBtn.innerText='Continue'
        digits.style.display = 'none'
        startBtn.style.display='none'
        restartBtn.style.display='none'
    }else{
        timer = true
        stopwatch()
        pauseBtn.innerText='Pause'
        digits.style.display = 'flex'
        startBtn.style.display='inline-block'
        restartBtn.style.display='inline-block'
    }

}

let player=0


// this function will apply the css styling to hightlight whihc number we select to apply on board
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove('number-selected')
    }
    numSelected = this;
    numSelected.classList.add('number-selected')
}

// this will check the errors and the solution of the game 
// main heart of the game 
function selectTile() {

    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split('-')
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            fillBox++
            
        } else {
            errors += 1
            document.getElementById('errors').innerText = errors;
        }
        
    }
    

    // main logic of game finished and pop up of congraulations with time take to compelete a game 
    if(fillBox === 81){
        alert(`congraulations you completed in ${hour.innerText} : ${mintues.innerText} : ${second.innerText} time`)
        stop()
        resetGame()

    }
    
    

}

function resetGame(){
    
    timer=false
    sec = 0
    minu = 0
    hr = 0
    second.innerText = "00"
    mintues.innerText = "00"
    hour.innerText = "00"
    errors=0;
    document.getElementById('errors').innerText = errors;
    fillBox=0;
    
    
    let board=document.getElementById('board')

    while(board.firstChild){
        board.firstChild.remove()
    }
    
    boardValue()

    digits.style.display = 'none'
    pauseBtn.style.display='none'
    restartBtn.style.display='none'
    numSelected.classList.remove('number-selected')

}







// this is the main logic of the timer 
function stopwatch() {

    if (timer == true) {
        count++;


        setTimeout("stopwatch()", 10)
    }

    if (count == 100) {
        sec++;
        if (sec < 10) {
            second.innerText = `0${sec}`
        } else {
            second.innerText = sec
        }

        count = 0
    }

    if (sec == 60) {
        minu++
        if (minu < 10) {
            mintues.innerText = `0${minu}`
        } else {
            mintues.innerText = minu
        }
        sec = 0;
    }

    if (minu == 60) {
        hr++
        if (hr < 10) {
            hour.innerText = `0${hr}`
        } else {
            hour.innerText = hr
        }

        minu = 0;
        sec = 0
    }
}


// stop the game when the game finished
function stop() {
    timer = false
    sec = 0
    minu = 0
    hr = 0
    second.innerText = "00"
    mintues.innerText = "00"
    hour.innerText = "00"
}


