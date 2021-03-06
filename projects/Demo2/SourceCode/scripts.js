// written by: Mathew Griffin, Brent Parker, and Carlos Perez
// tested by: Mathew Griffin, Brent Parker, and Carlos Perez
// debugged by: Mathew Griffin, Brent Parker, and Carlos Perez


jQuery(function ($) {

	gameStart = new TimelineMax();
    gameStart.to('.title', 0, {opacity:1, scale:1.35}, 0)
    		 .to('.background', 0.5, {opacity:0.35}, 0.5)
             .staggerFrom('.title h1', 0.35, {opacity:0, yPercent:-15}, 0, 0.75)
             .staggerFrom('.title h6', 0.35, {opacity:0, yPercent:8}, 0, 0.75)
             .to('.instructions', 0.35, {opacity:1, yPercent:-2}, 1.2, 1.2)
    gameStart.play();

    $(".startGame").click(function() {
    	initGame = new TimelineMax();
    	initGame.to('.instructions', 0.25, {opacity:0, yPercent:2}, 0.2, 0.2)
    			.to('.title', 0.65, {css:{top: 10, scale:1}}, 0.55, 0.55)
    			.to('#game-holder', 0.25, {css:{visibility:'visible', opacity:1}}, 0.9, 0.9)
    			.staggerFrom('.supply .card', 0.3, {css:{left:-5, opacity:0}}, 0.05, 1.25)
    			.staggerFrom('.action', 0.3, {css:{opacity:0}}, 0, 2.2)
    			.staggerFrom('.hand .card', 0.3, {css:{left:-5, opacity:0}}, 0.05, 2.85)
		initGame.play();
		return false;
	});

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
		playCard(card, player, 0);
		refreshHand(player);				
	});
	$("#hand1").click(function() {
		card = getCard(player.hand[1]);
		playCard(card, player, 1);
		refreshHand(player);
	});
	$("#hand2").click(function() {
		card = getCard(player.hand[2]);
		playCard(card, player, 2);
		refreshHand(player);
	});
	$("#hand3").click(function() {
		card = getCard(player.hand[3]);
		playCard(card, player, 3);
		refreshHand(player);
	});
	$("#hand4").click(function() {
		card = getCard(player.hand[4]);
		playCard(card, player, 4);
		refreshHand(player);
	});

	//Supply____
	$("#estate").click(function() {
		if (buyCard ("estate", player)){
			$("#estate").animate({opacity: '0.0'}, "fast");
			$("#estate").animate({opacity: '1.0'});
			supplyCount.estate--;
		}			
	});
	$("#duchy").click(function() {
		if (buyCard ("duchy", player)){
			$("#duchy").animate({opacity: '0.0'}, "fast");
			$("#duchy").animate({opacity: '1.0'});
			supplyCount.duchy--;
		}			
	});
	$("#kingdom0").click(function() {
		if (buyCard (supply.kingdomCards[0], player)){
			$("#kingdom0").animate({opacity: '0.0'}, "fast");
			$("#kingdom0").animate({opacity: '1.0'});
			supplyCount.kingdomCards[0]--;
		}
	});
	$("#kingdom1").click(function() {
		if (buyCard (supply.kingdomCards[1], player)){
			$("#kingdom1").animate({opacity: '0.0'}, "fast");
			$("#kingdom1").animate({opacity: '1.0'});
			supplyCount.kingdomCards[1]--;
		}
	});
	$("#kingdom2").click(function() {
		if (buyCard (supply.kingdomCards[2], player)){
			$("#kingdom2").animate({opacity: '0.0'}, "fast");
			$("#kingdom2").animate({opacity: '1.0'});
			supplyCount.kingdomCards[2]--;
		}
	});
	$("#kingdom3").click(function() {
		if (buyCard (supply.kingdomCards[3], player)){
			$("#kingdom3").animate({opacity: '0.0'}, "fast");
			$("#kingdom3").animate({opacity: '1.0'});
			supplyCount.kingdomCards[3]--;
		}
	});
	$("#kingdom4").click(function() {
		if (buyCard (supply.kingdomCards[4], player)){
			$("#kingdom4").animate({opacity: '0.0'}, "fast");
			$("#kingdom4").animate({opacity: '1.0'});
			supplyCount.kingdomCards[4]--;
		}
	});
	$("#copper").click(function() {
		if (buyCard ("copper", player)){
			$("#copper").animate({opacity: '0.0'}, "fast");
			$("#copper").animate({opacity: '1.0'});
			supplyCount.copper--;
		}			
	});
	$("#silver").click(function() {
		if (buyCard ("silver", player)){
			$("#silver").animate({opacity: '0.0'}, "fast");
			$("#silver").animate({opacity: '1.0'});
			supplyCount.silver--;
		}	
	});
	$("#province").click(function() {
		if (buyCard ("province", player)){
			$("#province").animate({opacity: '0.0'}, "fast");
			$("#province").animate({opacity: '1.0'});
			supplyCount.province--;
		}	
	});
	$("#curse").click(function() {
		if (buyCard ("curse", player)){
			$("#curse").animate({opacity: '0.0'}, "fast");
			$("#curse").animate({opacity: '1.0'});
			supplyCount.curse--;
		}	
	});
	$("#kingdom5").click(function() {
		if (buyCard (supply.kingdomCards[5], player)){
			$("#kingdom5").animate({opacity: '0.0'}, "fast");
			$("#kingdom5").animate({opacity: '1.0'});
			supplyCount.kingdomCards[5]--;
		}
	});
	$("#kingdom6").click(function() {
		if (buyCard (supply.kingdomCards[6], player)){
			$("#kingdom6").animate({opacity: '0.0'}, "fast");
			$("#kingdom6").animate({opacity: '1.0'});
			supplyCount.kingdomCards[6]--;
		}
	});
	$("#kingdom7").click(function() {
		if (buyCard (supply.kingdomCards[7], player)){
			$("#kingdom7").animate({opacity: '0.0'}, "fast");
			$("#kingdom7").animate({opacity: '1.0'});
			supplyCount.kingdomCards[7]--;
		}
	});
	$("#kingdom8").click(function() {
		if (buyCard (supply.kingdomCards[8], player)){
			$("#kingdom8").animate({opacity: '0.0'}, "fast");
			$("#kingdom8").animate({opacity: '1.0'});
			supplyCount.kingdomCards[8]--;
		}
	});
	$("#kingdom9").click(function() {
		if (buyCard (supply.kingdomCards[9], player)){
			$("#kingdom9").animate({opacity: '0.0'}, "fast");
			$("#kingdom9").animate({opacity: '1.0'});
			supplyCount.kingdomCards[9]--;
		}
	});
	$("#gold").click(function() {
		if (buyCard ("gold", player)){
			$("#gold").animate({opacity: '0.0'}, "fast");
			$("#gold").animate({opacity: '1.0'});
			supplyCount.gold--;
		}
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
		curse: 0,
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

	// remove cards from screen first
	for (i = 0; i < 5; i++){
		handNum = "#hand" + i;
		$(handNum).fadeOut("fast");
	}
	
	// Then draw the updated hand to screen
	for (i = 0; i < player.hand.length; i++){
		handNum = "hand" + i;
		currentCard = getCard(player.hand[i]);
		document.getElementById(handNum).style.backgroundImage = currentCard.image;
	}

	showHiddenCards(player);
}

// Draw played cards back to screen
function showHiddenCards(player) {
	for (i = 0; i < 5; i++){
		if (player.hand[i] !== undefined){
			handNum = "#hand" + i;
			$(handNum).fadeIn("fast");
			console.log("Player Hand " + player.hand[i]);
		}		
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
		if (player.hand.length < 5)
			player.hand.push(player.deck.pop());
	}
	//console.log(player.hand);
	return player;
}

function playCard (card, player, index) {
	var cardPlayable = false;
	if (card.type === "coin") {
		moveToDiscard(player, index);
		player.coins += card.points;
		refreshStats(player);
		cardPlayable = true;
	}
	if (card.type === "action"){	
		if (player.actions > 0){
			var actionList = [];
			actionList = card.action;
			player.actions--;
			refreshStats(player);
			moveToDiscard(player, index);
			// A loop to find what actions the player gets
			for (var i = 0; i < card.action.length; i++){
				switch (card.action[i]){
					case "+1 card":
						draw(player, 1);
						refreshHand(player);
						showHiddenCards(player);
						break;
					case "+2 cards":
						draw(player, 2);
						refreshHand(player);
						showHiddenCards(player);
						break;
					case "+3 cards":
						draw(player, 3);
						refreshHand(player);
						showHiddenCards(player);
						break;
					case "+4 cards":
						draw(player, 4);
						refreshHand(player);
						showHiddenCards(player);
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
						player.coins += 4;
						refreshStats(player);
						break;
					default:

				}
			}
		}
		else
			alert ("Insufficient Actions!");
	}
	
	if (card.type === "victory"){
		alert("Victory Cards Cannot be Played.")
		// victory cards cannot be played
	}

	if (card.type === "curse"){
		moveToDiscard(player, index);
		player.curse += card.points;
		console.log("Player Curse points: " + player.curse);
		cardPlayable = true;
	}
}

function moveToDiscard (player, index){
		handNum = "#hand" + index;
		$(handNum).fadeOut("fast");
		player.discardPile.push(player.hand[index]);
		player.hand.splice(index, 1);
		//cardsPlayed.push(index);

		console.log("Player Hand: \n")
		for (var i = 0; i < player.hand.length; i++) 
			console.log(player.hand[i] + "\n");
}

function buyCard (card, player) {
	var cardObj = getCard(card);

		if (player.coins >= cardObj.cost && player.buys > 0) {
			player.coins -= cardObj.cost;
			player.buys--;
			player.discardPile.push(card);
			refreshStats(player);
			return true;
		}
		else if (player.buys === 0) {
			alert("Insufficient Buy Points!");
		}
		else if (player.coins < cardObj.cost){
			alert("Insufficient Coin!");
			return false;
		}
			
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

	refreshHand(player);
	refreshStats(player);
		
	showHiddenCards(player);
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
