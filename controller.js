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
        fs.unlink(tmpfile, (err) => {
            if (err) console.log(err);
            let ParsedData = workbook.Sheets.Sheet1;
            let Series1_Data = [];
            let Series2_Data = [];
            let Series3_Data = [];
            let Series4_Data = [];
            for (let i = 66; i < 77; i++) {
                let key = String.fromCharCode(i);
                let data1 = ParsedData[key + '1']["v"].split('|');
                let data2 = ParsedData[key + '2']["v"].split('|');
                let data3 = ParsedData[key + '3']["v"].split('|');
                let data4 = ParsedData[key + '4']["v"].split('|');
                Series1_Data.push({
                    x: data1[0],
                    y: data1[1]
                });
                Series2_Data.push({
                    x: data2[0],
                    y: data2[1]
                });
                Series3_Data.push({
                    x: data3[0],
                    y: data3[1]
                });
                Series4_Data.push({
                    x: data4[0],
                    y: data4[1]
                });
            };
            Controller.ArrayFunction(Series1_Data, (err, Series1_Data) => {
                if (!err) {
                    Controller.ArrayFunction(Series2_Data, (err, Series2_Data) => {
                        if (!err) {
                            Controller.ArrayFunction(Series3_Data, (err, Series3_Data) => {
                                if (!err) {
                                    Controller.ArrayFunction(Series4_Data, (err, Series4_Data) => {
                                        if (!err) {
                                            let data = [
                                                {
                                                    type: "line",
                                                    showInLegend: true,
                                                    legendText: "Series 1",
                                                    dataPoints:Series1_Data
                                                },
                                                {
                                                    type: "line",
                                                    showInLegend: true,
                                                    legendText: "Series 2",
                                                    dataPoints:Series2_Data
                                                },
                                                {
                                                    type: "line",
                                                    showInLegend: true,
                                                    legendText: "Series 3",
                                                    dataPoints:Series3_Data
                                                },
                                                {
                                                    type: "line",
                                                    showInLegend: true,
                                                    legendText: "Series 4",
                                                    dataPoints:Series4_Data
                                                }
                                            ];
                                            res.render('graph', { data: JSON.stringify(data) });
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
        if (Data[item.x] == null || Data[item.x] == 0 || Data[item.x] == undefined) {
            Data[item.x] = parseInt(item.y);
        } else {
            Data[item.x] += parseInt(item.y);
        }
        callback();
    }, (err) => {
        async.eachSeries(Object.keys(Data), (key, resp) => {
            NewArray.push({
                x: key,
                y: Data[key]
            });
            resp();
        }, (err) => {
            NewArray = NewArray.sort(function Sorted(a, b) { // non-anonymous as you ordered...
                return b.x < a.x ? 1 // if b should come earlier, push a to end
                    : b.x > a.x ? -1 // if b should come later, push a to begin
                        : 0;                   // a and b are equal
            });
            callback(false, NewArray);
        })
    })
}
