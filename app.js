let balance = 0;

function completeTask() {
  balance += 0.10;

  alert("Task completed! You earned $0.10.");

  document.querySelector(".balance h2").textContent =
    "$" + balance.toFixed(2);
}

function withdraw() {
  if (balance < 5) {
    alert("Minimum withdrawal is $5.00.");
    return;
  }

  alert("Withdrawal request submitted.");
}
