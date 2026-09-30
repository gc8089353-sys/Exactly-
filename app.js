let balance = 0;
let history = [];

function login() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Please enter a username.");
    return;
  }

  localStorage.setItem("username", username);

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("appBox").style.display = "block";
  document.getElementById("userName").textContent = username;

  loadData();
}

function loadData() {
  const savedBalance = localStorage.getItem("balance");
  const savedHistory = localStorage.getItem("history");

  balance = savedBalance ? parseFloat(savedBalance) : 0;
  history = savedHistory ? JSON.parse(savedHistory) : [];

  updateBalance();
  displayHistory();
}

function completeTask(amount = 0.10) {
  balance += amount;

  const entry = {
    amount: amount,
    time: new Date().toLocaleString()
  };

  history.unshift(entry);

  localStorage.setItem("balance", balance.toFixed(2));
  localStorage.setItem("history", JSON.stringify(history));

  updateBalance();
  displayHistory();

  alert("Task completed! You earned $" + amount.toFixed(2));
}

function updateBalance() {
  document.getElementById("balance").textContent =
    "$" + balance.toFixed(2);
}

function displayHistory() {
  const historyBox = document.getElementById("history");

  if (history.length === 0) {
    historyBox.innerHTML = "<p>No earnings yet.</p>";
    return;
  }

  historyBox.innerHTML = "";

  history.forEach(function(entry) {
    const item = document.createElement("p");

    item.textContent =
      "💰 Earned $" +
      entry.amount.toFixed(2) +
      " — " +
      entry.time;

    historyBox.appendChild(item);
  });
}

function withdraw() {
  if (balance < 5) {
    alert("Minimum withdrawal is $5.00.");
    return;
  }

  alert("Withdrawal request feature will be connected later.");
}

function logout() {
  localStorage.removeItem("username");

  document.getElementById("appBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

window.onload = function () {
  const savedUsername = localStorage.getItem("username");

  if (savedUsername) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("appBox").style.display = "block";
    document.getElementById("userName").textContent = savedUsername;

    loadData();
  }
};
