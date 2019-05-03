
var svgWidth = 960;
var svgHeight = 550;

var margin = {
    top: 20,
    bottom: 60,
    right: 40,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('assets/data/data.csv').then(function(data) {
    // Step 1: convert "numbers in strings" to int(numbers)
    data.forEach(function(e) {
        e.healthcare = +e.healthcare;
        e.healthcareHigh = +e.healthcareHigh;
        e.healthcareLow = +e.healthcareLow;
        e.poverty = +e.poverty;
        e.povertyMoe = +e.povertyMoe;
    });
    // console.log(data[0]);

    // Step 2: Create scaling functions
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(data, d => d.healthcare)])
        .range([height, 0]);
    
    // Step 3: Create x and y axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append axes to chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append('g')
        .call(leftAxis);
    
    // Step 5: Circle creation
    var circlesGroup = chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xLinearScale(d.poverty))
        .attr('cy', d => yLinearScale(d.healthcare))
        .attr('r', '20')
        .attr('class', function(d) {
            return d.abbr;
        })
        .attr('fill', 'blue')
        .attr('opacity', '.5');
    var theCircles = chartGroup.selectAll('g Circles').data(data).enter();
    theCircles
        .append('text')
        .text(function(d) {
            return d.abbr;
        })
        .attr('dx', d => xLinearScale(d.poverty))
        .attr('dy', d => yLinearScale(d.healthcare) + 1000 / -5000)
        .attr('font-size', '10')
        .attr('fill', 'white')
        .attr('class', 'stateText');

    // Step 6: Initialize tool tip
    var toolTip = d3.tip()
        .attr('class', 'tooltip')
        .offset([80, -60])
        .html(function(data) {
            return (`${data.state} <br> Poverty: ${data.poverty}% <br>Healthcare: ${data.healthcare}%`)
        });
    
    // Step 7: Create chart tool tip
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display/hide tooltip
    circlesGroup.on('mouseover', function(dataR) {
        toolTip.show(dataR,this);
    })
        .on('mouseout', function(dataR, index) {
            toolTip.hide(dataR);
        });
        // .on('mouseover', function(data, index) {
        //     toolTip.show(data, this)
        // });

    // Step 9: Create labels for axes
    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left + 40)
        .attr('x', 0 - (height/2))
        .attr('dy', '1em')
        .attr('class', 'axisText')
        .text('Lacks Healthcare (%)');
    chartGroup.append('text')
        .attr('transform', `translate(${width/2}, ${height + margin.top + 30})`)
        .attr('class', 'axisText')
        .text('In Poverty (%)');
    
});



// // Set the margins
// var svgWidth = 960;
// var svgHeight = 550;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart.
// var svg = d3.select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Import Data
// d3.csv("assets/data/data.csv")
//   .then(function(data) {
//     // Step 1:  convert "numbers in strings" to int(numbers)
//     // ==============================
//     data.forEach(function(e) {
//       // e.age = +e.age;
//       // e.ageMoe = +e.ageMoe;
//       e.healthcare = +e.healthcare;
//       e.healthcareHigh = +e.healthcareHigh;
//       e.healthcareLow = +e.healthcareLow;
//       // e.income = +e.income;
//       // e.incomeMoe = +e.incomeMoe;
//       // e.obesity = +e.obesity;
//       // e.obesityHigh = +e.obesityHigh;
//       // e.obesityLow = +e.obesityLow;
//       e.poverty = +e.poverty;
//       e.povertyMoe = +e.povertyMoe;
//       // e.smokes = +e.smokes;
//       // e.smokesHigh = +e.smokesHigh;
//       // e.smokesLow = +e.smokesLow;
//     });
//     console.log(data[0]);

//     // Step 2: Create the scaling functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([8, d3.max(data, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([4, d3.max(data, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create x and y axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     // groups all the circles
//     var circlesGroup = chartGroup.selectAll("circle")
//       .data(data)
//       .enter()
//       // append to each circle the data 
//       .append("circle")
//       .attr("cx", d => xLinearScale(d.poverty))
//       .attr("cy", d => yLinearScale(d.healthcare))
//       // attributes for creating each circle
//       .attr("r", "20")
//       .attr("class", function(d) {
//         return d.abbr;
//       })
//       // .append("text")
//       .attr("fill", "blue")
//       .attr("opacity", ".5");

//     // create matching labels for each abbreviated state.  
//     var theCircles = chartGroup.selectAll("g Circles").data(data).enter();  
//     theCircles
//       .append("text")
//       .text(function(d) {
//         return d.abbr;
//       })
//       // Adjust the text using graphs x,y scale.
//       .attr("dx", d => xLinearScale(d.poverty))
//       .attr("dy", d => yLinearScale(d.healthcare) + 1000 / -5000)
//         // When the size of the text is the radius,
//         // adding a third of the radius to the height pushes text towrds middle.
//       .attr("font-size", "10")
//       .attr("fill", "white")
//       .attr("class", "stateText");      
          

//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(data) {
//       return (`${data.state} <br> Poverty: ${data.poverty}% <br>Healthcare: ${data.healthcare}%`);
//     });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);


//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("mouseover", function(dataR) {
//       toolTip.show(dataR, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(dataR, index) {
//         toolTip.hide(dataR);
//       });


//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks Healthcare (%)");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   });
