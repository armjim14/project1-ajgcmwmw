var birthdate;

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