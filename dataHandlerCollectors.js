'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({ checkType: true })
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function () {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  }
  else return {};
}
//getUILabelsLang inte i LogicPlus
Data.prototype.getUILabelsLang = function (lang = "en") {
  var ui = require("./data/collectors-" + lang + ".json");
  return ui;
}


Data.prototype.createRoom = function (roomId, playerCount, lang = "en") {
  let room = {};
  room.players = {};
  room.lang = lang;
  room.actingPlayer = null;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.round = 1;
  room.playOrder = [];
  room.playOrderNextRound = [];

  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  room.upForAuction = {};
  room.leadingBid = 0;
  room.market = [];
  this.resetPlacements(room);
  this.rooms[roomId] = room;
}

Data.prototype.resetPlacements = function (room) {
  room.buyPlacement = [{ cost: 1, playerId: null, id: 0 },
  { cost: 1, playerId: null, id: 0 }, //1
  { cost: 2, playerId: null, id: 1 }, //2
  { cost: 2, playerId: null, id: 1 }, //3
  { cost: 3, playerId: null, id: 2 }]; //4
  room.skillPlacement = [{ cost: 0, playerId: null, id: 3 }, //0
  { cost: 0, playerId: null, id: 3 }, //1
  { cost: 0, playerId: null, id: 3 }, //2
  { cost: 1, playerId: null, id: 4 }, //3
  { cost: 1, playerId: null, id: 4 }]; //4
  room.auctionPlacement = [{ cost: -2, playerId: null, id: 5 }, //0
  { cost: -1, playerId: null, id: 6 }, //1
  { cost: 0, playerId: null, id: 7 }, //2
  { cost: 0, playerId: null, id: 7 }]; //3
  room.marketPlacement = [{ cost: 0, playerId: null, id: 8 }, //0
  { cost: -2, playerId: null, id: 9 }, //1
  { cost: 0, playerId: null, id: 10 }]; //2
  room.workPlacement = [{ cost: 0, playerId: null, id: 0 },
  { cost: -1, playerId: null, id: 1 },
  { cost: -2, playerId: null, id: 2 },
  { cost: -3, playerId: null, id: 3 },
  { cost: -1, playerId: null, id: 4 },
  { cost: 1, playerId: null, id: 5 },
  { cost: 0, playerId: null, id: 6 },
  { cost: 0, playerId: null, id: 7 }];
}

Data.prototype.createDeck = function () {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}

Data.prototype.joinGame = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    if (typeof room.players[playerId] !== 'undefined') {
      console.log("Player", playerId, "joined again with info", room.players[playerId]);
      return true;
    }
    else if (Object.keys(room.players).length < room.playerCount) {
      console.log("Player", playerId, "joined for the first time");
      room.players[playerId] = {
        hand: [],
        money: 2,
        bottles: 2, //inte i LogicPlus
        points: 0,
        bottleIncome: 2,
        bottleSlots: new Set(),
        currentBid: 0,
        inAuction: true,
        skills: [],
        items: [],
        income: 3,
        //income: [],
        cardIncome: 3, 
        secret: []
      };
      //nytt
      room.players[playerId].hand.push(...room.deck.splice(0,3));
      room.playOrder.push(playerId);
      if (Object.keys(room.players).length === room.playerCount) {
        shuffle(room.playOrder);
        let i = 0;
        for (let playerId of room.playOrder) {
          room.players[playerId].money += i;
          room.players[playerId].bottleSlots.add(0)
          room.players[playerId].bottleSlots.add(1)
          i += 1;
        }
        room.playOrderNextRound = [...room.playOrder];
        room.actingPlayer = 0;
      }
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");
  }
  return false;
}

Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  }
  else return {};
}

Data.prototype.updatePoints = function (roomId, player, points) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.points[player] += points;
    return room.points;
  }
  else return {};
}

/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  }
  else return [];
}

/* moves card from itemsOnSale to a player's hand and subtracts the corresponding cost from the player 
heter buyItem i LogicPlus
*/
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.itemsOnSale[i].x === card.x &&
        room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;
    this.nextPlayer(roomId); //nytt
  }
}

/* moves card from skillsOnSale to a player's hand */
Data.prototype.skillsCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].skills.push(...c);
    room.players[playerId].money -= cost;

  }
