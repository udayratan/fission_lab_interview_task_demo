let Controller = require('./controller');

let formidable = require('formidable');
let fs = require('fs');
let async = require('async');

exports.CSVParsing = (req, res) => {
    let XLSX = require('xlsx');
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    let values, tmpfile;
    form.parse(req, (err, fields, files) => {
        tmpfile = files.file.path;
    });
    form.on('end', () => {
        let workbook = XLSX.readFile(tmpfile);
        let colorArray = [
            "red",
            "green",
            "blue",
            "purple",
            "magenta",
            "aqua",
            "salmon",
            "darkgray",
            "pink",
            "coral"
        ];
        let backgroundColor = [];
        let borderColor = [];
        fs.unlink(tmpfile, (err) => {
            if (err) console.log(err);
            let ParsedData = workbook.Sheets.Sheet1;
            let Series1_Data = [];
            let Series2_Data = [];
            let Series3_Data = [];
            let Series4_Data = [];
            for (let i = 66; i < 77; i++) {
                backgroundColor.push(
                    colorArray[Math.floor(Math.random() * colorArray.length)]
                );
                borderColor.push('#111');
                let key = String.fromCharCode(i);
                let data1 = ParsedData[key + '1']["v"].split('|');
                let data2 = ParsedData[key + '2']["v"].split('|');
                let data3 = ParsedData[key + '3']["v"].split('|');
                let data4 = ParsedData[key + '4']["v"].split('|');
                Series1_Data.push({
                    year: data1[0],
                    value: data1[1]
                });
                Series2_Data.push({
                    year: data2[0],
                    value: data2[1]
                });
                Series3_Data.push({
                    year: data3[0],
                    value: data3[1]
                });
                Series4_Data.push({
                    year: data4[0],
                    value: data4[1]
                });
            };
            Controller.ArrayFunction(Series1_Data, (err, Labels1, Values1) => {
                if (!err) {
                    Controller.ArrayFunction(Series2_Data, (err, Labels2, Values2) => {
                        if (!err) {
                            Controller.ArrayFunction(Series3_Data, (err, Labels3, Values3) => {
                                if (!err) {
                                    Controller.ArrayFunction(Series4_Data, (err, Labels4, Values4) => {
                                        if (!err) {
                                            let data1 = {
                                                labels: Labels1,
                                                datasets: [
                                                    {
                                                        data: Values1,
                                                        backgroundColor: backgroundColor,
                                                        borderColor: borderColor,
                                                        borderWidth: 1
                                                    }
                                                ]
                                            };
                                            let options1 = {
                                                title: {
                                                    display: true,
                                                    position: "top",
                                                    text: "Series 1",
                                                    fontSize: 18,
                                                    fontColor: "#111"
                                                },
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            min: 0
                                                        }
                                                    }]
                                                }
                                            };
                                            let data2 = {
                                                labels: Labels2,
                                                datasets: [
                                                    {
                                                        data: Values2,
                                                        backgroundColor: backgroundColor,
                                                        borderColor: borderColor,
                                                        borderWidth: 1
                                                    }
                                                ]
                                            };
                                            let options2 = {
                                                title: {
                                                    display: true,
                                                    position: "top",
                                                    text: "Series 2",
                                                    fontSize: 18,
                                                    fontColor: "#111"
                                                },
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            min: 0
                                                        }
                                                    }]
                                                }
                                            };
                                            let data3 = {
                                                labels: Labels3,
                                                datasets: [
                                                    {
                                                        data: Values3,
                                                        backgroundColor: backgroundColor,
                                                        borderColor: borderColor,
                                                        borderWidth: 1
                                                    }
                                                ]
                                            };
                                            let options3 = {
                                                title: {
                                                    display: true,
                                                    position: "top",
                                                    text: "Series 3",
                                                    fontSize: 18,
                                                    fontColor: "#111"
                                                },
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            min: 0
                                                        }
                                                    }]
                                                }
                                            };
                                            let data4 = {
                                                labels: Labels4,
                                                datasets: [
                                                    {
                                                        data: Values4,
                                                        backgroundColor: backgroundColor,
                                                        borderColor: borderColor,
                                                        borderWidth: 1
                                                    }
                                                ]
                                            };
                                            let options4 = {
                                                title: {
                                                    display: true,
                                                    position: "top",
                                                    text: "Series 4",
                                                    fontSize: 18,
                                                    fontColor: "#111"
                                                },
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            min: 0
                                                        }
                                                    }]
                                                }
                                            };
                                            res.render('graph', {
                                                data1: JSON.stringify(data1),
                                                options1: JSON.stringify(options1),
                                                data2: JSON.stringify(data2),
                                                options2: JSON.stringify(options2),
                                                data3: JSON.stringify(data3),
                                                options3: JSON.stringify(options3),
                                                data4: JSON.stringify(data4),
                                                options4: JSON.stringify(options4)
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })

    })
}
exports.ArrayFunction = (myArray, callback) => {
    let NewArray = [];
    let Data = {};
    async.eachSeries(myArray, (item, callback) => {
        if (Data[item.year] == null || Data[item.year] == 0 || Data[item.year] == undefined) {
            Data[item.year] = parseInt(item.value);
        } else {
            Data[item.year] += parseInt(item.value);
        }
        callback();
    }, (err) => {
        async.eachSeries(Object.keys(Data), (key, resp) => {
            NewArray.push({
                year: key,
                value: Data[key]
            });
            resp();
        }, (err) => {
            NewArray = NewArray.sort(function Sorted(a, b) { // non-anonymous as you ordered...
                return b.year < a.year ? 1 // if b should come earlier, push a to end
                    : b.year > a.year ? -1 // if b should come later, push a to begin
                        : 0;                   // a and b are equal
            });
            let LabelsArray = [];
            let ValuesArray = [];
            async.eachSeries(NewArray, (element, neXt) => {
                LabelsArray.push(element.year);
                ValuesArray.push(element.value);
                neXt()
            }, (err) => {
                callback(false, LabelsArray, ValuesArray);
            })
        })
    })
}
