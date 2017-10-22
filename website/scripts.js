jQuery(function ($) {

	

});

//initial setup
$(document).ready(function(){
	var game = createGame();
	var player = createPlayer(game);
	$( "#endTurnButton" ).click(function() {
		endTurn(player);
	});
	$("#hand0").click(function() {
		$("#hand0").fadeOut();
	});
	$("#hand1").click(function() {
		$("#hand1").fadeOut();
	});
	$("#hand2").click(function() {
		$("#hand2").fadeOut();
	});
	$("#hand3").click(function() {
		$("#hand3").fadeOut();
	});
	$("#hand4").click(function() {
		$("#hand4").fadeOut();
	});
}); 

function createGame() {
	game = {
		players: 3
		
	};

	supply = {
		kingdomCards: [	"chapel", "council_room", "festival", "gardens", "laboratory", "market", "smithy",
					 "village", "witch", "woodcutter", "workshop" ],

		coins: [ "copper", "silver", "gold" ],
		
		victory: [ "estate", "duchy", "province" ],
			
		curse: [ "curse" ],

		};
	
	// number of cards in each deck of supply
	supplyCount = {
		chapel: 10,
		council_room: 10,
		festival: 10,
		gardens: 12,
		laboratory: 10,
		market: 10,
		smithy: 10,
		village: 10,
		witch: 10,
		woodcutter: 10,
		workshop: 10,
		copper: 39,
		silver: 40,
		gold: 30,
		estate: 12,
		duchy: 12,
		province: 12,
		curse: 20
	};

	// change quantity of cards depending on number of players
	if (game.players === 2) {
		supplyCount.chapel = 8;
		supplyCount.duchy = 8;
		supplyCount.province = 8;
		supplyCount.curse = 10;
		supplyCount.copper = 46;
		supplyCount.gardens = 8;
	}
	if (game.players === 4) {
		supplyCount.curse = 30;
		supplyCount.copper = 32;
	}

	shuffle(supply.kingdomCards);
	supply.kingdomCards.pop();

	refreshSupply();

	return supply;

}

function createPlayer(supply){

	//player object
	 var player = {
		actions: 1,
		buys: 1,
		coins: 0,
		trashCards: 0,
		deck: ["copper", "copper", "copper", "copper", "copper", "copper", "copper", "estate", "estate", "estate"],
		hand: [],
		playedCards: [],
		discardPile: []
	};
	
	//randomize order of starting deck
	shuffle(player.deck);
	//draw 5 new cards
	draw(player, 5);

	refreshHand(player);

	return player;
}

// Refresh supply on screen
function refreshSupply() {
	var kingdomNum = "";
	var currentCard = {};

	for (i = 0; i < 10; i++){
		kingdomNum = "kingdom" + i;
		currentCard = getCard(supply.kingdomCards[i]);
		document.getElementById(kingdomNum).style.backgroundImage = currentCard.image;
	}
}

// Refresh the players hand on screen
function refreshHand(player) {
	var handNum = "";
	var currentCard = {};
	
	for (i = 0; i < 5; i++){
		handNum = "hand" + i;
		currentCard = getCard(player.hand[i]);
		document.getElementById(handNum).style.backgroundImage = currentCard.image;
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

// returns the card as an object
function getCard (card) {
	var theCard = {};
	switch (card){
		case "copper":
			theCard.image = "url('assets/cards/200px-Copper.jpg')";
			theCard.type = "coin";
			theCard.points = 1;
			theCard.cost = 0;
			return theCard;
			break;
		case "silver":
			theCard.image = "url('assets/cards/200px-Silver.jpg')";
			theCard.type = "coin";
			theCard.points = 2;
			theCard.cost = 3;
			return theCard;
			break;
		case "gold":
			theCard.image = "url('assets/cards/200px-Gold.jpg')";
			theCard.type = "coin";
			theCard.points = 3;
			theCard.cost = 6;
			return theCard;
			break;
		case "market":
			theCard.image = "url('assets/cards/200px-Market.jpg')";
			theCard.type = "action";
			theCard.action = "+1 card >> +1 action >> +1 buy >> +1 coin";
			theCard.cost = 5;
			return theCard;
			break;
		case "chapel":
			theCard.image = "url('assets/cards/200px-Chapel.jpg')";
			theCard.type = "action";
			theCard.action = "trash up to 4 cards from your hand";
			theCard.cost = 2;
			return theCard;
			break;
		case "council_room":
			theCard.image = "url('assets/cards/200px-Council_Room.jpg')";
			theCard.type = "action";
			theCard.action = "+4 cards >> +1 buy << each other player draws a card";
			theCard.cost = 5;
			return theCard;
			break;
		case "festival":
			theCard.image = "url('assets/cards/200px-Festival.jpg')";
			theCard.type = "action";
			theCard.action = "+2 actions >> +1 buy >> +2 coins";
			theCard.cost = 5;
			return theCard;
			break;
		case "gardens":
			theCard.image = "url('assets/cards/200px-Gardens.jpg')";
			theCard.type = "victory";
			theCard.action = "+1 victory per ten cards you have (round down)";
			theCard.cost = 4;
			return theCard;
			break;
		case "laboratory":
			theCard.image = "url('assets/cards/200px-Laboratory.jpg')";
			theCard.type = "action";
			theCard.action = "+2 cards >> +1 action";
			theCard.cost = 5;
			return theCard;
			break;
		case "smithy":
			theCard.image = "url('assets/cards/200px-Smithy.jpg')";
			theCard.type = "action";
			theCard.action = "+3 cards";
			theCard.cost = 4;
			return theCard;
			break;
		case "village":
			theCard.image = "url('assets/cards/200px-Village.jpg')";
			theCard.type = "action";
			theCard.action = "+1 card >> +2 actions";
			theCard.cost = 3;
			return theCard;
			break;
		case "witch":
			theCard.image = "url('assets/cards/200px-Witch.jpg')";
			theCard.type = "action";
			theCard.action = "+2 cards >> Each other player gains a curse";
			theCard.cost = 4;
			return theCard;
			break;
		case "woodcutter":
			theCard.image = "url('assets/cards/200px-Woodcutter.jpg')";
			theCard.type = "action";
			theCard.action = "+1 buy >> +2 coins";
			theCard.cost = 3;
			return theCard;
			break;
		case "workshop":
			theCard.image = "url('assets/cards/200px-Workshop.jpg')";
			theCard.type = "action";
			theCard.action = "gain a card costing up to 4 coins";
			theCard.cost = 3;
			return theCard;
			break;
		case "estate":
			theCard.image = "url('assets/cards/200px-Estate.jpg')";
			theCard.type = "victory";
			theCard.points = 1;
			theCard.cost = 2;
			return theCard;
			break;
		case "duchy":
			theCard.image = "url('assets/cards/200px-Duchy.jpg')";
			theCard.type = "Victory";
			theCard.points = 3;
			theCard.cost = 5;
			return theCard;
			break;
		case "province":
			theCard.image = "url('assets/cards/200px-Province.jpg')";
			theCard.type = "victory";
			theCard.points = 6;
			theCard.cost = 8;
			return theCard;
			break;
		case "curse":
			theCard.image = "url('assets/cards/200px-Curse.jpg')";
			theCard.type = "curse";
			theCard.points = -1;
			theCard.cost = 0;
			return theCard;
			break;
		default:
			theCard.image = "url('assets/cards/200px-Cardback.jpg')"
			return theCard;
	}
}
