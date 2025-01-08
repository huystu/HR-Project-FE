// src/components/Pagination.jsx
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const handlePageClick = (selectedItem) => {
    onPageChange(selectedItem.selected + 1); // selectedItem.selected는 0부터 시작하므로 1을 더해줌
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={null}
        forcePage={currentPage - 1} // 0부터 시작하므로 현재 페이지에서 1을 뺀 값을 사용
        pageCount={pageCount}
        pageRangeDisplayed={10} // 한 번에 보여줄 페이지 수
        marginPagesDisplayed={0} // 이전, 다음으로 표시할 페이지 수
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
