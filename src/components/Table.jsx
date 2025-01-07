// src/components/Table.jsx

import PropTypes from "prop-types";
import "../styles/Table.css";
import Skill from "./Skill";

import ImgButton from "./ImgButton";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Table = ({ columns, data }) => {
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
                    <ImgButton><AiOutlineEdit /></ImgButton>
                    <ImgButton><AiOutlineDelete /></ImgButton>
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
};

export default Table;
