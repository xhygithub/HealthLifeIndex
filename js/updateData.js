function generatePPMValue(value) {
    return value > 200 ? "浊" : "纯";

}

function updateAQI(AqiValue, baseElement) {
    baseElement
        .select(".text")
        .text(AqiValue);

    let rectWidthFuc = d3.scale.linear()
        .domain([0, 2000])
        .range([1400, 300]);

    baseElement.select("rect")
        .attr({
            "width": rectWidthFuc(AqiValue),
            height: "296.42"
        });

    let movingLineLength = d3.scale.linear()
        .domain([0, 2000])
        .range([1400, 300]);


    baseElement.select(".horizontal-line")
        .attr({
            "class": "horizontal-line",
            "x1": 158,
            "x2": movingLineLength(AqiValue),
        });

    baseElement.select(".vertical-line")
        .attr({
            "class": "vertical-line",
            "x1": movingLineLength(AqiValue),
            "x2": movingLineLength(AqiValue),
            "y2": 500
        })
        .style({
            "fill": "none",
            "stroke": "#7ed1d2",
            "stroke-miterlimit": 10,
            "stroke-width": 2
        });
}
//
function updatePM(BaseElement, data) {
    let movingLineWidth = d3.scale.linear()
        .domain([0, 200])
        .range([1, 390]);

    let colorScale = d3.scale.linear()
        .domain([0, 200])
        .range(["#7ed1d2", "red"]);

    qualityLevelTextFuc = function (data) {
        return data > 100 ? "差" : "优";
    };

    BaseElement
        .select(".moving-line line")
        .attr({
            "x2": movingLineWidth(data),
            "x1": movingLineWidth(data)
        });

    BaseElement
        .select(".cover rect")
        .attr({
            "width": movingLineWidth(data)
        })
        .style({
            fill: colorScale(data)
        });


    BaseElement
        .select(".quality-level text")
        .text(qualityLevelTextFuc(data));

    BaseElement
        .select(".value text.figure")
        .text(data + "ug/m3");


}


function updatePPM(baseElement, data) {
    const ppmValue = data.ppm;
    baseElement.select(".symbol").text(generatePPMValue(ppmValue));

    baseElement.select(".value").text(ppmValue);

    baseElement.selectAll("tr td:last-child")
        .data(data.table)
        .text((d) => d);
}

