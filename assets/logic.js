var birthdate;

$("body").on("click", "#submit", function(){
    birthdate = $("form input").val();
    console.log(birthdate);
})


$("body").on("click", "#usgsCard", function(){
    // https://earthquake.usgs.gov/fdsnws/event/1/#parameters
    var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1988-07-18&endtime=1988-07-19';
})
function earthquakes(date){

}