require("dotenv").config();
const express = require("express");
const router = express.Router();
const { clearQueryResults } = require("../utils/dbUtils");
const item = require("../models/item");
const picking_wave = require("../models/picking_wave");
const { generatePickRoute } = require("../utils/pickRouteUtils");
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
            location
        }) => {
            return await item.create({
                ref,
                quantity,
                order_ref,
                warehouse_zone: location,
                ref_picking: pwRef
            }, {
                fields: [
                    "ref",
                    "quantity",
                    "order_ref",
                    "warehouse_zone",
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

// delete picking waves
router.delete("/:ref", async (req, res) => {
    const { ref } = req.params;

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

module.exports = router;
