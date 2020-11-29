const clearQueryResults = (results) => (
    results.map(({dataValues}) => dataValues)
)

module.exports = {clearQueryResults};