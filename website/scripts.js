jQuery(function ($) {

	

});

//initial setup
$(document).ready(function(){
	var game = createGame();
	var player = createPlayer(game);
	var cardsPlayed = []; // this is for the numbers in the hand array that have bean played
	var cardPlayable = false;

	$( "#endTurnButton" ).click(function() {
		endTurn(player);
	});

	// Hand____
	$("#hand0").click(function() {
		card = getCard(player.hand[0]);
		cardPlayable = playCard(card, player);
		
		if (cardPlayable) {
			player.playedCards.push(player.hand[0]);
			cardsPlayed.push(0);
			$("#hand0").fadeOut("fast");
		}
		
		
	});
	$("#hand1").click(function() {
		card = getCard(player.hand[1]);
		cardPlayable = playCard(card, player);
		
		if (cardPlayable) {
			player.playedCards.push(player.hand[1]);
			cardsPlayed.push(1);
			$("#hand1").fadeOut("fast");
		}
		
		
	});
	$("#hand2").click(function() {
		card = getCard(player.hand[2]);
		cardPlayable = playCard(card, player);
		
		if (cardPlayable) {
			player.playedCards.push(player.hand[2]);
			cardsPlayed.push(2);
			$("#hand2").fadeOut("fast");
		}
		
		
	});
	$("#hand3").click(function() {
		card = getCard(player.hand[3]);
		cardPlayable = playCard(card, player);
		
		if (cardPlayable) {
			player.playedCards.push(player.hand[3]);
			cardsPlayed.push(3);
			$("#hand3").fadeOut("fast");
		}
		
		
	});
	$("#hand4").click(function() {
		card = getCard(player.hand[4]);
		cardPlayable = playCard(card, player);
		
		if (cardPlayable) {
			player.playedCards.push(player.hand[4]);
			cardsPlayed.push(4);
			$("#hand4").fadeOut("fast");
		}
		
		
	});

	//Supply____
	$("#estate").click(function() {
		$("#estate").animate({opacity: '0.0'}, "fast");
		$("#estate").animate({opacity: '1.0'});
	});
	$("#duchy").click(function() {
		$("#duchy").animate({opacity: '0.0'}, "fast");
		$("#duchy").animate({opacity: '1.0'});
	});
	$("#kingdom0").click(function() {
		$("#kingdom0").animate({opacity: '0.0'}, "fast");
		$("#kingdom0").animate({opacity: '1.0'});
	});
	$("#kingdom1").click(function() {
		$("#kingdom1").animate({opacity: '0.0'}, "fast");
		$("#kingdom1").animate({opacity: '1.0'});
	});
	$("#kingdom2").click(function() {
		$("#kingdom2").animate({opacity: '0.0'}, "fast");
		$("#kingdom2").animate({opacity: '1.0'});
	});
	$("#kingdom3").click(function() {
		$("#kingdom3").animate({opacity: '0.0'}, "fast");
		$("#kingdom3").animate({opacity: '1.0'});
	});
	$("#kingdom4").click(function() {
		$("#kingdom4").animate({opacity: '0.0'}, "fast");
		$("#kingdom4").animate({opacity: '1.0'});
	});
	$("#copper").click(function() {
		$("#copper").animate({opacity: '0.0'}, "fast");
		$("#copper").animate({opacity: '1.0'});
	});
	$("#silver").click(function() {
		$("#silver").animate({opacity: '0.0'}, "fast");
		$("#silver").animate({opacity: '1.0'});
	});
	$("#province").click(function() {
		$("#province").animate({opacity: '0.0'}, "fast");
		$("#province").animate({opacity: '1.0'});
	});
	$("#curse").click(function() {
		$("#curse").animate({opacity: '0.0'}, "fast");
		$("#curse").animate({opacity: '1.0'});
	});
	$("#kingdom5").click(function() {
		$("#kingdom5").animate({opacity: '0.0'}, "fast");
		$("#kingdom5").animate({opacity: '1.0'});
	});
	$("#kingdom6").click(function() {
		$("#kingdom6").animate({opacity: '0.0'}, "fast");
		$("#kingdom6").animate({opacity: '1.0'});
	});
	$("#kingdom7").click(function() {
		$("#kingdom7").animate({opacity: '0.0'}, "fast");
		$("#kingdom7").animate({opacity: '1.0'});
	});
	$("#kingdom8").click(function() {
		$("#kingdom8").animate({opacity: '0.0'}, "fast");
		$("#kingdom8").animate({opacity: '1.0'});
	});
	$("#kingdom9").click(function() {
		$("#kingdom9").animate({opacity: '0.0'}, "fast");
		$("#kingdom9").animate({opacity: '1.0'});
	});
	$("#gold").click(function() {
		$("#gold").animate({opacity: '0.0'}, "fast");
		$("#gold").animate({opacity: '1.0'});
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
		victoryPoints: 0,
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

// Refresh the players stats on screen
function refreshStats(player) {
	document.getElementById("actionCount").innerHTML = player.actions;
	document.getElementById("buyCount").innerHTML = player.buys;
	document.getElementById("coinCount").innerHTML = ("$" + player.coins);
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

function playCard (card, player) {
	if (card.type === "coin") {
		player.coins += card.points;
		refreshStats(player);
		return true;
	}
	if (card.type === "action"){
		var actionList = [];
		actionList = card.action;

		// A loop to find what actions the player gets
		for (var i = 0; i < card.action.length; i++){
			switch (card.action[i]){
				case "+1 card":
					draw(player, 1);
					refreshHand(player);
					break;
				case "+2 cards":
					draw(player, 2);
					refreshHand(player);
					break;
				case "+3 cards":
					draw(player, 3);
					refreshHand(player);
					break;
				case "+4 cards":
					draw(player, 4);
					refreshHand(player);
					break;
				case "+1 action":
					player.actions += 1;
					refreshStats(player);
					break;
				case "+2 actions":
					player.actions += 2;
					refreshStats(player);
					break;
				case "+1 buy":
					player.buys += 1;
					refreshStats(player);
					break;
				case "+1 coin":
					player.coins += 1;
					refreshStats(player);
					break;
				case "+2 coins":
					player.coins += 2;
					refreshStats(player);
					break;
				case "trash 4 cards":
					player.trashCards += 4;
					console.log("Players trash cards increased by 4.");
					break;
				case "each other player draws a card":
					console.log("Each other player draws a card.");
					break;
				case "+1 victory point per ten cards player has (round down)":
					var totalCards = player.deck.length + player.hand.length + player.discardPile.length;
					player.victoryPoints += Math.floor(totalCards / 10);
					console.log("+1 Victory per then cards: \nTotalCards: " + totalCards + "." +
															"\nVictory Points Added: " + Math.floor(totalCards / 10));
					break;
				case "+1 curse for each other player":
					console.log("Each other player gains 1 curse point.");
					break;
				case "+1 card costing up to 4 coins":
					player.buys += 4;
					refreshStats(player);
					break;
				default:
					
			}
		}
		return true;
	}
	if (card.type === "victory"){
		return false; // victory cards cannot be played
	}
	if (card.type === "curse"){
		player.curse += card.points;
		console.log("Player Curse points: " + player.curse);
		return true;
	}
}

function buyCard (card, player) {

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
			theCard.action = ["+1 card", "+1 action", "+1 buy", "+1 coin"];
			theCard.cost = 5;
			return theCard;
			break;
		case "chapel":
			theCard.image = "url('assets/cards/200px-Chapel.jpg')";
			theCard.type = "action";
			theCard.action = ["trash 4 cards"];
			theCard.cost = 2;
			return theCard;
			break;
		case "council_room":
			theCard.image = "url('assets/cards/200px-Council_Room.jpg')";
			theCard.type = "action";
			theCard.action = ["+4 cards", "+1 buy", "each other player draws a card"];
			theCard.cost = 5;
			return theCard;
			break;
		case "festival":
			theCard.image = "url('assets/cards/200px-Festival.jpg')";
			theCard.type = "action";
			theCard.action = ["+2 actions", "+1 buy", "+2 coins"];
			theCard.cost = 5;
			return theCard;
			break;
		case "gardens":
			theCard.image = "url('assets/cards/200px-Gardens.jpg')";
			theCard.type = "action";
			theCard.action = ["+1 victory point per ten cards player has (round down)"];
			theCard.cost = 4;
			return theCard;
			break;
		case "laboratory":
			theCard.image = "url('assets/cards/200px-Laboratory.jpg')";
			theCard.type = "action";
			theCard.action = ["+2 cards", "+1 action"];
			theCard.cost = 5;
			return theCard;
			break;
		case "smithy":
			theCard.image = "url('assets/cards/200px-Smithy.jpg')";
			theCard.type = "action";
			theCard.action = ["+3 cards"];
			theCard.cost = 4;
			return theCard;
			break;
		case "village":
			theCard.image = "url('assets/cards/200px-Village.jpg')";
			theCard.type = "action";
			theCard.action = ["+1 card", "+2 actions"];
			theCard.cost = 3;
			return theCard;
			break;
		case "witch":
			theCard.image = "url('assets/cards/200px-Witch.jpg')";
			theCard.type = "action";
			theCard.action = ["+2 cards", "+1 curse for each other player"];
			theCard.cost = 4;
			return theCard;
			break;
		case "woodcutter":
			theCard.image = "url('assets/cards/200px-Woodcutter.jpg')";
			theCard.type = "action";
			theCard.action = ["+1 buy", "+2 coins"];
			theCard.cost = 3;
			return theCard;
			break;
		case "workshop":
			theCard.image = "url('assets/cards/200px-Workshop.jpg')";
			theCard.type = "action";
			theCard.action = ["+1 card costing up to 4 coins"];
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
