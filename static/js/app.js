// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const metadata=data.metadata // get the metadata field

    const result=metadata.find(item=>item.id ===parseInt(sample));//returns the first element in the array which is ID in integer
    // Filter the metadata for the object with the desired sample number

    console.log(metadata)
    console.log(result)

    const PANEL=d3.select(`#sample-metadata`);// Use d3 to select the panel with id of `#sample-metadata`
    //PANEL acts as a container in which new elements will be placed.

    PANEL.html(""); // Use `.html("") to clear any existing metadata, 
    //otherwise the full set of data will keep being added every time we click

    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });// Append each key-value pair as a new element in the panel
  }); //creates new <h6> html tag and appends it as a child to the 'PANEL' element. 
}
console.log(buildMetadata(940)) //testing if buildMetaData worked

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const samples = data.samples; // Get the samples field
    const result=samples.find(item=>item.id===sample); // Filter the samples for the object with the desired sample number
    const otu_ids=result.otu_ids; // Array of OTU IDs
    const otu_labels=result.otu_labels; // Array of OTU labels
    const sample_values=result.sample_values; // Array of Sample values

    // Build a Bubble Chart
    
    const bubbleData= [{
      x:otu_ids,
      y:sample_values,
      text:otu_labels,
      mode:'markers',
      marker: {
        size:sample_values,
        color:otu_ids,
        colorscale:"Earth"
      }
    }]; //Build bubblechart data

    const bubbleLayout={
      title: "Bacteria Cultures Per Sample",
      hovermode:"closest",
      xaxis:{title:"OTU ID"},
      yaxix:{title:"Number of Bacteria"}
    };
    // Render the Bubble Chart
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);

    // Build a Bar Chart
    const yticks=otu_ids.slice(0,10).map(otuID=>`OTU ${otuID}`).reverse() //map the otu_ids to a list of strings for your yticks
    // Bar chart data
    const barData =[{
      type:'bar',
      y:yticks,
      x:sample_values.slice(0,10).reverse(),
      text:otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    }];

    const barLayout={
      title: "Top 10 Bacteria Cultures Found",
      xaxis:{title:'Number of Bacteria'},
      hovermode:"closest",
      margin:{t:30, l:150}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar",barData,barLayout)
  });
}

// Function to run on page load
function init() {
  const selector=d3.select("#selDataset"); // Selects the dropdown element in HTML by its ID
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
  const sampleNames=data.names; //returns an array of sample names
  sampleNames.forEach((name)=>{
    selector.append("option")// Appends an <option> element to the <select> element
    .text(name)//sets the visible text of the option to the sample name
    .property("value".name); // Sets the value property of the option to the sample name
  }); 

  const firstSample=sampleNames[0]; // Get the first sample from the list
  buildCharts(firstSample);//Build charts with the first sample
  buildMetadata(firstSample)//Build metadata panel with the first sample
  });
}

// Function for event listener based on user input (newSample)
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample)
};

// Initialize the dashboard
init();
