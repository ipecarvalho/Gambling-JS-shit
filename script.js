let balance = 500;
const costPerRoll = 20;
const jackpotReward = 10000;
const doubleReward = 50; // Increased reward for doubles in slots
const clickReward = 5; // Increased amount of money for Cookie Clicker
const rouletteReward = 100; // Increased reward for Roulette bets
const blackjackWinReward = 200; // Increased reward for Blackjack
const blackjackDealerWins = 1000; // Reward when dealer wins
let clickCount = 0;
let rouletteBetType = '';
let rouletteBetNumber = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];

// Initialize deck
function initializeDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ value, suit });
        });
    });
    deck = shuffleDeck(deck);
}

// Shuffle deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Draw card
function drawCard() {
    return deck.pop();
}

// Calculate hand value
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            aceCount++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value, 10);
        }
    });
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

// Update Blackjack hands display
function updateBlackjackDisplay() {
    const playerCards = playerHand.map(card => `${card.value} of ${card.suit}`).join(', ');
    const dealerCards = dealerHand.map(card => `${card.value} of ${card.suit}`).join(', ');
    document.getElementById('blackjack-result').innerHTML = `
        <p>Player's Hand: ${playerCards} (Value: ${calculateHandValue(playerHand)})</p>
        <p>Dealer's Hand: ${dealerCards} (Value: ${calculateHandValue(dealerHand)})</p>
    `;
}

// Start a new Blackjack game
function startBlackjack() {
    initializeDeck();
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    updateBlackjackDisplay();
}

// Blackjack hit
function hit() {
    if (playerHand.length === 0) return;
    playerHand.push(drawCard());
    updateBlackjackDisplay();
    const playerValue = calculateHandValue(playerHand);
    if (playerValue > 21) {
        document.getElementById('blackjack-result').innerHTML += `<p>Player busts! You lost $${blackjackDealerWins}.</p>`;
        balance -= blackjackDealerWins;
        updateBalance();
    }
}

// Blackjack stand
function stand() {
    if (playerHand.length === 0) return;
    let dealerValue = calculateHandValue(dealerHand);
    while (dealerValue < 17) {
        dealerHand.push(drawCard());
        dealerValue = calculateHandValue(dealerHand);
    }
    const playerValue = calculateHandValue(playerHand);
    updateBlackjackDisplay();
    if (playerValue > 21) {
        document.getElementById('blackjack-result').innerHTML += `<p>Player busts! You lost $${blackjackDealerWins}.</p>`;
        balance -= blackjackDealerWins;
    } else if (dealerValue > 21 || playerValue > dealerValue) {
        document.getElementById('blackjack-result').innerHTML += `<p>Player wins! You won $${blackjackWinReward}.</p>`;
        balance += blackjackWinReward;
    } else if (playerValue < dealerValue) {
        document.getElementById('blackjack-result').innerHTML += `<p>Dealer wins! You lost $${blackjackDealerWins}.</p>`;
        balance -= blackjackDealerWins;
    } else {
        document.getElementById('blackjack-result').innerHTML += `<p>It's a tie!</p>`;
    }
    updateBalance();
}

// Spin Roulette
function spinRoulette() {
    if (balance < 10) {
        document.getElementById('roulette-result').textContent = "You don't have enough money to spin.";
        return;
    }
    balance -= 10;
    updateBalance();

    const number = Math.floor(Math.random() * 38);
    let resultText = `The wheel landed on ${number === 37 ? '00' : number}. `;

    if (rouletteBetType === 'red' && (number % 2 === 0 && number !== 0 && number !== 37)) {
        balance += rouletteReward;
        resultText += `You won $${rouletteReward} on Red!`;
    } else if (rouletteBetType === 'black' && number % 2 !== 0 && number !== 0 && number !== 37) {
        balance += rouletteReward;
        resultText += `You won $${rouletteReward} on Black!`;
    } else if (rouletteBetType === 'green' && (number === 0 || number === 37)) {
        balance += rouletteReward * 2.5; // Higher reward for Green
        resultText += `You won $${rouletteReward * 2.5} on Green!`;
    } else if (rouletteBetType === 'even' && number % 2 === 0 && number !== 0 && number !== 37) {
        balance += rouletteReward;
        resultText += `You won $${rouletteReward} on Even!`;
    } else if (rouletteBetType === 'odd' && number % 2 !== 0 && number !== 0 && number !== 37) {
        balance += rouletteReward;
        resultText += `You won $${rouletteReward} on Odd!`;
    } else if (rouletteBetType === 'number' && number === rouletteBetNumber) {
        balance += 100;
        resultText += `You won $100 on number ${rouletteBetNumber}!`;
    } else {
        resultText += "You lost.";
    }
    updateBalance();
    document.getElementById('roulette-result').textContent = resultText;
}

// Place Roulette Bet
function placeRouletteBet(betType) {
    rouletteBetType = betType;
    if (betType === 'number') {
        const number = parseInt(document.getElementById('number-bet').value, 10);
        if (number >= 0 && number <= 37) {
            rouletteBetNumber = number;
        } else {
            alert("Please enter a valid number between 0 and 37.");
        }
    }
}

// Earn Money (Cookie Clicker)
function earnMoney() {
    clickCount++;
    balance += clickReward;
    updateBalance();
    document.getElementById('click-count').textContent = clickCount;
}

// Update Balance Display
function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('rouletteBetType', rouletteBetType);
    localStorage.setItem('rouletteBetNumber', rouletteBetNumber);
    alert('Game saved!');
}

// Load game state from localStorage
function loadGame() {
    balance = parseFloat(localStorage.getItem('balance')) || 100;
    clickCount = parseInt(localStorage.getItem('clickCount'), 10) || 0;
    rouletteBetType = localStorage.getItem('rouletteBetType') || '';
    rouletteBetNumber = parseInt(localStorage.getItem('rouletteBetNumber'), 10) || 0;
    updateBalance();
    document.getElementById('click-count').textContent = clickCount;
    alert('Game loaded!');
}

// Reset game state
function resetGame() {
    localStorage.clear();
    balance = 100;
    clickCount = 0;
    rouletteBetType = '';
    rouletteBetNumber = 0;
    updateBalance();
    document.getElementById('click-count').textContent = clickCount;
    alert('Game reset!');
}

// Initial load
window.onload = function() {
    loadGame();
};
