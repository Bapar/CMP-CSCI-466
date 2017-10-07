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
		players: 3
		
	};

	var supply = {
		kingdomCards: [
			chapel = {
				name: "chapel",
				type: "action",
				image: "url('assets/cards/200px-Chapel.jpg')",
				count: 10,
				cost: 2
			}, 
			councilRoom = {
				name: "council room",
				type: "action",
				image: "url('assets/cards/200px-Council_Room.jpg')",
				count: 10,
				cost: 5
			}, 
			festival = {
				name: "festival",
				type: "action",
				image: "url('assets/cards/200px-Festival.jpg')",
				count: 10,
				cost: 5
			}, 
			gardens = {
				name: "gardens",
				type: "victory",
				image: "url('assets/cards/200px-Gardens.jpg')",
				count: 12,
				cost: 4
			}, 
			laboratory = {
				name: "laboratory",
				type: "action",
				image: "url('assets/cards/200px-Laboratory.jpg')",
				count: 10,
				cost: 5
			}, 
			market = {
				name: "market",
				type: "action",
				image: "url('assets/cards/200px-Market.jpg')",
				count: 10,
				cost: 5
			}, 
			smithy = {
				name: "smithy",
				type: "action",
				image: "url('assets/cards/200px-Smithy.jpg')",
				count: 10,
				cost: 4
			}, 
			village = {
				name: "village",
				type: "action",
				image: "url('assets/cards/200px-Village.jpg')",
				count: 10,
				cost: 3
			},
			witch = {
				name: "witch",
				type: "action-attack",
				image:"url('assets/cards/200px-Witch.jpg')",
				count: 10,
				cost: 5
			}, 
			woodcutter = {
				name: "woodcutter",
				type: "action",
				image: "url('assets/cards/200px-Woodcutter.jpg')",
				count: 10,
				cost: 3
			}, 
			workshop = {
				name: "workshop",
				type: "action",
				image: "url('assets/cards/200px-Workshop.jpg')",
				count: 10,
				cost: 3
			}],
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
		supply.estate = 8;
		supply.duchy = 8;
		supply.province = 8;
		supply.curse = 10;
		supply.copper = 46;
		supply.kingdomCards[gardens.count] = 8;
	}
	if (game.players === 4) {
		supply.curse = 30;
		supply.copper = 32;
	}

	shuffle(supply.kingdomCards);
	supply.kingdomCards.pop();

	refreshSupply(supply);

	/* add copper, silver, and gold to supply
	for (i = 0; i < 60; i++) {
		game.supply.push("copper");
		if (i < 40) 
			game.supply.push("silver");
			if (i < 30) 
				game.supply.push("gold");
	}*/

	// add estates to supply
}

function createPlayer(){

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
function refreshSupply(supply) {
	for (i = 0; i < 10; i++){
		kingdomNum = "kingdom" + i;
		currentCard = supply.kingdomCards[i];
		document.getElementById(kingdomNum).style.backgroundImage = currentCard.image;
	}
}

// Refresh the players hand on screen
function refreshHand(player) {
	for (i = 0; i < 5; i++){
		handNum = "hand" + i;
		document.getElementById(handNum).style.backgroundImage = getImage(player.hand[i]);
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

//---------------------------------Get Card Info-----------------------------------------
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
         case "smithy":
         	 return "url('assets/cards/200px-Smithy.jpg')";
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

