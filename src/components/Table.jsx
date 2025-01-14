// src/components/Table.jsx

import PropTypes from "prop-types";
import "../styles/Table.css";
import Skill from "./Skill";
import ImgButton from "./ImgButton";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; //테이블에서 사용하는 편집 및 삭제 아이콘
import { GrView } from "react-icons/gr";
import { CiLink } from "react-icons/ci";

//columns, data 기반으로 테이블 동적 렌더링
//action 열의 편집 및 삭제 버튼, 사용자가 데이터 수정하거나 삭제
const Table = ({ columns, data, onEditClick, onDeleteClick, onViewClick, onLinkClick  }) => {
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
                    {
                      row[column].includes("View") && (
                        <ImgButton onClick={() => onViewClick(row)}>
                          <GrView />
                        </ImgButton>
                      )
                    }
                    {
                      row[column].includes("Link") && (
                        <ImgButton onClick={() => onLinkClick(row)}>
                          <CiLink />
                        </ImgButton>
                      )
                    }
                    {
                      row[column].includes("Edit") && (
                        <ImgButton onClick={() => onEditClick(row)}> 
                          <AiOutlineEdit />
                        </ImgButton>
                      )
                    }
                    {
                      row[column].includes("Delete") && (
                        <ImgButton onClick={() => onDeleteClick(row)}>
                          <AiOutlineDelete />
                        </ImgButton>
                      )
                    }
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
  onEditClick: PropTypes.func, //onEditClick을 prop으로 전달
  onDeleteClick: PropTypes.func,
  onViewClick: PropTypes.func,
  onLinkClick: PropTypes.func,
};

export default Table;
