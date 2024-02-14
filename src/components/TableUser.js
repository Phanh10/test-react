import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUser } from '../services/UserService';

function BasicExample({ listUsers }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Last Name</th>
          <th>First name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && 
          listUsers.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // State to track current page

  useEffect(() => {
    getUsers(currentPage); // Fetch data for the current page when component mounts
  }, [currentPage]);

  const getUsers = async (selectedPage) => {
    try {
      const res = await fetchAllUser(selectedPage + 1); // Adding 1 to selectedPage as it starts from 0
      if (res && res.data && res.data.data) {
        setListUsers(res.data.data);
        // Calculate pageCount based on fetched data
        setPageCount(res.data.total_pages); // Using total_pages from the API response
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // Update current page when page is clicked
  }

  return (
    <div>
      <BasicExample listUsers={listUsers} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
    </div>
  );
};

export default TableUsers;
