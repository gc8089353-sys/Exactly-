const SUPABASE_URL = "https://mpbfkvholuzfcjqqeczv.supabase.co";
const SUPABASE_KEY = "sb_publishable_KQPhP4j0Yt7uCjMIm0SsLg_GaQc8lG6";
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
let balance = 0;
let history = [];

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login successful!");
  updateBalance();
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
  const amount = parseFloat(
    document.getElementById("withdrawAmount").value
  );

  const phone = document.getElementById("mpesaNumber").value.trim();
  const name = document.getElementById("accountName").value.trim();

  if (isNaN(amount) || amount < 5) {
    alert("Minimum withdrawal is $5.00.");
    return;
  }

  if (amount > balance) {
    alert("Insufficient balance.");
    return;
  }

  if (phone === "" || name === "") {
    alert("Please enter your M-Pesa number and account name.");
    return;
  }

  alert(
    "Withdrawal request received for $" +
    amount.toFixed(2) +
    ". It is awaiting processing."
  );
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
