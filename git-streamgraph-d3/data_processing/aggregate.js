const fs = require("fs");
const d3 = require('d3');
const {
    utcWeek,
    utcWeeks,
    extent,
    timeParse,
    group,
} = d3;

const jsonPath = './data/all-d3-commits.json';

const parseDate = timeParse('%Y-%m-%d');

const layer = (d) => d.repo;

const aggregate = () => {
    const dataString = fs.readFileSync(jsonPath);
    const data = JSON.parse(dataString);

    data.forEach((d) => {
        d.date = utcWeek.floor(
            parseDate(d.date.split(' ')[0])
        );
    });
    const groupedData = group(
        data,
        (d) => d.date,
        layer
    );
    const layerGroupedData = group(data, layer);

    const layers = Array.from(
        layerGroupedData.keys()
    );

    const [start, stop] = extent(
        data,
        (d) => d.date
    );
    const dates = utcWeeks(start, stop);

    const dataBylayer = new Map();

    const aggregatedData = {
        dates: dates,
        repositories: {}
    };

    for (const layer of layers) {
        const layerData = dates.map((date) => {
            const value = groupedData.get(date);
            const commits = value
                ? value.get(layer)
                : null;
            const commitCount = commits
                ? commits.length
                : 0;
            return commitCount;
        });
        aggregatedData.repositories[layer] = layerData;
    }
    fs.writeFileSync(`./data/aggregated-data.json`, JSON.stringify(aggregatedData))
}

module.exports = aggregate;
