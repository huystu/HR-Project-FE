// src/components/charts/DonutChart.jsx
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DonutChart = ({ title, data, height=400, innerRadius=0, }) => {
    // 총합 계산 (퍼센트를 위해 사용)
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* 도넛 차트 */}
            <div style={{margin: 0}}>
                {title}
                <PieChart width={height} height={height}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" // 중심 x좌표
                        cy="50%" // 중심 y좌표
                        outerRadius={100} // 바깥 원 크기
                        innerRadius={innerRadius} // 안쪽 원 크기 (도넛 효과)
                        fill="#8884d8"
                        label // 라벨 표시
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            {/* 왼쪽 퍼센트 목록 */}
            <div style={{ marginRight: '20px' }}>
                {data.map((entry, index) => {
                const percentage = ((entry.value / total) * 100).toFixed(1); // 퍼센트 계산
                return (
                    <div
                    key={`label-${index}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                    }}
                    >
                    {/* 색상 사각형 */}
                    <div
                        style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: COLORS[index % COLORS.length],
                        marginRight: '8px',
                        }}
                    ></div>
                    {/* 항목 이름과 퍼센트 */}
                    <span>
                        {entry.name}: {percentage}%
                    </span>
                    </div>
                );
                })}
            </div>
        </div>
    );
};

DonutChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    height: PropTypes.number,
    innerRadius: PropTypes.number,
}

export default DonutChart;
