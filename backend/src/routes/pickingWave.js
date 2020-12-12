require("dotenv").config();
const express = require("express");
const router = express.Router();
const { clearQueryResults } = require("../utils/dbUtils");
const item = require("../models/item");
const picking_wave = require("../models/picking_wave");
const generatePickingRoute = require("../utils/pickRouteUtils");

// get all picking waves
router.get("/", async (_, res) => {
    const pWaves = clearQueryResults(await picking_wave.findAll());
    return res.json(pWaves);
});

// get picking wave items
router.get("/:ref/items", async (req, res) => {
    const ref = req.params.ref;
    const items = clearQueryResults(await item.findAll({
        where: {
            ref_picking: ref,
        },
    }));

    return res.json(items);
});

// create picking wave
router.post("/create", async (req, res) => {
    const {
        date,
        items
    } = req.body
    const nextID = await picking_wave.max('id') + 1;
    const year = new Date().getFullYear();
    const pwRef = "PW" + year + "_" + nextID;

    const pWave = await picking_wave.create({
        ref: pwRef,
        final_date: date
    }, {
        fields: ["ref", "final_date"]
    })

    if (!pWave) {
        return res.status(500).json({
            message: "Error creating picking wave."
        })
    }

    await Promise.all(
        items.map(async ({
            ref,
            quantity,
            order_ref,
            location,
            line_number
        }) => {
            return await item.create({
                ref,
                quantity,
                order_ref,
                warehouse_zone: location,
                line_number,
                ref_picking: pwRef
            }, {
                fields: [
                    "ref",
                    "quantity",
                    "order_ref",
                    "warehouse_zone",
                    "line_number",
                    "ref_picking"
                ]
            });
        })
    );

    return res.status(201).json(pWave);
});

// delete picking waves
router.delete("/:ref", async (req, res) => {
    const {
        ref
    } = req.params;

    await item.destroy({
        where: {
            ref_picking: ref
        }
    })

    const i = await picking_wave.destroy({
        where: {
            ref: ref
        }
    });

    if (i > 0)
        return res.status(200).send();

    return res.status(404).send();
});


// generate picking wave route
router.get("/:ref/route", async (req, res) => {
    const { ref } = req.params;

    const items = clearQueryResults(await item.findAll({
        where: {
            ref_picking: ref
        }
    }))

    if (!items) {
        return res.status(404).json({
            message: "Picking Wave does not exist or has no items."
        })
    }

    let zones = new Set();

    items.forEach((item) => {
        zones.add(item.warehouse_zone);
    })

    const route = generatePickingRoute(zones);

    return res.status(200).json({
        message: "Route generated successfully.",
        route : route
    })

})

module.exports = router;