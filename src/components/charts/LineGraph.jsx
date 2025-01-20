// src/components/charts/LineGraph.jsx
import React from "react";
import { Chart, } from "react-charts";
import PropTypes from 'prop-types';


const LineGraph = ({ title, data, height }) => {
    
    const primaryAxis = React.useMemo( () => ( {
        getValue: (datum) => datum.primary,
    }), [] );
    
    const secondaryAxes = React.useMemo( () => [
        { getValue: (datum) => datum.secondary,
            elementType: 'line',
         },
    ], [] );

    return (
        <>
        {title}
        <div style={{width: "100%", height: `${height}px`}}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>
        </>
    );
};
        
LineGraph.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    primary: PropTypes.string.isRequired,
                    secondary: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: PropTypes.number, 
}

export default LineGraph;
