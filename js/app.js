// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// declaring the variables
const deck = document.querySelector("#card-deck");
let moves = 0;
let countMove = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelector(".stars");
let matchedCard = document.getElementsByClassName("match");
let closebtn = document.querySelector(".close");
 let modal = document.getElementById("popup1")

 // array for opened cards
var cardArray = [];
// @description shuffles cards when page is refreshed / loads
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

initGame();
//  function to start a new game 
function initGame(){
    // shuffle deck
    cardArray = [];
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    
    firstClick = true;
    moves = 0;
    countMove.innerHTML = moves;
    // reset rating
    starsList.innerHTML = `<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <style type="text/css">
.fa_custom {
color: #ffd700;
}
</style></head>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>`;
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}
function moveCounter() {
     moves++;
    countMove.innerHTML = moves;
    //start timer on first click
    
    // setting rates based on moves
    if (moves > 10 && moves < 18){
        starsList.innerHTML = `<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <style type="text/css">
.fa_custom {
color: #ffd700;
}
</style></head>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>`;
        
    }
    else if (moves > 18){
        starsList.innerHTML = `<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <style type="text/css">
.fa_custom {
color: #ffd700;
}
</style></head>
<i class="fa fa-star fa_custom" aria-hidden="true"></i>`;
        
    }
}

// @description toggles open and show class to display cards
var showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    if (firstClick) {
        second = 1;
        minute = 0;
        hour = 0;
        startTimer();
        firstClick = false;
         }
    cardArray.push(this);
        if(cardArray.length === 2){
            moveCounter();

        if(cardArray[0].type === cardArray[1].type){
            matched();
        } else {
            unmatched();
        }
    }
    };



// @description when cards match
function matched(){
    cardArray[0].classList.add("match", "disabled");
    cardArray[1].classList.add("match", "disabled");
    cardArray[0].classList.remove("show", "open", "no-event");
    cardArray[1].classList.remove("show", "open", "no-event");
    cardArray = [];

}


// @description when cards don't match
function unmatched(){
    cardArray[0].classList.add("no-match");
    cardArray[1].classList.add("no-match");
    mute();
    setTimeout(function(){
        cardArray[0].classList.remove("no-match");
        cardArray[1].classList.remove("no-match");
        cardArray[0].classList.remove("open");
        cardArray[0].classList.remove("show");
        cardArray[1].classList.remove("open");
        cardArray[1].classList.remove("show");
        cardArray[0].classList.remove("no-event");
        cardArray[1].classList.remove("no-event");
        enable();

        cardArray = [];
    },1000);
}


// @description disable cards temporarily
function mute(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves


var second = 0, minute = 0, hour = 0;
// @description game timer
var timer = document.querySelector(".timer");
var interval;
function startTimer(){  
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
// add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congrats);
};

// function for congratulations when all cards match, show modal and moves, time and rating
function congrats(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

       
        var starRating = document.querySelector(".stars").innerHTML;

        
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closebutton popup
        closeModal();
    };
}



function closeModal(){
      closebtn.addEventListener("click", function(e){
        modal.classList.remove("show");
        initGame();
    });
}



// prompt for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    initGame();
}



