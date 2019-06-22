var birthdate = "";
var items = [];

$("body").on("click", "#submit", function () {
    birthdate = $("form input").val();
    console.log(birthdate);
    var valid = birthdate.search(/....-..-../);

    if ( valid == 0 ){

    var userYear = moment(birthdate).year();
    var userMonth = moment(birthdate).month() + 1;
    var userDay = moment(birthdate).date();

    // if ( birthdate == "" || userYear == "" || userMonth == "" || userDay == "" ){
    //     $("#error").css("display", "block");
    // } else {

    var date = new Date();
    var year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var day = date.getDate();

    if(userYear > year){
        $("#error").css("display", "block");
    } else if(userYear == year && userMonth > Month) {
        $("#error").css("display", "block");
    } else if (userYear == year && userMonth == Month && userDay > day){
        $("#error").css("display", "block");
    } else {
        $("#error").css("display", "none");
        $("#bdayQuestion").css("display", "none");
        $('#cards').css('display', 'block');
        $("#reset").css("display", "block");

        // ajax for gifs starts here
        var link2 = "https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=asteroid&limit=20&offset=0&rating=G&lang=en"
        $.ajax({
            url: link2,
            method: "GET"
        }).then(function(res){
            $("#nasaCard").empty();
            var ajaxNum = Math.floor(Math.random() * 20);
            var gif = res.data[ajaxNum].images.fixed_width.url;
            var newImg = $("<img>").attr("src", gif);
            newImg.attr("id", "image")
            $("#nasaCard").append(newImg);
        })
        // ajax for gifs ends here

    }
} else {
    $("#error").css("display", "block");

}
})

