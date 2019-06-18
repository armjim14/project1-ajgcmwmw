$("body").on("click", "#submit", function(){
    var birthdate = $("form input").val();
    console.log(birthdate);
})


$("body").on("click", "#usgsCard", function(){
    // https://earthquake.usgs.gov/fdsnws/event/1/#parameters
    var url = 'https://earthquake.usgs.gov/fdsnws/event/1/[METHOD[?PARAMETERS]'
})
function earthquakes(date){

}