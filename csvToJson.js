const axios = require("axios");

// Get CSV info from url and get JSON resultfrom convertCsvToJSON(csv)
module.exports = csvToJson = (linkToCsv, callback) => {
    axios
        .get(linkToCsv)
        .then((res) => {
            callback(convertCsvToJSON(res.data));
        })
        .catch((err) => {
            throw err;
        });
};

// CSV to JSON Converter
function convertCsvToJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(";");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    return result;
}