$("body").on("click", "#usgsCard", function () {
    earthquakes(birthdate);
})
function earthquakes(date) {
    $("#bdayQuestion").css("display", "none");
    $("#cards").css("display", "none");
    $("#ajaxResults").css("display", "block");
    $("#back").css("display", "block");
    $("#reset").css("display", "block");
      var eqTable = $("<table class='mdl-data-table mdl-js-data-table mdl-cell--12-col'>");
    var eqTableHeaders = $("<thead><tr><th class='mdl-data-table__cell--non-numeric'>Time</th><th class='mdl-data-table__cell--non-numeric'>Location</th><th class='mdl-data-table__cell--non-numeric'>Magnitude</th><th class='mdl-data-table__cell--non-numeric'>Type</th><th class='mdl-data-table__cell--non-numeric'>URL</th></tr></thead>");
    var eqTableBody = $("<tbody>");

    $("#ajaxResults").append(eqTable);
    eqTable.append(eqTableHeaders);
    eqTable.append(eqTableBody);

    var eqURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + birthdate + '&endtime=' + moment(birthdate).add(1, 'days').format('YYYY-MM-DD');

    $.ajax({
        url: eqURL,
        method: 'GET'
    }).then(function (response) {
        for (var i = 0; i < response.features.length; i++) {
            if (birthdate == moment(response.features[i].properties.time).format('YYYY-MM-DD')) {
                var newTR = $("<tr>");
                var timeTD = $("<td class='mdl-data-table__cell--non-numeric'>").text(moment(response.features[i].properties.time).format('YYYY-MM-DD, hh:mm A'));
                var locTD = $("<td class='mdl-data-table__cell--non-numeric'>").text(response.features[i].properties.place);
                var magTD = $("<td class='mdl-data-table__cell--non-numeric'>").text(response.features[i].properties.mag);
                var typeTD = $("<td class='mdl-data-table__cell--non-numeric'>").text(response.features[i].properties.type);
                var urlTD = $("<td class='mdl-data-table__cell--non-numeric'>").html("<a href='" + response.features[i].properties.url + "' target='_blank'>" + response.features[i].properties.url + "</a>");
                newTR.append(timeTD);
                newTR.append(locTD);
                newTR.append(magTD);
                newTR.append(typeTD);
                newTR.append(urlTD);
                eqTableBody.append(newTR);
            }
        }
    })
}

 $("body").on("click", "#nasaCard", function(){
    $("#bdayQuestion").css("display", "none");
    $("#cards").css("display", "none");
    $("#ajaxResults").css("display", "block");
    $("#back").css("display", "block");
    $('#reset').css("display", "block");
    var api = "nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD"
    var link = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + birthdate + "&end_date=" + birthdate + "&api_key=" + api;    
  
    var table = $("<table class='mdl-data-table mdl-js-data-table mdl-cell--12-col'>");
    var tableH = $("<thead><tr><th class='mdl-data-table__cell--non-numeric''>Name</th><th class='mdl-data-table__cell--non-numeric''>Size</th><th class='mdl-data-table__cell--non-numeric''>Missed By</th><th class='mdl-data-table__cell--non-numeric''>Speed</th><th class='mdl-data-table__cell--non-numeric''>Was it a Hazard?</th></tr></thead>")
    var tbody = $("<tbody id='nasatable'>")
    $("#ajaxResults").append(table);
    table.append(tableH);
    table.append(tbody);

    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        for( let i = 0; i < res.element_count; i++ ){
            var info = res.near_earth_objects[birthdate][i];

            // name given 
            var name = info.name;

            // were we in danger?
            var danger = info.is_potentially_hazardous_asteroid;
            if ( danger == false ){
                danger = "No";
            } else {
                danger = "Yes";
            }

            //miles in diameter
            var size1 = info.estimated_diameter.miles.estimated_diameter_max;
            var size = size1.toFixed(2)  + " Miles in diameter";
            
            //missed distance
            var miss1 = Math.floor(info.close_approach_data[0].miss_distance.miles);
            var miss = correct(miss1) + " Miles";
            
            //speed of it
            var speed1 = Math.ceil(info.close_approach_data[0].relative_velocity.miles_per_hour);
            var speed = correct(speed1) + " MPH";
            // Miles from earth to sun is 93 Million Miles

            var objToItems = {
                name: name,
                length: size,
                missed: miss,
                velocity: speed,
                dang: danger
            }
            items.push(objToItems);
        }
        for ( let i = 0; i < items.length; i++ ){
            var newitem = items[i]
            var newTr = $("<tr>");
            var nametd = $("<td class='mdl-data-table__cell--non-numeric'>").text(newitem.name);
            var sizetd = $("<td class='mdl-data-table__cell--non-numeric'>").text(newitem.length);
            var missTd = $("<td class='mdl-data-table__cell--non-numeric'>").text(newitem.missed);
            var speedTd = $("<td class='mdl-data-table__cell--non-numeric'>").text(newitem.velocity);
            var dangtd = $("<td class='mdl-data-table__cell--non-numeric'>").text(newitem.dang);
            newTr.append(nametd, sizetd, missTd, speedTd, dangtd);
            $("#nasatable").append(newTr);
        }
    })
})

function correct(num){
    var newnum = num.toString().split("").reverse();
    var arr = [];
    var count = 0;
    for(let i = 0; i < newnum.length; i++){
        if( i % 3 == 0 && count !== 0 ){
            arr.push(",");
        }
        arr.push(newnum[i]);
        count++;
    }
    var rarr = arr.reverse().join("");
    return rarr;
}

$("body").on("click", "#back", function(){
    $("#ajaxResults").empty();
    $("#ajaxResults").css("display", "none");
    $("#cards").css("display", "block");
    $("#back").css("display", "none");
    $("#reset").css("display", "block");
})

$("body").on("click", "#reset", function(){
    $("#ajaxResults").empty();
    $("form input").val('');
    $("#ajaxResults").css("display", "none");
    $("#cards").css("display", "none");
    $("#bdayQuestion").css("display", "block");
    $("#back").css("display", "none");
    $("#reset").css("display", "none");
    birthdate = null;
})