//nedanstående ej med i LogicPlus
  if (card.skill === "bottle") {
    room.players[playerId].bottles += 1;
  }
}
Data.prototype.initiateAuction = function (roomId, playerId, card) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      if (room.auctionCards[i].x === card.x &&
        room.auctionCards[i].y === card.y) {
        let auc = room.auctionCards.splice(i, 1, {});
        room.upForAuction = auc[0];
        break;
      }
    }
  }
}
Data.prototype.passBidding = function (roomId, playerId, card) {
  let room = this.rooms[roomId]
  let playersInAuction = 0
  if (typeof room !== 'undefined') {
    room.players[playerId].inAuction === false;
    let auc = room.upForAuction;
    let highestBidId = playerId;
    
    for (let i in room.players) {
      if (room.players[i].currentBid === room.leadingBid) {
        highestBidId = i;
        
      }
      if (room.players[i].inAuction === true) {
        playersInAuction += 1;
      }
    }
    if (playersInAuction === 1) {
      room.players[highestBidId].hand.push(auc);
      room.upForAuction = {};
      
    }
    console.log("playerId and card", highestBidId, auc)
  }
}

Data.prototype.currentBid = function (roomId, playerId, currentBid) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].currentBid = currentBid;
    for (let i in room.players) {
      if (room.leadingBid < room.players[i].currentBid) {
        room.leadingBid = room.players[i].currentBid;
      }
    }
  }
  console.log(room.leadingBid, currentBid)
}


Data.prototype.getUpForAuction = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.upForAuction;
  }
  else return {};
}

//nytt 
Data.prototype.addToMarket = function (roomId, playerId, cards, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    for (let c in cards) {
      /// check first if the card is among the last in skills on sale
      for (let i = room.skillsOnSale.length-1; i >=0 ; i -= 1) {
        if (typeof room.skillsOnSale[i].x !== 'undefined') {
          // since card comes from the client, it is NOT the same object (reference)
          // so we need to compare properties for determining equality
          if (room.skillsOnSale[i].x === cards[c].x && 
              room.skillsOnSale[i].y === cards[c].y) {
            c = room.skillsOnSale.splice(i,1, {});
          }
          break; //we don't want to check more than the last cards[c]
        }
      }
      // ...then check if it is in the auction
      for (let i = room.auction.length-1; i >=0 ; i -= 1) {
        if (typeof room.auction[i].x !== 'undefined') {
          // since cards[c] comes from the client, it is NOT the same object (reference)
          // so we need to compare properties for determining equality
          if (room.auction[i].x === cards[c].x && 
              room.auction[i].y === cards[c].y) {
            c = room.auction.splice(i,1, {});
          }
          break; //we don't want to check more than the last cards[c]
        }
      }
      // ...finally check if it is in the hand. It cannot be in both so it's safe
      for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
        // since cards[c] comes from the client, it is NOT the same object (reference)
        // so we need to compare properties for determining equality      
        if (room.players[playerId].hand[i].x === cards[c].x && 
            room.players[playerId].hand[i].y === cards[c].y) {
          c = room.players[playerId].hand.splice(i,1);
          break;
        }
      }
      room.market.push(...c);
    }
    room.players[playerId].money -= cost;
    
  }
}

//förändring
Data.prototype.placeBottle = function (roomId, playerId, action, id) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let cost = 0;
    if (action === "work") {
      cost = this.handleWorkActions(room, playerId, id);
    }
    else {
    let activePlacement = [];
    if (action === "buy") {
      activePlacement = room.buyPlacement;
    }
    else if (action === "skill") {
      activePlacement = room.skillPlacement;
    }
    else if (action === "auction") {
      activePlacement = room.auctionPlacement;
    }
    else if (action === "market") {
      activePlacement = room.marketPlacement;
    }
    for (let i = 0; i < activePlacement.length; i += 1) {
      if (activePlacement[i].id === id &&
        activePlacement[i].playerId === null) {
          cost = activePlacement[i].cost;
        activePlacement[i].playerId = playerId;
        break;
      }
    }
  }

    room.players[playerId].money -= cost;
 
}
}
//nytt
Data.prototype.handleWorkActions = function (room, playerId, id) {
  let player = room.players[playerId];
  if (id <= 2) {
    // note: player should discard two cards to move to income
  }
  else if (id <= 4) {
    player.bottles -= 1;
  }
  else if (id === 5) {
    let cards = room.deck.splice(0,2);
    player.hand.push(...cards);
  }
  else if (id === 6) {
    let card = room.deck.pop();
    player.hand.push(card);   
    for (let i in room.playOrder) {
      if (room.playOrder[i] === playerId) {
        room.playOrderNextRound.unshift(...room.playOrderNextRound.splice(i,1));
        break;
      }
    }
  }
  else if (id === 7) {
    let card = room.deck.pop();
    player.hand.push(card);
    // note: player should also discard a card to move to income
  }
  for (let wp of room.workPlacement) {
    if(wp.id === id) {
      wp.playerId = playerId;
      return wp.cost;
    }
  }
  return 0;
}
Data.prototype.cardForIncome = function(roomId, playerId, card) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x && 
          room.players[playerId].hand[i].y === card.y) {
        room.players[playerId].hand.splice(i,1);
        room.players[playerId].income += 1;
        break;
      }
    }
    return room.players;
  }
  return {};
}

