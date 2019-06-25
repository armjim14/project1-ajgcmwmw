var birthdate = "";
var screen = window.innerWidth;
var items = [];

$("body").on("click", "#submit", function () {
    submitClicked();
})

$("body").on("keyup", function (e) {
    var code = e.key;
    if (code == "Enter") {
        submitClicked();
    }
})

function submitClicked() {
    birthdate = $("form input").val();
    console.log(birthdate);
    var valid = birthdate.search(/....-..-../);

    if (valid == 0) {
        $("#bdayQuestion").fadeOut(1000, function () {
            var userYear = moment(birthdate).year();
            var userMonth = moment(birthdate).month() + 1;
            var userDay = moment(birthdate).date();

            var date = new Date();
            var year = date.getFullYear();
            var Month = date.getMonth() + 1;
            var day = date.getDate();

            if (userYear > year || userYear < 1900) {
                $("#error").css("display", "block");
            } else if (userYear == year && userMonth > Month) {
                $("#error").css("display", "block");
            } else if (userYear == year && userMonth == Month && userDay > day) {
                $("#error").css("display", "block");
            } else {
                $("#error").css("display", "none");
                $("#bdayQuestion").css("display", "none");
                $("#reset").css("display", "block");
                $('body').each(function () {
                    this.style.pointerEvents = 'none';
                });
                gifGenerator();
                $('#cards').fadeIn(1000, function () {
                    $('#cards').css('display', 'block');
                    $('body').each(function () {
                        this.style.pointerEvents = 'auto';
                    });
                });

            }
        })
    }
    else {
        $("#error").css("display", "block");
    }
}

function gifGenerator() {
    var astArr = ['asteroid', 'meteor', 'comet', 'space', 'meteor%20shower', 'cosmos', 'supernova'];
    var link2 = "https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=" + astArr[Math.floor(Math.random() * astArr.length)] + "&limit=20&offset=0&rating=G&lang=en";
    console.log(link2);
    $.ajax({
        url: link2,
        method: "GET"
    }).then(function (res) {
        $("#nasaPic").empty();
        var ajaxNum = Math.floor(Math.random() * 20);
        var gif = res.data[ajaxNum].images.fixed_width.url;
        var newImg = $("<img>").attr("src", gif);
        newImg.attr("id", "image")
        $("#nasaPic").append(newImg);
    })
    var quakeArr = ['trembling', 'explosion', 'blast', 'earthquake', 'tremor', 'earthquake%20aftershock', 'earth%20shaking'];
    var quakeGif = 'https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=' + quakeArr[Math.floor(Math.random() * quakeArr.length)] + '&limit=20&offset=0&rating=G&lang=en';
    console.log(quakeGif);
    $.ajax({
        url: quakeGif,
        method: 'GET'
    }).then(function (resp) {
        $('#quakeGif').empty();
        var ajaxNum = Math.floor(Math.random() * 20);
        var gif = resp.data[ajaxNum].images.fixed_width.url;
        var newImg = $("<img>").attr("src", gif);
        newImg.attr('id', 'image');
        $('#quakeGif').append(newImg);
    })
    var nyArr = ['New%20York%20City', 'NYC', 'NY%20Times', 'reading', 'newspaper', 'article', 'skimming', 'reader', 'bookworm', 'times%20square', 'manhattan'];
    var nyGif = 'https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=' + nyArr[Math.floor(Math.random() * nyArr.length)] + '&limit=20&offset=0&rating=G&lang=en';
    console.log(nyGif);
    $.ajax({
        url: nyGif,
        method: 'GET'
    }).then(function (resp) {
        $('#nyGif').empty();
        var ajaxNum = Math.floor(Math.random() * 20);
        var gif = resp.data[ajaxNum].images.fixed_width.url;
        var newImg = $("<img>").attr("src", gif);
        newImg.attr('id', 'image');
        $('#nyGif').append(newImg);
    })
}
$("body").on("click", "#usgsCard", function () {
    earthquakes(birthdate);
})
function earthquakes(date) {
    $("#bdayQuestion").css("display", "none");
    $("#cards").css("display", "none");
    $("#ajaxResults").css("display", "block");
    $("#back").css("display", "block");
    $("#reset").css("display", "block");

    var eqURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + birthdate + '&endtime=' + moment(birthdate).add(1, 'days').format('YYYY-MM-DD');

    $.ajax({
        url: eqURL,
        method: 'GET'
    }).then(function (response) {
        if (response.features.length == 0) {
            $("#ajaxResults").html('<h1>' + "Sorry, there are no results for " + moment(birthdate).format('MMMM Do, YYYY') + "." + '</h1>');
        }
        else {
            if (screen > 700) {
                var eqTable = $("<table class='mdl-data-table mdl-js-data-table mdl-cell--12-col'>");
                var eqTableHeaders = $("<thead><tr><th class='mdl-data-table__cell--non-numeric'>Time</th><th class='mdl-data-table__cell--non-numeric'>Location</th><th class='mdl-data-table__cell--non-numeric'>Magnitude</th><th class='mdl-data-table__cell--non-numeric'>Type</th><th class='mdl-data-table__cell--non-numeric'>URL</th></tr></thead>");
                var eqTableBody = $("<tbody>");
                $("#ajaxResults").append(eqTable);
                eqTable.append(eqTableHeaders);
                eqTable.append(eqTableBody);
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
            }
            else {
                var newDL = $("<dl>");
                $("#ajaxResults").append(newDL);
                for (var i = 0; i < response.features.length; i++) {
                    if (birthdate == moment(response.features[i].properties.time).format('YYYY-MM-DD')) {
                        var timeDT = $("<dt>").html("<span class='value'>Time: </span>" + moment(response.features[i].properties.time).format('YYYY-MM-DD, hh:mm A'));
                        var locDD = $("<dd>").html("<span class='value'>Location: </span>" + response.features[i].properties.place);
                    var magDD = $("<dd>").html("<span class='value'>Magnitude: </span>" + response.features[i].properties.mag);
                    var typeDD = $("<dd>").html("<span class='value'>Type: </span>" + response.features[i].properties.type);
                    var urlTD = $("<dd>").html("<span class='value'>URL: </span>" + "<a style='word-wrap:break-word' href='" + response.features[i].properties.url + "' target='_blank'>" + response.features[i].properties.url + "</a>");
                    newDL.append(timeDT, locDD, magDD, typeDD, urlTD);
                } 
            }
        
    }
        }
    })
}

