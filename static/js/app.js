// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const metadata=data.metadata // get the metadata field
    const result=metadata.find(item=>item.id ===parseInt(sample));//returns the first element in the array which is ID in integer
    // Filter the metadata for the object with the desired sample number

    const PANEL=d3.select(`#sample-metadata`);// Use d3 to select the panel with id of `#sample-metadata`
    //PANEL acts as a container in which new elements will be placed.

    PANEL.html(""); // Use `.html("") to clear any existing metadata

        // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach([key,value]) => {
      PANEL.append('h6').text(`${key.toUpperCase()}:${value}`);
  }); //creates new <h6> html tag and appends it as a child to the 'PANEL' element. 
      //Returns the newly created element.
}

// buildMetadata(940) //testing if buildMetaData worked

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const samples = data.samples; // Get the samples field
    const result=samples.find(item=>item.id===sample); // Filter the samples for the object with the desired sample number
    const otu_ids=result.otu_ids; // Array of OTU IDs
    const otu_labels=result.otu_labels; // Array of OTU labels
    const sample_values=result.sample_values; // Array of Sample values

    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
