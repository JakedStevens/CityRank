$(document).ready(function () {
    $("#landing-window").show(); //show landing page
    $("#result-page").hide(); //results page hidden
    $("#slider-page").hide();//slider page hidden
    $("#hap-slider-status").hide();//hiding slider values
    $("#pol-slider-status").hide();
    $("#col-slider-status").hide();


    $("#start").on("click", function () {
        $("#slider-page").show();
        $("#landing-window").hide();
        $("#result-page").hide();
    })

    $("#results-button").on("click", function () {
        $("#result-page").show();
        $("#landing-window").hide();
        $("#slider-page").hide();
    })

    $("#back-btn1").on("click", function () {
        $("#result-page").hide();
        $("#landing-window").show();
        $("#slider-page").hide();
    })


    $("#back-btn2").on("click", function () {
        $("#result-page").hide();
        $("#landing-window").hide();
        $("#slider-page").show();
    })


rankedList = [
    { "Plano, TX": { "county": "Collin County", "happiness": 72.30, "affordability": 200000, "wellbeing": 7, "income_and_employment": 6, "community_and_environment": 8 } },
    { "Irvine, CA": { "county": "Orange County", "happiness": 71.86, "affordability": 200000, "wellbeing": 14, "income_and_employment": 11, "community_and_environment": 5 } },
    { "Madison, WI": { "county": "Dane County", "happiness": 71.81, "affordability": 200000, "wellbeing": 3, "income_and_employment": 14, "community_and_environment": 7 } },
    { "Fremont, CA": { "county": "Alameda County", "happiness": 71.17, "affordability": 200000, "wellbeing": 10, "income_and_employment": 37, "community_and_environment": 1 } },
    { "Huntington Beach, CA": { "county": "Orange County", "happiness": 69.74, "affordability": 200000, "wellbeing": 6, "income_and_employment": 46, "community_and_environment": 28 } },
    { "Fargo, ND": { "county": "Cass County", "happiness": 69.57, "affordability": 200000, "wellbeing": 17, "income_and_employment": 20, "community_and_environment": 24 } },
    { "Grand Prairie, TX": { "county": "Dallas County", "happiness": 69.30, "affordability": 200000, "wellbeing": 20, "income_and_employment": 35, "community_and_environment": 6 } },
    { "San Jose, CA": { "county": "Santa Clara County", "happiness": 68.90, "affordability": 200000, "wellbeing": 1, "income_and_employment": 18, "community_and_environment": 44 } },
    { "Scottsdale, AZ": { "county": "Maricopa County", "happiness": 68.24, "affordability": 200000, "wellbeing": 46, "income_and_employment": 13, "community_and_environment": 2 } },
    { "San Francisco, CA": { "county": "San Francisco County", "happiness": 67.53, "affordability": 200000, "wellbeing": 4, "income_and_employment": 2, "community_and_environment": 125 } }];

function writeResults (){
for (var i = 0; i <= rankedList.length; i++) {
    var cityProperties = Object.values(rankedList[i]);
    var cityName = Object.keys(rankedList[i])[0];
    var cityHappiness = cityProperties[0].happiness;
    var cityAfford = cityProperties[0].affordability;
    //console.log(cityName);
    //console.log("Happiness = ", cityHappiness);
    //console.log("Affordability = ", cityAfford);
    //console.log("Political = ", cityProperties[0].Political Something);

    
    var newRow = $(`<p> ${i+1}. ${cityName} </br> Happiness:  ${cityHappiness} </br> Median Home Price:  ${cityAfford} </p>`);
    $("#ranked-container").append(newRow);
    }
}
$("#results-button").on("click", writeResults);

});
//these three functions are reading the values of the sliders and storing them in a variable
var polVal;
var colVal;
var hapVal;
var userPrefs = {};
cr = new CityRank(Firebase.prototype.glennDbConfig);
function polSliderChange(val) {
    document.getElementById("pol-slider-status").innerHTML = val;
    polVal = Number(val);
    democratVal = (100 - polVal);
    console.log("Democrat Value = ", democratVal);
    console.log("Republican Value = ", polVal);
    userPrefs.politics = {"rep16_frac": polVal, "dem16_frac": democratVal};
}
function hapSliderChange(val) {
    document.getElementById("hap-slider-status").innerHTML = val;
    hapVal = val;
    console.log("Happiness Slider Value = ", hapVal);
    userPrefs.happiness = hapVal;
}
function colSliderChange(val) {
    document.getElementById("col-slider-status").innerHTML = val;
    colVal = val;
    console.log("Cost of Living Slider Value = ", colVal);
    userPrefs.affordability = colVal;
}
function rankCities() {
   
    let normalizedData = cr.normalizeData();
    cr.publishData(normalizedData);
    let rankedCities = cr.cityRank(userPrefs);
    console.log("ranked cities = ", rankedCities);
    console.log(rankedCities);
}
$("#results-button").on("click", rankCities);
