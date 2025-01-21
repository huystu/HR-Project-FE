// src/components/charts/BarGraph.jsx
import React from "react";
import { Chart, } from "react-charts";
import PropTypes from 'prop-types';

const BarGraph = ({ title, data, height=400, }) => {
    
    const primaryAxis = React.useMemo( () => (
        { getValue: (datum) => datum.primary,  }
    ), [] );
    
    const secondaryAxes = React.useMemo( () => [
        {
            getValue: (datum) => datum.secondary,
            hardMin: 0, // y축 최소값 설정
            hardMax: 100, // y축 최대값 설정
            tickCount: 11, // 0부터 100까지 10단위로 표시
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
        
BarGraph.propTypes = {
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

export default BarGraph;
