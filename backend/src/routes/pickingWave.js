require("dotenv").config();

const express = require("express");
const router = express.Router();
const {clearQueryResults} = require("./utils/dbUtils");

const item = require("./models/item");
const picking_wave = require("./picking_wave");

//TODO: delete picking waves

//TODO: get all picking waves
router.get("/", async (_, res) => {
    
    const pWaves = clearQueryResults(await picking_wave.findAll());
    
    return res.json(pWaves);
    
});

//TODO: get picking wave items
router.get("/:id/items", async (req, res) => {
    
    const id = req.params.ref;
    const items = clearQueryResults(await item.findAll({
        where: {
            id_picking: id,
        },
    }));
    
    return res.json(items);
});

//TODO: create picking wave
router.post("/create", async (req, res) => {
    
    const {ref,date} = req.nody
    const pWave = await picking_wave.create(
        {
            ref,
            date
        },
        {
            fields: ["ref","final_date"]
        }
    )
    
    return res.status(201).json(pWave);
    
});

//TODO: add/update picking wave items
router.post("/:id/items", async (req, res) => {
    const id = req.params.id;
    const items = req.body.items;

    await Promise.all()
    const items = clearQueryResults(await item.findAll({
        where: {
            id_picking: id,
        },
    }));
    
    return res.status(201).send();
});

//TODO: remove picking wave items

module.exports = router;
