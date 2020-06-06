import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/commonfunctions";
import axios from "axios";
import isEmpty from "../../utils/is-empty";
import Spinner from "../../utils/spinner";

const tablehead = [
  "Code",
  "Name",
  "Image",
  "Category",
  "Brand",
  "status",
  "In Stock",
  "Price",
  "Sale Price",
  "Updated",
  "Actions",
];

function ProductPtable(props) {
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);  

  async function loadPage() {
    // get page of items from api
    const params = new URLSearchParams(props.params);
    const page = parseInt(params.get("page")) || 1;
    if (page !== pager.currentPage) {
      const res = await axios.get(`/api/product/get-all?page=${page}`);
      const pager = res.data.pager;
      const pageOfItems = res.data.pageOfItems;
      setPager(pager);
      setPageOfItems(pageOfItems);
    }
  }

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  let list;
  if (pageOfItems.length === 0) {
    list = (
      <tr>
        <td align="center" colspan="12">
          <Spinner />
        </td>
      </tr>
    );
  } else {
    list = pageOfItems.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.code}</td>
          <td>{d.name}</td>
          <td>{d.image}</td>
          <td>{d.categoryId}</td>
          <td>{d.brandId}</td>
          <td>{d.status}</td>
          <td>{d.stockStatus}</td>
          <td>{d.price}</td>
          <td>{d.salePrice}</td>
          <td>{formatDate(d.updatedAt)}</td>          
        </tr>
      );
    });
  }

  let pagination;
  if (isEmpty(pager.currentPage)) {
    pagination = "";
  } else {
    pagination = (
      <ul className="pagination">
        <li
          className={`page-item first-item ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
        >
          <Link to={{ search: `?page=1` }} className="page-link">
            First
          </Link>
        </li>
        <li
          className={`page-item previous-item ${
            pager.currentPage === 1 ? "disabled" : ""
          }`}
        >
          <Link
            to={{ search: `?page=${pager.currentPage - 1}` }}
            className="page-link"
          >
            Previous
          </Link>
        </li>
        {pager.pages.map((page) => (
          <li
            key={page}
            className={`page-item number-item ${
              pager.currentPage === page ? "active" : ""
            }`}
          >
            <Link to={{ search: `?page=${page}` }} className="page-link">
              {page}
            </Link>
          </li>
        ))}
        <li
          className={`page-item next-item ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
        >
          <Link
            to={{ search: `?page=${pager.currentPage + 1}` }}
            className="page-link"
          >
            Next
          </Link>
        </li>
        <li
          className={`page-item last-item ${
            pager.currentPage === pager.totalPages ? "disabled" : ""
          }`}
        >
          <Link
            to={{ search: `?page=${pager.totalPages}` }}
            className="page-link"
          >
            Last
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <>
      <table
        id="example"
        className="table table-striped table-bordered"
        style={{ Width: "100%" }}
      >
        <thead>
          <tr>
            {tablehead.map((head, index) => {
              return <th key={index}>{head}</th>;
            })}
          </tr>
        </thead>
        <tbody className="product-list">{list}</tbody>
        <tfoot>
          <tr>
            {tablehead.map((head) => {
              return <th key={head}>{head}</th>;
            })}
          </tr>
        </tfoot>
      </table>
      {pagination}
    </>
  );
}

export default ProductPtable;
