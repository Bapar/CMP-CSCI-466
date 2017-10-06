jQuery(function ($) {

	

});

//initial setup
$(document).ready(function(){
	var game = createGame();
	var player = createPlayer();
	$( "#endTurnButton" ).click(function() {
		endTurn(player);
	});
	
}); 

function createGame() {
	var game = {
		supply: []
	};
}

function createPlayer(){

	//player object
	var player = {
		actions: 1,
		buys: 1,
		coins: 0,
		deck: ["copper", "copper", "copper", "copper", "copper", "copper", "copper", "estate", "estate", "estate"],
		hand: [],
		playedCards: [],
		discardPile: []
	};
	
	//randomize order of starting deck
	shuffle(player.deck);
	//draw 5 new cards
	draw(player, 5);

	renderHand(player);

	return player;
}

// Render the players hand on screen
function renderHand(player) {
	for (i = 0; i < 5; i++){
		handNum = "hand" + i;
		document.getElementById(handNum).style.backgroundImage = getImage(player.hand[i]);
		//alert(player.hand[0]);
	}
}

//Fisher-Yates suffling algorith from
//https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function draw(player, count){
	for (i = 0; i < count; i++){
		//if unable to draw cards shuffle discarded cards into draw pile.
		if (player.deck.length == 0){
			player.deck = player.discardPile;
			player.discardPile = [];
			shuffle(player.deck);
		}
		//move a card from deck to hand
		player.hand.push(player.deck.pop());
	}
	//console.log(player.hand);
	return player;
}

function endTurn(player){
	//reset cards
	player.discardPile = player.discardPile.concat(player.hand, player.playedCards);	//discard hand and played cards
	player.hand = [];													//empty hand and playedCards
	player.playedCards = [];
	draw(player, 5);
	
	//reset player attribures
	player.actions = 1;												
	player.buys = 1;
	player.coins = 0;
	
//	console.log("deck: " + player.deck);
//	console.log("hand: " + player.hand);
//	console.log("discard: " + player.discardPile);
	
	return player;
}

//--------------------------------------------------------
function getImage(card) {
	 switch (card) {
         case "copper":
             return "url('assets/cards/200px-Copper.jpg')";
             break;
         case "silver":
             return "url('assets/cards/200px-Silver.jpg')";
             break;
         case "gold":
             return "url('assets/cards/200px-Gold.jpg')";
             break;
         case "estate":
             return "url('assets/cards/200px-Estate.jpg')";
             break;
		 case "duchy":
             return "url('assets/cards/200px-Duchy.jpg')";
             break;
         case "province":
             return "url('assets/cards/200px-Province.jpg')";
             break;
         case "chapel":
             return "url('assets/cards/200px-Chapel.jpg')";
             break;
         case "council room":
             return "url('assets/cards/200px-Council_Room.jpg')";
             break;
         case "festival":
             return "url('assets/cards/200px-Festival.jpg')";
             break;
         case "gardens":
             return "url('assets/cards/200px-Gardens.jpg')";
             break;
         case "laboratory":
             return "url('assets/cards/200px-Laboratory.jpg')";
             break;
         case "market":
             return "url('assets/cards/200px-Market.jpg')";
             break;
		 case "village":
             return "url('assets/cards/200px-Village.jpg')";
             break;
         case "witch":
             return "url('assets/cards/200px-Witch.jpg')";
             break;
         case "woodcutter":
             return "url('assets/cards/200px-Woodcutter.jpg')";
             break;
         case "workshop":
             return "url('assets/cards/200px-Workshop.jpg')";
             break;
         case "curse":
             return "url('assets/cards/200px-Curse.jpg')";
             break;
         case "trash":
             return "url('assets/cards/200px-Trash-new.jpg')";
             break;
         default:
         	return "url('assets/cards/200px-Cardback.jpg')";
	 }
}