
var $sampleMetadata = document.getElementById("sampleMetadata");
var sample_now = "BB_940"
// Inital loading page
function init() {
    console.log("inside init again, sample_now: " + sample_now);
    // url = "/metadata/" + sample_now;
    // d3.json(url, function(error, response) {
    //     if (error) return console.log(error);
    // d3.json(`/metadata/${sample_now}`).then((response)=>{
    d3.json(`/metadata/${sample_now}`).then((response) => {
        console.log("Console logging response: " + response);

        var keys = Object.keys(response);
        console.log("Console loging keys: " + keys);
        
        metadata_info = document.getElementById("sampleMetadata");
        metadata_info.innerHTML = "";
        for(var i=0; i<keys.length; i++){
            var p = document.createElement("p");
            console.log("response: "+ response )
            p.innerHTML = keys[i] + ": " + response[keys[i]];
            metadata_info.appendChild(p);
        
        }
       
    });
}

function buildPlot(){
    // When route = "/samples/BB_940":
    samp_url = "/samples/" + sample_now;
    // Plotly.d3.json(samp_url, function(error, samp_response){
        // if (error) return console.warn(error);
        //alert("Inside /samples/BB_940")
    d3.json(samp_url).then((samp_response)=>{
        console.log(samp_response);
        labels = samp_response.otu_ids.slice(0,10);
        vals = samp_response["sample_values"].slice(0,10);

        // set up data for pie chart
        var data = [{
            values: labels,
            labels: vals,
            hoverinfo: {bordercolor: 'black'},
            type: 'pie'
            }];
        console.log("data: " + data);
        var layout = {
            title: "Samples"}
        
        var pie_plot = document.getElementById('pie');
        //pie_plot.innerHTML = "";
        Plotly.plot(pie_plot, data, layout);
    });
}
    // Plotly.d3.json('/names', function(error, names_response){
        // if (error) return console.warn(error);
//     d3.json('/names').then((names_response)=>{
//         console.log("Names Response:" + names_response);
        
//         var name_select = document.getElementById('selDataset');
//         name_select.innerHTML = "";
//         for(i=0; i<names_response.length; i++){
//             var elem = document.createElement("option");
//             console.log("Names Response " + i +"th " + names_response[i]);
//             elem.textContent = names_response[i];
//             elem.value = names_response[i];
//             name_select.appendChild(elem);
//         }
    
//     });

//     bubl_url = "/samples/" + sample_now; //eg. '/samples/BB_947'
//     // Plotly.d3.json(bubl_url, function(error, bubl_response){
//     d3.json(`/samples/ + ${sample_now}`).then((bubl_response)=>{   
        
//         var bubbleDiv = document.getElementById("bubble");
//         //bubbleDiv.innerHTML = "";

//         var traceA = {
//         type: "scatter",
//         mode: "markers",
//         //x: [5, 13, 24, 35, 46, 60],
//         x: bubl_response.otu_ids,
//         //y: [40, 70, 65, 15, 75, 49],
//         y : bubl_response.sample_values,
//         marker: {
//             //size: [100, 200, 800, 600, 500, 600],
//             size: bubl_response.sample_values,
//             sizemode: 'area'
//         }
//         };
        
//         var data = [traceA];
        
//         var layout = {
//         title: "A Bubble Chart in Plotly"
//         };
        
//         Plotly.plot(bubbleDiv, data, layout);
//     })
    

// }


function optionChanged(val){
    sample_now = val;
    //alert("On change!")
    console.log("val inside optionChanged: " + val);
    init();
    buildPlot();

}



// call init function:
init();