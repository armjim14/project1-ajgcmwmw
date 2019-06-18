// https://api.nasa.gov/planetary/apod?api_key=nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD
// https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY

$("#submit").on("click", function(){
    var birthdate = $("form input").val()
    var api = "nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD"
    var link = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + birthdate + "&end_date=" + birthdate + "&api_key=" + api;

    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        var info = res.near_earth_objects[birthdate][0];
        var missed = info.close_approach_data[0].miss_distance.miles;
        console.log(missed);
        console.log(res);
    })

})