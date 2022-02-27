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
      totalCasesField.innerText = `+${data.cases / 1000}k`;
      totalRecoveredField.innerText = `+${data.recovered / 1000}k`;
      totalDeathsField.innerText = `+${data.deaths / 1000}k`;
    } else {
      totalCasesField.innerText = `+${data.todayCases / 1000}k`;
      totalRecoveredField.innerText = `+${data.todayRecovered / 1000}k`;
      totalDeathsField.innerText = `+${data.todayDeaths / 1000}k`;
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
