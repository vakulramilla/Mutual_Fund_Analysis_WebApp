let chart;

async function fetchFunds() {
  const res = await fetch("https://api.mfapi.in/mf");
  const data = await res.json();
  const selector = document.getElementById("fundSelector");

  data.slice(0, 50).forEach(fund => {
    const option = document.createElement("option");
    option.value = fund.schemeCode;
    option.textContent = fund.schemeName;
    selector.appendChild(option);
  });
}

async function loadFundData() {
  const code = document.getElementById("fundSelector").value;
  const res = await fetch(`https://api.mfapi.in/mf/${code}`);
  const data = await res.json();

  document.getElementById("fundDetails").innerHTML = `
    <h2>${data.meta.scheme_name}</h2>
    <p>Fund House: ${data.meta.fund_house}</p>
    <p>Latest NAV: ₹${data.data[0].nav} on ${data.data[0].date}</p>
  `;

  const labels = data.data.slice(0, 30).map(d => d.date).reverse();
  const navs = data.data.slice(0, 30).map(d => parseFloat(d.nav)).reverse();

  if (chart) chart.destroy();
  const ctx = document.getElementById("navChart").getContext("2d");
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'NAV Over Time',
        data: navs,
        borderColor: '#00796b',
        backgroundColor: 'rgba(0,121,107,0.2)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'NAV (₹)' } }
      }
    }
  });
}

fetchFunds();