Data.prototype.returnBottle = function(roomId, playerId, slot) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bottleSlots.push(slot);
    return room.players[playerId].bottleSlots;
  }
  return [];
}

Data.prototype.getPlayOrder = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.playOrder;
  }
  return [];
}
Data.prototype.nextPlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.actingPlayer = (room.actingPlayer + 1) % room.playerCount;
    console.log("next Player", room.actingPlayer)
    return room.actingPlayer;
  }
  return null;
}

Data.prototype.getActingPlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.actingPlayer;
  }
  return null;
}

Data.prototype.nextRound = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.round += 1;
    room.playOrder = room.playOrderNextRound;
    this.resetPlacements(room);
    for (let player of room.players) {
      for (let i = 0; i < player.bottleIncome; i += 1) {
        player.bottleSlots.add(i);
      }
    }
  }
}

Data.prototype.adjustBottle = function (roomId, playerId, oldPos, newPos) {
  player.bottleSlots.delete(oldPos);
  player.bottleSlots.add(newPos);
}

Data.prototype.getRound = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.round;
  }
  return [];
}



/* returns the hand of the player */
Data.prototype.getCards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let i = room.players.map(d => d.playerId).indexOf(playerId)
    return room.players[i].hand;
  }
  else return [];
}
/*
Data.prototype.getCards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.players[playerId].hand;
  }
  return [];
}*/

Data.prototype.getPlacements = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return {
      buyPlacement: room.buyPlacement,
      skillPlacement: room.skillPlacement,
      auctionPlacement: room.auctionPlacement,
      marketPlacement: room.marketPlacement,
      workPlacement: room.workPlacement
    }
  }
  else return {};
}

Data.prototype.getItemsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.itemsOnSale;
  }
  else return [];
}

Data.prototype.getMarketValues = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let mv = {
      fastaval: 0,
      movie: 0,
      technology: 0,
      figures: 0,
      music: 0
    };
//for (let card of room.market) byt ut cardIndex mot card
    for (let cardIndex in room.market) {
      mv[room.market[cardIndex].market] += 1;
    }
    return mv;
  }
  else return [];
}

Data.prototype.cardValue = function (roomId) {
  var fastaval = 0;
  var figures = 0;
  var music = 0;
  var movie = 0;
  var technology = 0;
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    for (let i = 0; i < room.marketValues.length; i += 1) {
      if (room.marketValues[i].market == "fastaval") {
        fastaval += 1;
      } else if (room.marketValues[i].market == "figures") {
        figures += 1;
      } else if (room.marketValues[i].market == "music") {
        music += 1;
      } else if (room.marketValues[i].market == "movie") {
        movie += 1;
      } else if (room.marketValues[i].market == "technology") {
        technology += 1;
      }
    }
    return {
      fastaval: fastaval,
      figures: figures,
      music: music,
      movie: movie,
      technology: technology,
    }
  } else {
    return [];
  }
}
//komm bort under?
Data.prototype.getMarket = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.market;
  }
  else return [];
}

Data.prototype.getSkillsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.skillsOnSale;
  }
  else return [];
}

Data.prototype.getAuctionCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionCards;
  }
  else return [];
}

Data.prototype.getLeadingBid = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.leadingBid;
  }
  else return []; //eller 0 för att försäkra sig om att det alltid kommer vara mindre än leading
}
//nytt
Data.prototype.addMoney = function(roomId, playerId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].money +=1;
    return room.players;
  }
  return {};
}

module.exports = Data;