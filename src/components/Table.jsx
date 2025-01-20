// src/components/Table.jsx

import PropTypes from "prop-types";
import "../styles/Table.css";
import ImgButton from "./ImgButton";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; //테이블에서 사용하는 편집 및 삭제 아이콘
import { GrView } from "react-icons/gr";
import { CiLink } from "react-icons/ci";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RiResetRightLine } from "react-icons/ri";

import { Tag } from 'antd';

//columns, data 기반으로 테이블 동적 렌더링
//action 열의 편집 및 삭제 버튼, 사용자가 데이터 수정하거나 삭제
const Table = ({ columns, data, onEditClick, onDeleteClick, onViewClick, onLinkClick, onSaveClick, onResetClick  }) => {
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
                      <Tag color="blue" key={skillIndex}>{skill}</Tag>
                    ))}
                    {row[column].length > 2 && (
                      <Tag color="blue">{`+${row[column].length - 2}`}</Tag>
                    )}
                  </>
                ) : column === "Action" ? (
                  <div style={{ display: "flex",  gap:"10px"}}>
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
                      row[column].includes("Save") && (
                        <ImgButton onClick={() => onSaveClick(row)}>
                          <MdOutlineSaveAlt />
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
                    {
                      row[column].includes("Reset") && (
                        <ImgButton onClick={() => onResetClick(row)}>
                          <RiResetRightLine />
                        </ImgButton>
                      )
                    }
                  </div>
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
  onSaveClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  onResetClick: PropTypes.func,
};

export default Table;
