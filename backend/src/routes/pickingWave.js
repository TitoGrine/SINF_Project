require("dotenv").config();

const express = require("express");
const router = express.Router();
const { clearQueryResults } = require("../utils/dbUtils");

const item = require("../models/item");
const picking_wave = require("../models/picking_wave");
// const verifySession = require("../utils/authUtils");

// get all picking waves
router.get("/", async (_, res) => {
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

    const pWaves = clearQueryResults(await picking_wave.findAll());
    return res.json(pWaves);
});

// get picking wave items
router.get("/:ref/items", async (req, res) => {
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

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
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

    const { ref, date } = req.body
    const pWave = await picking_wave.create(
        {
            ref,
            final_date: date
        },
        {
            fields: ["ref", "final_date"]
        }
    )

    return res.status(201).json(pWave);

});

// add/update picking wave items
router.post("/:ref/items", async (req, res) => {
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

    const ref_picking = req.params.ref;
    const items = req.body.items;
    console.log(items);
    await Promise.all(
        items.map(async ({ ref, product_name, quantity, order_ref, warehouse_zone }) => {
            const result = await item.findOne({
                where: {
                    ref,
                    product_name,
                    quantity,
                    order_ref,
                    warehouse_zone,
                    ref_picking: ref_picking,
                }
            });

            if (result) {
                return result.update({
                    quantity: result.quantity + quantity
                });
            } else {
                return item.create(
                    {
                        ref,
                        product_name,
                        quantity,
                        order_ref,
                        warehouse_zone,
                        ref_picking: ref_picking
                    },
                    {
                        fields: [
                            "ref",
                            "product_name",
                            "quantity",
                            "order_ref",
                            "warehouse_zone",
                            "ref_picking"
                        ]
                    }
                );
            }
        })
    );

    return res.status(201).send();
});

//remove picking wave items
router.delete("/:ref/item/:ref_item", async (req, res) => {
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

    const { ref, ref_item } = req.params;

    const i = await item.destroy({
        where: {
            ref: ref_item,
            ref_picking: ref
        }
    });

    if (i > 0)
        return res.status(200).send();

    return res.status(404).send();
});

// delete picking waves
router.delete("/:ref", async (req, res) => {
    // if (!verifySession(req)) {
    //     return res.status(401).json({
    //         message: "Invalid session token.",
    //     });
    // }

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
