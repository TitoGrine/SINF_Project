const distancesMap = require("../../../docs/warehouse_distance_map.json")

const generatePickingRoute = (zones) => {
    
    let connections = {}

    for(let zone of zones) {
        connections[zone] = distancesMap[zone]
    }

    return connections
}

module.exports = generatePickingRoute;


