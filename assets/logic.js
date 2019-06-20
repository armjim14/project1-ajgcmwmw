var birthdate = "";
var items = [];

$("body").on("click", "#submit", function () {
    birthdate = $("form input").val();
    $("#bdayQuestion").css("display", "none");
    $('#cards').css('display', 'block');
    $("#reset").css("display", "block");
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
    var tableH = $("<thead><tr><th class='mdl-data-table__cell--non-numeric''>Name</th><th class='mdl-data-table__cell--non-numeric''>Size</th><th class='mdl-data-table__cell--non-numeric''>Missed By</th><th class='mdl-data-table__cell--non-numeric''>Speed</th><th class='mdl-data-table__cell--non-numeric''>Were we in danger?</th></tr></thead>")
    var tbody = $("<tbody id='nasatable'>")
    $("#ajaxResults").append(table);
    table.append(tableH);
    table.append(tbody);

    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        console.log(res);
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
            var size = info.estimated_diameter.miles.estimated_diameter_max + " Miles in diameter";
            
            //missed distance
            var miss = Math.floor(info.close_approach_data[0].miss_distance.miles) + " Miles";
            
            //speed of it
            var speed = Math.ceil(info.close_approach_data[0].relative_velocity.miles_per_hour) + " MPH";
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