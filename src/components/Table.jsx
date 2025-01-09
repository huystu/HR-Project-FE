// src/components/Table.jsx

import PropTypes from "prop-types";
import "../styles/Table.css";
import Skill from "./Skill";
import ImgButton from "./ImgButton";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; //테이블에서 사용하는 편집 및 삭제 아이콘

//columns, data 기반으로 테이블 동적 렌더링
//action 열의 편집 및 삭제 버튼, 사용자가 데이터 수정하거나 삭제
const Table = ({ columns, data, onEditClick, onDeleteClick  }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, i) => (
              <td key={i}>
                {column === "Skills" ? (
                  <>
                  {/*첫 두개의 기술만 표시하고 나머지 기술은 +x 형태로 개수 표시*/}
                    {row[column].slice(0, 2).map((skill, skillIndex) => (
                      <Skill key={skillIndex} skill={skill} />
                    ))}
                    {row[column].length > 2 && (
                      <Skill skill={`+${row[column].length - 2}`} />
                    )}
                  </>
                ) : column === "Action" ? (
                  <>
                  {/*ImgButton 컴포넌트로 아이콘을 감싸고, onClick 이벤트 처리하여 클릭된 행의 데이터를 onEditClick 함수로 전달*/}
                  {/*onEditClick 함수는 EmployeePage.jsx에 정의*/}
                    <ImgButton onClick={() => onEditClick(row)}>
                      <AiOutlineEdit />
                    </ImgButton>
                    <ImgButton onClick={() => onDeleteClick(row)}>
                      <AiOutlineDelete />
                    </ImgButton>
                  </>
                ) : (
                  row[column]
                )}
              </td>
                ))}
            </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEditClick: PropTypes.func.isRequired, //onEditClick을 prop으로 전달
  onDeleteClick: PropTypes.func.isRequired,
};

export default Table;
