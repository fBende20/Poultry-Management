document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expenseForm");
  const itemInput = document.getElementById("item");
  const amountInput = document.getElementById("amount");
  const expenseTable = document.getElementById("expenseTable").querySelector("tbody");
  const totalAmount = document.getElementById("totalAmount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function renderExpenses() {
    expenseTable.innerHTML = "";
    let total = 0;
    expenses.forEach((expense, index) => {
      total += parseFloat(expense.amount);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.item}</td>
        <td>₱${parseFloat(expense.amount).toFixed(2)}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
      `;
      expenseTable.appendChild(row);
    });
    totalAmount.textContent = total.toFixed(2);
  }

  window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const item = itemInput.value.trim();
    const amount = amountInput.value.trim();
    if (!item || !amount) return;

    expenses.push({ item, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();

    itemInput.value = "";
    amountInput.value = "";
  });

  renderExpenses();
});