$("body").on("click", "#nasaCard", function () {
    $("#bdayQuestion").css("display", "none");
    $("#cards").css("display", "none");
    $("#ajaxResults").css("display", "block");
    $("#back").css("display", "block");
    $('#reset').css("display", "block");
    var api = "nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD"
    var link = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + birthdate + "&end_date=" + birthdate + "&api_key=" + api;


    $.ajax({
        url: link,
        method: "GET"
    }).then(function (res) {
        for (let i = 0; i < res.element_count; i++) {
            var info = res.near_earth_objects[birthdate][i];
            // name given 
            var name = info.name;
            // were we in danger?
            var danger = info.is_potentially_hazardous_asteroid;
            if (danger == false) {
                danger = "No";
            } else {
                danger = "Yes";
            }
            //miles in diameter
            var size1 = info.estimated_diameter.miles.estimated_diameter_max;
            var size = size1.toFixed(2);
            //missed distance
            var miss1 = Math.floor(info.close_approach_data[0].miss_distance.miles);
            var miss = correct(miss1);
            //speed of it
            var speed1 = Math.ceil(info.close_approach_data[0].relative_velocity.miles_per_hour);
            var speed = correct(speed1);
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
        if (res.element_count == 0) {
            var noinfo = $("<p>").text("There is no info for that day");
            $("#ajaxResults").append(noinfo);
        } else {
            if (screen > 700) {
                // more than 700 starts here
                var table = $("<table class='mdl-data-table mdl-js-data-table mdl-cell--12-col'>");
                var tableH = $("<thead><tr><th style='color: #4181ad; border: lightgray 1px solid;' class=' mdl-data-table__cell--non-numeric''>Name</th><th style='color: #4181ad; border: lightgray 1px solid;' class='spec mdl-data-table__cell--non-numeric''>Size</th><th style='color: #4181ad; border: lightgray 1px solid;' class='spec mdl-data-table__cell--non-numeric''>Missed Earth By</th><th style='color: #4181ad; border: lightgray 1px solid;' class='spec mdl-data-table__cell--non-numeric''>Speed</th><th style='color: #4181ad; border: lightgray 1px solid;' class='spec mdl-data-table__cell--non-numeric''>Was it a Hazard?</th></tr></thead>")
                var tbody = $("<tbody id='nasatable'>")
                $("#ajaxResults").append(table);
                table.append(tableH);
                table.append(tbody);
                for (let i = 0; i < items.length; i++) {
                    var newitem = items[i]
                    var newTr = $("<tr>");
                    var nametd = $("<td style='border: lightgray 1px solid;' class='mdl-data-table__cell--non-numeric'>").text(newitem.name);
                    var sizetd = $("<td style='border: lightgray 1px solid;' class='mdl-data-table__cell--non-numeric'>").text(newitem.length + " Miles in diameter");
                    var missTd = $("<td style='border: lightgray 1px solid;' class='mdl-data-table__cell--non-numeric'>").text(newitem.missed + " Miles");
                    var speedTd = $("<td style='border: lightgray 1px solid;' class='mdl-data-table__cell--non-numeric'>").text(newitem.velocity + " MPH");
                    var dangtd = $("<td style='border: lightgray 1px solid;' class='mdl-data-table__cell--non-numeric'>").text(newitem.dang);
                    newTr.append(nametd, sizetd, missTd, speedTd, dangtd);
                    $("#nasatable").append(newTr);
                }
                // more than 700 ends here
            } else {
                var newDL = $("<dl>");//.css("background", "url('https://media0.giphy.com/media/aGeePr7nv6ra8/giphy.gif')");
                $("#ajaxResults").append(newDL);
                for (let i = 0; i < items.length; i++) {
                    var newitem = items[i]
                    var newDT = $("<dt>").html("<span class='value'> Name: </span>" + newitem.name);
                    var sizedd = $("<dd>").html("<span class='value'> Miles Wide: </span>" + newitem.length);
                    var missdd = $("<dd>").html("<span class='value'> Missed Earth by: </span>" + newitem.missed + " Miles")
                    var speeddd = $("<dd>").html("<span class='value'>Speed: </span>" + newitem.velocity + " MPH ");
                    var dangdd = $("<dd>").html("<span class='value'> Was it a hazard: </span>" + newitem.dang);
                    newDL.append(newDT, sizedd, missdd, speeddd, dangdd);
                }
            }
        }
    })
})

function correct(num) {
    var newnum = num.toString().split("").reverse();
    var arr = [];
    var count = 0;
    for (let i = 0; i < newnum.length; i++) {
        if (i % 3 == 0 && count !== 0) {
            arr.push(",");
        }
        arr.push(newnum[i]);
        count++;
    }
    var rarr = arr.reverse().join("");
    return rarr;
}

$("body").on("click", "#back", function () {
    $('body').each(function () {
        this.style.pointerEvents = 'none';
    });
    $("#ajaxResults").fadeOut(1000, function () {
        $("#ajaxResults").empty();
        $("#ajaxResults").css("display", "none");
        gifGenerator();
        $("#cards").fadeIn(2500, function () {
            $("#cards").css("display", "block");
            $("#back").css("display", "none");
            $("#reset").css("display", "block");
            $('body').each(function () {
                this.style.pointerEvents = 'auto';
            });
        })
    })


})

$("body").on("click", "#reset", function () {
    $("form input").val('');
    $('body').each(function () {
        this.style.pointerEvents = 'none';
    });
    $("#ajaxResults").fadeOut(1700, function () {
        $("#ajaxResults").empty();
        $("#ajaxResults").css("display", "none");
        $("#cards").css("display", "none");
        $("#back").css("display", "none");
        $("#reset").css("display", "none");
        $("#bdayQuestion").fadeIn(1000, function () {
            $("#bdayQuestion").css("display", "block");
            birthdate = null;
            $('body').each(function () {
                this.style.pointerEvents = 'auto';
            });
        })

    })
})

$("body").on("click", "#TimesCard", function () {
    console.log('hello');
    $("#bdayQuestion").css("display", "none");
    $("#cards").css("display", "none");
    $("#ajaxResults").css("display", "block");
    $("#back").css("display", "block");
    $("#reset").css("display", "block");

    var api = 'R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';

    var link = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&begin_date=" + birthdate + '&end_date=' + birthdate + "&fq=document_type(article)&api-key=" + api;   
   
 $.ajax({
        url: link,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (response.response.docs.length == 0) {
            $("#ajaxResults").html("<h3 style='color:green'>  Sorry, there are no results for "+ moment(birthdate).format('MMMM Do, YYYY') + ".</h3>");
        } else {
            var table = $("<dl>");
            $("#ajaxResults").append(table);
            for (var i = 0; i < 10; i++) {
                var newTR = $("<dt>").html(response.response.docs[i].headline.main);
                var LeadParagraphTD = $("<dd>").html(response.response.docs[i].lead_paragraph);
                var urlTD = $("<dd>").html("<a href='" + response.response.docs[i].web_url + "' target='_blank'>" + response.response.docs[i].web_url + "</a>");
                table.append(newTR, LeadParagraphTD, urlTD);
            }
        }        
    });
});

