var birthdate = "";
var items = [];

$("body").on("click", "#submit", function(){
    birthdate = $("form input").val();
})

$("#nasaCard").on("click", function(){
    var api = "nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD"
    var link = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + birthdate + "&end_date=" + birthdate + "&api_key=" + api;    

    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        for( let i = 0; i < res.element_count; i++ ){
            var info = res.near_earth_objects[birthdate][i];

            var size = info.estimated_diameter.miles.estimated_diameter_max;
            //missed distance
            var miss = Math.floor(info.close_approach_data[0].miss_distance.miles) + " Miles";
            
            //speed of it
            var speed = Math.ceil(info.close_approach_data[0].relative_velocity.miles_per_hour) + " MPH";
            
            // Miles from earth to sun is 93 Million Miles
            var objToItems = {
                length: size,
                missed: miss,
                velocity: speed,
            }
            items.push(objToItems);
        }
        for ( let i = 0; i < items.length; i++ ){
            var newitem = items[i]
            var newTr = $("<tr>");
            var sizetd = $("<td>").text(newitem.length);
            var missTd = $("<td>").text(newitem.missed);
            var speedTd = $("<td>").text(newitem.velocity);
            newTr.append(sizetd, missTd, speedTd);
            $("#nasatable").append(newTr);
        }
    })
})