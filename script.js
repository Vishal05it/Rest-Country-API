let switchMode = document.querySelector("#switchMode");
let flagSect = document.querySelector("#flagSect");
let body = document.body;
let currDisplay = [];
let stIdx = 0;
let endIdx = 16;
let searchBar = document.querySelector("#searchBar");
let allCountry;
let showRegions = false;
let regionFilter = document.querySelector("#srchFilt");
let regions = document.querySelector("#srchFilt span div");
let oneRegion = document.querySelectorAll(".regions");
let allRgn = document.querySelector("#allRgn");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let page = 1;
let maxCpp = 16;
let totalPages;
oneRegion.forEach((x) => {
    x.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != "allRgn") {
            regionWiseFilter(allCountry, x.innerText);
        }
        else displayCountry(allCountry);
    })
})
function regionWiseFilter(country, region) {
    let regionArr = country.filter((y) => {
        return y.region.includes(region);
    })
    console.log(regionArr);
    displayCountry(regionArr);
}
window.addEventListener("load", () => {
    let countryData = async () => {
        let response = await fetch("https://backend-projects-bqbd.onrender.com/api.restcountry/v3/all");
        let countriesData = await response.json();
        console.log(countriesData.results);
        displayCountry(countriesData.results);
        allCountry = countriesData.results;
        totalPages = Math.ceil(allCountry.length / maxCpp);
        return countriesData.results;
    }
    countryData();
});
regionFilter.addEventListener("click", () => {
    if (!showRegions) {
        regions.style.display = "flex";
        showRegions = true;
    }
    else {
        showRegions = false;
        regions.style.display = "none";
    }
})
searchBar.addEventListener("input", () => {
    let searchVal = searchBar.value;
    console.log(searchVal);
    console.log(filterCountries(allCountry, searchVal));
})
function filterCountries(country, searchVal) {
    let filteredCountries = country.filter((x) => {
        return x.name.common.toLowerCase().includes(searchVal.toLowerCase());
    })
    displayCountry(filteredCountries);
}
switchMode.addEventListener("click", (e) => {
    e.preventDefault();
    let modeText = document.querySelector("#switchMode p");
    if (body.classList.contains("lightMode")) {
        body.classList.replace("lightMode", "darkMode");
        modeText.innerText = "Light Mode";
    }
    else {
        body.classList.replace("darkMode", "lightMode");
        modeText.innerText = "Dark Mode";
    }
})
function displayCountry(country) {
    currDisplay = country.slice(stIdx, endIdx);
    flagSect.innerHTML = "";
    currDisplay.forEach((x) => {
        let countryDiv = document.createElement("div");
        flagSect.append(countryDiv);
        countryDiv.innerHTML = `<div class="countryBox">
        <img src="${x.flags.png}" alt="Loading..." />
        <span
          ><h3>${x.name.common}</h3>
          <b>Population:</b> ${x.population} <br />
          <b>Region:</b> ${x.region} <br />
          <b>Capital:</b>${x.capital} <br />
        </span>
      </div>`
    });
}
prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Prev Btn clicked");
    if (page > 1) {
        stIdx -= maxCpp;
        endIdx -= maxCpp;
        page--;
        displayCountry(allCountry);
    }
})
nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Next Btn clicked");
    if (page < totalPages) {
        stIdx += maxCpp;
        endIdx += maxCpp;
        page++;
        displayCountry(allCountry);
    }
})