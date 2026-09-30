let balance = 0;

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

  loadBalance();
}

function loadBalance() {
  const savedBalance = localStorage.getItem("balance");

  if (savedBalance !== null) {
    balance = parseFloat(savedBalance);
  }

  updateBalance();
}

function completeTask(amount = 0.10) {
  balance += amount;

  localStorage.setItem("balance", balance.toFixed(2));

  updateBalance();

  alert("Task completed! You earned $" + amount.toFixed(2));
}

function updateBalance() {
  document.getElementById("balance").textContent =
    "$" + balance.toFixed(2);
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
    loadBalance();
  }
};
