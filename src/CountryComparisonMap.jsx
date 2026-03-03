import React from 'react';
import { useEffect, useState } from 'react';
import { scaleThreshold } from 'd3-scale';
import { geoMercator, geoPath } from 'd3-geo';
import { FeatureCollection, Point } from 'geojson';
import countries from './countries.json'; // Assuming you have a JSON file with country geometries

const COUNTRY_ELECTRICITY_SHARE = {
    "USA": 13,
    "China": 24,
    "India": 3,
    "Germany": 8,
    "Brazil": 5,
    // Add more countries and their electricity share
};

const thresholdScale = scaleThreshold()
    .domain([0, 20, 40, 60, 80, 100])
    .range(['#f2f0f7', '#cbc9e2', '#9e9ac8', '#6a51a3', '#4a1486']); // FSX color palette

const CountryComparisonMap = ({ year, globalPct }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to find countries where DC share exceeds electricity share
        const findCountries = () => {
            return Object.keys(COUNTRY_ELECTRICITY_SHARE)
                .filter(country => globalPct > COUNTRY_ELECTRICITY_SHARE[country])
                .map(country => ({ name: country }));
        };

        setData(findCountries());
    }, [year, globalPct]);

    return (
        <svg width="800" height="400">
            <g>
                {countries.features.map((feature, index) => {
                    const isHighlighted = data.some(d => d.name === feature.properties.name);
                    return (
                        <path
                            key={index}
                            d={geoPath().projection(geoMercator())(feature)}
                            fill={isHighlighted ? thresholdScale(globalPct) : '#ccc'}
                            stroke="#000"
                        />
                    );
                })}
            </g>
            <text x="10" y="30" className="title">Datacenters consume more than:</text>
            {data.map((country, index) => (
                <text key={index} x="10" y="50 + (index * 20)" >
                    {`Datacenters consume more than ${country.name}`}
                </text>
            ))}
        </svg>
    );
};

export default CountryComparisonMap;
