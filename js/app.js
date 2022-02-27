const loadWorldApi = () => {
  const url = "https://disease.sh/v3/covid-19/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWorldStats(data));
};

const displayWorldStats = (data) => {
  function updateData(caseId, recoverId, deathsId, isWorldWide) {
    const totalCasesField = document.getElementById(caseId);
    const totalRecoveredField = document.getElementById(recoverId);
    const totalDeathsField = document.getElementById(deathsId);

    if (isWorldWide == true) {
      totalCasesField.innerText = `+${(data.cases / 1000).toFixed(2)}k`;
      totalRecoveredField.innerText = `+${(data.recovered / 1000).toFixed(2)}k`;
      totalDeathsField.innerText = `+${(data.deaths / 1000).toFixed(2)}k`;
    } else {
      totalCasesField.innerText = `+${(data.todayCases / 1000).toFixed(2)}k`;
      totalRecoveredField.innerText = `+${(data.todayRecovered / 1000).toFixed(
        2
      )}k`;
      totalDeathsField.innerText = `+${(data.todayDeaths / 1000).toFixed(2)}k`;
    }
  }
  // Worldwide Total Stats
  updateData("w-t-cases", "w-t-recovered", "w-t-deaths", true);

  // Worldwide Todays's Stats
  updateData("today-cases", "today-recovered", "today-deaths", false);
};

const loadBangladeshApi = () => {
  const url = "https://disease.sh/v3/covid-19/countries/Bangladesh?strict=true";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWorldStats(data));
};
loadBangladeshApi();
document.getElementById("bangladesh").addEventListener("click", () => {
  document.getElementById("worldwide").classList.remove("active");
  document.getElementById("bangladesh").classList.add("active");
});
document.getElementById("worldwide").addEventListener("click", () => {
  document.getElementById("bangladesh").classList.remove("active");
  document.getElementById("worldwide").classList.add("active");
});

// Live Stats by Country
const loadAllCountriesApi = () => {
  const url =
    "https://disease.sh/v3/covid-19/countries/USA%2CBrazil%2CIndia%2CRussia%2CSouth%20Africa%2CPeru%2CMexico%2CChile%2CPakistan%2CUK";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayByCountry(data));
};
const displayByCountry = (datas) => {
  datas.forEach((data) => {
    const country = data.country;
    const cases = data.cases;
    const recovered = data.recovered;
    const deaths = data.deaths;
    const tableBody = document.getElementById("table-body");
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <th scope="row">${country}</th>
      <td>+${(cases / 1000).toFixed(2)}k</td>
      <td>+${(recovered / 1000).toFixed(2)}k</td>
      <td>+${(deaths / 1000).toFixed(2)}k</td>
      `;
    tableBody.appendChild(tableRow);
  });
};
loadAllCountriesApi();
