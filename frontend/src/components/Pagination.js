import "../style/Pagination.css";

const Pagination = ({
  totalUsers,
  usersPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  for (let i = 1; i < Math.ceil(totalUsers / usersPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      {pages.map((page, index) => {
        const isCurrentPage = page === currentPage;
        return (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={`pageButton ${isCurrentPage ? "currentPage" : ""}`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
