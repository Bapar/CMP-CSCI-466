jQuery(function ($) {

	

});

//initial setup
$(document).ready(function(){
	var player = createPlayer();
	$( "#endTurnButton" ).click(function() {
		endTurn(player);
	});
	
}); 

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
	return player;
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