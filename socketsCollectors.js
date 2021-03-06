function sockets(io, socket, data) {
  socket.on('setupCollectors', function (d) {
    data.createRoom(d.roomId, d.playerCount, d.lang);
  });
  socket.on('getLabels', function (lang) {
    socket.emit('languageLabels',
      data.getUILabelsLang(lang));
  }
  );
  socket.on('collectorsLoaded', function (d) {
    socket.join(d.roomId);
    if (data.joinGame(d.roomId, d.playerId)) {
      socket.emit('collectorsInitialize', {
        labels: data.getUILabels(d.roomId),
        players: data.getPlayers(d.roomId),
        itemsOnSale: data.getItemsOnSale(d.roomId),
        marketValues: data.getMarketValues(d.roomId),
        market: data.getMarket(d.roomId),
        placements: data.getPlacements(d.roomId),
        playOrder: data.getPlayOrder(d.roomId),
        actingPlayer: data.getActingPlayer(d.roomId),
        round: data.getRound(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        placements: data.getPlacements(d.roomId)
      }
      );
    }
  });
  socket.on('collectorsDrawCard', function (d) {
    io.to(d.roomId).emit('collectorsUpdatePlayers', // collectorsCardDrawn
      data.drawCard(d.roomId, d.playerId)
    );
  });
  socket.on('collectorsCardForIncome', function (d) {
    io.to(d.roomId).emit('collectorsUpdatePlayers',
      data.cardForIncome(d.roomId, d.playerId, d.card)
    );
  });
  socket.on('collectorsNextPlayer', function (d) {
    io.to(d.roomId).emit('collectorsActingPlayer', {
      players: data.getPlayers(d.roomId),
      actingPlayer: data.nextPlayer(d.roomId)
    }
    );
  });
  socket.on('collectorsBuyCard', function (d) {
    data.buyCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsCardBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      itemsOnSale: data.getItemsOnSale(d.roomId),
      actingPlayer: data.getActingPlayer(d.roomId)
    }
    );
  });
  socket.on('collectorsSkillsCard', function (d) {
    data.skillsCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsSkillBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId)
    }
    );
  });
  socket.on('collectorsMarketCard', function (d) {
    data.marketEvent(d.roomId, d.playerId, d.card, d.cost) //d.cost bort?
    io.to(d.roomId).emit('collectorsMarketStarted', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      skillsCard: data.getSkillsOnSale(d.roomId)
    }
    );
  });
  socket.on('collectorsAuctionCard', function (d) {
    data.initiateAuction(d.roomId, d.playerId, d.card)
    io.to(d.roomId).emit('collectorsAuctionStarted', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      upForAuction: data.getUpForAuction(d.roomId)
    }
    );
  });
  socket.on('collectorsCurrentBid', function (d) {
    data.currentBid(d.roomId, d.playerId, d.currentBid)
    io.to(d.roomId).emit('collectorsCurrentBidStarted', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      leadingBid: data.getLeadingBid(d.roomId)
    }
    );
  });
  socket.on('collectorsPassBidding', function (d) {
    data.passBidding(d.roomId, d.playerId, d.upForAuction)
    io.to(d.roomId).emit('collectorsPassStarted', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      upForAuction: data.getUpForAuction(d.roomId)
    }
    );
  }
  );
socket.on('collectorsPlaceBottle', function (d) {
  data.placeBottle(d.roomId, d.playerId, d.action, d.id);
  io.to(d.roomId).emit('collectorsBottlePlaced', {
    players: data.getPlayers(d.roomId),
    placements: data.getPlacements(d.roomId),
    playOrder: data.getPlayOrder(d.roomId),
    actingPlayer: data.getActingPlayer(d.roomId)
  }
  );
});
socket.on('collectorsAddMoney', function (d) {
  io.to(d.roomId).emit('collectorsUpdatePlayers',
    data.addMoney(d.roomId, d.playerId)
  );
});
}
module.exports = sockets;
