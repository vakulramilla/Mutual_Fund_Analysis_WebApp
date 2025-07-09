function calculateSIP() {
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const months = parseInt(document.getElementById('months').value);
  let total = 0;

  for (let i = 0; i < months; i++) {
    total += amount * Math.pow(1 + rate / 12, months - i);
  }

  document.getElementById('result').textContent = `Total Return: ₹${total.toFixed(2)}`;
}

