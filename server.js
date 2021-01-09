const express = require("express");
const crypto = require("crypto");
const csvToJson = require("./csvToJson");

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());

server.post("/csvToJson", (req, res) => {
    const { url, selected_fields } = req.body;

    csvToJson(url, (result) => {
        // Generate a token
        const conversion_key = crypto.randomBytes(24).toString("hex");

        // If no selected fields
        if (!selected_fields || !selected_fields.length) {
            return res.json({ conversion_key, result });
        } else {
            var json = [];
            result.forEach((element) => {
                jsonElement = {};

                for (let index = 0; index < selected_fields.length; index++) {
                    jsonElement[selected_fields[index]] =
                        element[selected_fields[index]];
                }
                json.push(jsonElement);
            });

            return res.json({ conversion_key, json });
        }
    });
});

server.listen(PORT, console.log(`Server running on port ${PORT}`));
