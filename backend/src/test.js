require("dotenv").config();
const item = require("./models/item");
const {clearQueryResults} = require("./db/utils");

const items = async () => {
    let list = await item.findAll({
        where: {
            id_picking: 1
        }
    });
    list = clearQueryResults(list);
    console.log(list);
}

items();