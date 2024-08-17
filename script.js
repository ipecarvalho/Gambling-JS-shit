let balance = 100;
const costPerRoll = 10;
const jackpotReward = 100;
let clickCount = 0;

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

function earnMoney() {
    clickCount++;
    balance += 10; // Earn money on click
    updateBalance();
    document.getElementById('click-count').textContent = clickCount;
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
