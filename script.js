let balance = 100;
const costPerRoll = 10;
const jackpotReward = 100;
const doubleReward = 20; // Reward for doubles in slots
const clickReward = 5; // Reduced amount of money for Cookie Clicker
let clickCount = 0;
let rouletteBetType = '';
let rouletteBetNumber = 0;

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
    } else if (roll1 === roll2 || roll2 === roll3 || roll1 === roll3) {
        balance += doubleReward;
        result.textContent = `🎉 DOUBLE! You won $${doubleReward}!`;
    } else {
        result.textContent = "Better luck next time!";
    }
    updateBalance();
}

function spinRoulette() {
    if (balance < 10) { // Minimum bet amount
        document.getElementById('roulette-result').textContent = "You don't have enough money to spin.";
        return;
    }
    balance -= 10; // Cost to spin
    updateBalance();

    const number = Math.floor(Math.random() * 38); // 0-37, where 37 represents double 00
    let resultText = `The wheel landed on ${number === 37 ? '00' : number}. `;

    if (rouletteBetType === 'red' && (number % 2 === 0 && number !== 0 && number !== 37)) {
        balance += 20;
        resultText += "You won $20 on Red!";
    } else if (rouletteBetType === 'black' && number % 2 !== 0 && number !== 0 && number !== 37) {
        balance += 20;
        resultText += "You won $20 on Black!";
    } else if (rouletteBetType === 'green' && (number === 0 || number === 37)) {
        balance += 50;
        resultText += "You won $50 on Green!";
    } else if (rouletteBetType === 'even' && number % 2 === 0 && number !== 0 && number !== 37) {
        balance += 20;
        resultText += "You won $20 on Even!";
    } else if (rouletteBetType === 'odd' && number % 2 !== 0 && number !== 0 && number !== 37) {
        balance += 20;
        resultText += "You won $20 on Odd!";
    } else if (rouletteBetType === 'number' && number === rouletteBetNumber) {
        balance += 100;
        resultText += `You won $100 on number ${rouletteBetNumber}!`;
    } else {
        resultText += "You lost.";
    }
    updateBalance();
    document.getElementById('roulette-result').textContent = resultText;
}

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

function hit() {
    // Blackjack hit logic
    document.getElementById('blackjack-result').textContent = "You hit!";
}

function stand() {
    // Blackjack stand logic
    document.getElementById('blackjack-result').textContent = "You stood!";
}

function earnMoney() {
    clickCount++;
    balance += clickReward; // Reduced amount of money for Cookie Clicker
    updateBalance();
    document.getElementById('click-count').textContent = clickCount;
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
