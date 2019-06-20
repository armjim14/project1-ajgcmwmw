$("#submit").on("click", function(){
    var birthdate = $("form input").val()
    var api = "nzDTlixflJIZcchogN9lZyKGc6qW2V0ElS9qHvAD"
    var link = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + birthdate + "&end_date=" + birthdate + "&api_key=" + api;
    // var link2 = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+birthdate+"&api_key=" + api    
    var items = [];
    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        // console.log(res);

        for( let i = 0; i < res.element_count; i++ ){
            var info = res.near_earth_objects[birthdate][i];

            var size = info.estimated_diameter.miles.estimated_diameter_max;
            //missed distance
            var miss = Math.floor(info.close_approach_data[0].miss_distance.miles) + " Miles";
            
            //speed of it
            var speed = Math.ceil(info.close_approach_data[0].relative_velocity.miles_per_hour) + " MPH";
            
            // Miles from earth to sun is 93 Million Miles
            // var objToItems = {
            //     length: size,
            //     missed: miss,
            //     velocity: speed,
            // }
            // console.log(objToItems);
            items.push(size, miss, speed);
            // console.log(items);
        }
        console.log(items);
    })
    // $.ajax({
    //     url: link2,
    //     method: "GET"
    // }).then(function(res){
    //     console.log(res);
    // })
    
})