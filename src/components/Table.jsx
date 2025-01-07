// src/components/Table.jsx

import PropTypes from "prop-types";
import "../styles/Table.css";
import Skill from "./Skill";
import ImgButton from "./ImgButton";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; //테이블에서 사용하는 편집 및 삭제 아이콘

const Table = ({ columns, data, onEditClick }) => {
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
                    {row[column].slice(0, 2).map((skill, skillIndex) => (
                      <Skill key={skillIndex} skill={skill} />
                    ))}
                    {row[column].length > 2 && (
                      <Skill skill={`+${row[column].length - 2}`} />
                    )}
                  </>
                ) : column === "Action" ? (
                  <>
                    <ImgButton onClick={() => onEditClick(row)}>
                      <AiOutlineEdit />
                    </ImgButton>
                    <ImgButton>
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
};

export default Table;
