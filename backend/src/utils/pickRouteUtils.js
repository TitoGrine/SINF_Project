const distancesMap = require("../../../docs/warehouse_distance_map.json")

function getNextStop(currStop, zones) {
    let min = Number.MAX_VALUE;
    let nextZone = "";

    for (let zone of zones) {
        if(currStop == zone) {
            continue;
        } else if (!(zone in distancesMap[currStop])) {
            if (distancesMap[zone][currStop] < min)
                min = distancesMap[zone][currStop]
            nextZone = zone
        } else if (distancesMap[currStop][zone] < min) {
            min = distancesMap[currStop][zone]
            nextZone = zone
        }
    }

    return nextZone
}

const generatePickingRoute = (zones) => {

    let pathZones = zones
    const firstStep = getNextStop("D0", pathZones);
    let routes = [firstStep]

    while (pathZones.size >= 2) {
        const nextStop = getNextStop(routes[routes.length - 1], pathZones);
        pathZones.delete(routes[routes.length - 1]);
        routes.push(nextStop);
    }
    
    return routes
}

module.exports = generatePickingRoute;


