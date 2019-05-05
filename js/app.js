/*
 * Create a list that holds all of your cards
 */
  let deck = document.querySelectorAll('li.card');
  let restart= document.querySelector('div.restart');
  let start= document.querySelector('button');
  let originalListOfCards=document.querySelectorAll('i.innercard');
  var classmatch=[];
  var index=[];
  let counterDisplay=document.querySelector('.moves');
  let timerDisplay=document.querySelector('.timer');
  let starsController=document.querySelectorAll("i.fa.fa-star")
  let matchcounter=0;
  let counter=0;
  let modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];

/*
  Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
}
//the first array should be the new listOfcards, and the second array, should be the original ListOfCards. By adding a new class it will display a diffent card.
function mkhtml(array,arrayorig){
		for (var i = 0; i<array.length; i++) {
			arrayorig[i].classList.remove(arrayorig[i].classList[2]);
			arrayorig[i].classList.add(array[i]);
		}
	}

//Start button
start.addEventListener("click", function(){
	for (const i of deck){
		i.classList = '';
    	i.classList.add('card');}
    let newListOfCards=[...originalListOfCards]
    newListOfCards = shuffle(newListOfCards);
    let temp=[];
    for(const i of newListOfCards){
    	temp.push(i.classList[2])
    }
    mkhtml(temp,originalListOfCards);
    counter=0;
    counterDisplay.innerHTML=counter;
    classmatch=[];
    for(const r of starsController){
    	//reset the stars
    	r.classList.remove('fa-star');
    	r.classList.add('fa-star');
    }
    clearInterval(interval);
    hour=0;
    min=0;
    sec=0;
    timerDisplay.innerHTML =hour+'hour(s) :'+min+"min(s) : "+sec+"sec(s)";
    startTimer();

})
//Restart button
restart.addEventListener("click", function(){
	for (const i of deck){
		i.classList = '';
    	i.classList.add('card');}
    let newListOfCards=[...originalListOfCards]
    newListOfCards = shuffle(newListOfCards);
    let temp=[];
    for(const i of newListOfCards){
    	temp.push(i.classList[2])
    }
    mkhtml(temp,originalListOfCards);
    counter=0;
    counterDisplay.innerHTML=counter;
    classmatch=[];
    for(const r of starsController){
    	r.classList.remove('fa-star');
    	r.classList.add('fa-star');
    }
    clearInterval(interval);
    hour=0;
    min=0;
    sec=0;
    timerDisplay.innerHTML =hour+'hour(s) :'+min+"min(s) : "+sec+"sec(s)";
    startTimer();

})
//Match logic
function stars(counter){
	if (counter <= 20){//ate 20
		return
	}
	if (counter >= 21 && counter <= 25 ){
		if(starsController[0].classList.length == 2){
			starsController[0].classList.remove('fa-star');
		}
	}
	if (counter >= 26 && counter <= 30 ){
		if(starsController[1].classList.length == 2){
			starsController[1].classList.remove('fa-star');
		}

	}
	if (counter > 30){
		if(starsController[2].classList.length == 2){
			starsController[2].classList.remove('fa-star');
		}

	}
}
//open and close the card
function openclose(number){
	deck[number].classList.toggle('open');
	deck[number].classList.toggle('show');
	deck[number].classList.toggle("disabled");
}
//Counter
function counterf(){
	counter+=1;
	counterDisplay.innerHTML=counter;

}
//list os open cards
function opencardslist(number){
	classmatch.push(originalListOfCards[number].classList[2]);
	index.push(number);
	if(classmatch.length ==2){
		countermatch();
	}
}
//removes the card from the open cards list
function removefromopenlist(number,number2){
	deck[number].classList.add("notamatch");
    deck[number2].classList.add("notamatch");
    deck[number].classList.add('disabled');
    deck[number2].classList.add('disabled');
    classmatch.pop(originalListOfCards[number].classList[2]);
	classmatch.pop(originalListOfCards[number2].classList[2]);
    
    setTimeout(function(){
        deck[number].classList.remove("show", "open","notamatch");
        deck[number2].classList.remove("show", "open","notamatch");
        deck[number].classList.remove('disabled');
    	deck[number2].classList.remove('disabled');
    },1200);
}	
	
//adds the match Class to the ClassList
function match(number,number2){	
	deck[number].classList.add('match');
	deck[number2].classList.add('match');
}
//I used a variable to count the match's
//Display a msg of contratulations
function finalgame(matchcounter){
	if (matchcounter==8) {
		clearInterval(interval);
        var finalTime = timerDisplay.innerHTML;
        
        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = counter;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // show congratulations modal
        modal.style.display = "block";	

		}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}

//Verify the match
function countermatch(){
	if (classmatch[0] == classmatch[1]) {
		classmatch=[];
		matchcounter+=1;
		match(index[0],index[1]);
		finalgame(matchcounter);
		index=[];			
	}
	else{
		removefromopenlist(index[0],index[1]);
		index=[];	
	}
}


// Timer
let sec = 0, min = 0; hour = 0;
let interval;
function startTimer(){
    interval = setInterval(function(){
        timerDisplay.innerHTML =hour+'hour(s) :'+min+"min(s) : "+sec+"sec(s)";
        sec++;
        if(sec == 60){
            min++;
            sec=0;
        }
        if(min == 60){
            hour++;
            min = 0;
        }
    },1000);
}

//each event listener will listen to the card
deck[0].addEventListener("click", function(){
	openclose(0);
	counterf();
	stars(counter);
	opencardslist(0)
	
} )
deck[1].addEventListener("click", function(){
	openclose(1);
	counterf();
	stars(counter);
	opencardslist(1)
	
} )

deck[2].addEventListener("click", function(){
	openclose(2);
	counterf();
	stars(counter);
	opencardslist(2)
	
} )

deck[3].addEventListener("click", function(){
	openclose(3);
	counterf();
	stars(counter);
	opencardslist(3)
	
} )
deck[4].addEventListener("click", function(){
	openclose(4);
	counterf();
	stars(counter);
	opencardslist(4)
	
} )
deck[5].addEventListener("click", function(){
	openclose(5);
	counterf();
	stars(counter);
	opencardslist(5)
	
} )
deck[6].addEventListener("click", function(){
	openclose(6);
	counterf();
	stars(counter);
	opencardslist(6)
	
} )
deck[7].addEventListener("click", function(){
	openclose(7);
	counterf();
	stars(counter);
	opencardslist(7)
	
} )
deck[8].addEventListener("click", function(){
	openclose(8);
	counterf();
	stars(counter);
	opencardslist(8)
	
} )
deck[9].addEventListener("click", function(){
	openclose(9);
	counterf();
	stars(counter);
	opencardslist(9)
	
} )
deck[10].addEventListener("click", function(){
	openclose(10);
	counterf();
	stars(counter);
	opencardslist(10)
	
} )
deck[11].addEventListener("click", function(){
	openclose(11);
	counterf();
	stars(counter);
	opencardslist(11)
	
} )
deck[12].addEventListener("click", function(){
	openclose(12);
	counterf();
	stars(counter);
	opencardslist(12)
	
} )
deck[13].addEventListener("click", function(){
	openclose(13);
	counterf();
	stars(counter);
	opencardslist(13)
	
} )
deck[14].addEventListener("click", function(){
	openclose(14);
	counterf();
	stars(counter);
	opencardslist(14)
	
} )
deck[15].addEventListener("click", function(){
	openclose(15);
	counterf();
	stars(counter);
	opencardslist(15)
	
} )