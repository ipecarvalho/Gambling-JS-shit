// script.js

let balance = 100;
const costPerRoll = 10;
const jackpotReward = 100;
const rouletteBet = 10;
const blackjackBet = 10;
let clickCount = 0;
let rouletteChoice = null;
let numberChoice = null;

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tabContent => {
        tabContent.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function rollSlot() {
    const symbols = ["🍒", "🍋", "🔔", "🍇", "💎", "7️⃣"];
    if (balance < costPerRoll) {
        document.getElementById('slot-result').textContent = "You don't have enough money to roll.";
        return;
    }
    balance -= costPerRoll;
    updateBalance();
    const roll1 = symbols[Math.floor(Math.random() * symbols.length)];
    const roll2 = symbols[Math.floor(Math.random() * symbols.length)];
    const roll3 = symbols[Math.floor(Math.random() * symbols.length)];
    document.getElementById('slots').textContent = `| ${roll1} | ${roll2} | ${roll3} |`;
    const result = document.getElementById('slot-result');
    if (roll1 === roll2 && roll2 === roll3) {
        balance += jackpotReward;
        result.textContent = `🎉 JACKPOT! You won $${jackpotReward}!`;
    } else {
        result.textContent = "Better luck next time!";
    }
    updateBalance();
}

function placeRouletteBet(type) {
    rouletteChoice = type;
    const numberBetInput = document.getElementById('number-bet').value;
    if (type === 'number' && numberBetInput) {
        numberChoice = parseInt(numberBetInput);
    } else {
        numberChoice = null;
    }
    document.getElementById('roulette-result').textContent = `You bet on ${rouletteChoice === 'number' ? numberChoice : rouletteChoice}.`;
}

function spinRoulette() {
    if (balance < rouletteBet) {
        document.getElementById('roulette-result').textContent = "You don't have enough money to bet.";
        return;
    }
    balance -= rouletteBet;
    updateBalance();
    const outcome = Math.floor(Math.random() * 38);
    let resultText = '';
    if (outcome === 37) {
        resultText = "00 (Green)";
    } else if (outcome === 0) {
        resultText = "0 (Green)";
    } else {
        resultText = `${outcome} (${outcome % 2 === 0 ? 'Even' : 'Odd'}, ${outcome <= 18 ? 'Black' : 'Red'})`;
    }
    const result = document.getElementById('roulette-result');
    if (rouletteChoice === 'red' && outcome >= 19 && outcome <= 36) {
        balance += rouletteBet * 2;
        result.textContent = `You bet on Red. The outcome was ${resultText}. You won!`;
    } else if (rouletteChoice === 'black' && outcome >= 1 && outcome <= 18) {
        balance += rouletteBet * 2;
        result.textContent = `You bet on Black. The outcome was ${resultText}. You won!`;
    } else if (rouletteChoice === 'green' && outcome === 0) {
        balance += rouletteBet * 15;
        result.textContent = `You bet on Green. The outcome was ${resultText}. You won!`;
    } else if (rouletteChoice === 'number' && numberChoice === outcome) {
        balance += rouletteBet * 35;
        result.textContent = `You bet on number ${numberChoice}. The outcome was ${resultText}. You won!`;
    } else {
        result.textContent = `The outcome was ${resultText}. You lost.`;
    }
    updateBalance();
}

function hit() {
    // Implement blackjack hit logic
}

function stand() {
    // Implement blackjack stand logic
}

function earnMoney() {
    clickCount++;
    balance += 10;
    document.getElementById('click-count').textContent = clickCount;
    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
