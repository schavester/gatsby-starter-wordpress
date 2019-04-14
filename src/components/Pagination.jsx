/* eslint-disable no-lonely-if */
import React from 'react'
import { Link } from 'gatsby'
import styles from "./Pagination.module.css"

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath, numberOfPages, pageNumber } = pageContext

  if (numberOfPages <= 1) return null

  const currentPage = pageNumber + 1 || 1
  // Magic number from gatsby-node.js
  let startPage 
  let endPage
  
  if (numberOfPages <= 5) {
    startPage = 1
    endPage = numberOfPages
  } else {
    if (currentPage <= 2) {
      startPage =  1
      endPage = 5
    } else if (currentPage + 2 >= numberOfPages) {
      startPage = currentPage - 2
      endPage = numberOfPages
    } else {
      startPage = currentPage - 2
      endPage = currentPage + 2
    }
  }

  const pages = []
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i)
  }

  return (
    <nav className="pagination" role="navigation">
      <div className="navbar navbar-menu">
        <ul className="pagination">
          <li className={currentPage === 1 ? styles.disabled : styles.pagination}>
            <Link to="/" className={currentPage === 1 ? styles.linkDisabled : styles.link}>
              First
            </Link>
          </li>
          <li className={currentPage === 1 ? styles.disabled : styles.pagination}>
            <Link to={previousPagePath} rel="prev" className={currentPage === 1 ? styles.linkDisabled : styles.link}>
              Previous
            </Link>
          </li>
          {
            pages.map((pageIndex) => (
                <li className={pageIndex === currentPage ? styles.active : styles.pagination}>
                  <Link to={`/page/${pageIndex}`} className={pageIndex === currentPage ? styles.linkCurrent : styles.link}>
                    {pageIndex}
                  </Link>
                </li>
              ))
          }
          <li className={currentPage === numberOfPages ? styles.disabled : styles.pagination}>
            <Link to={nextPagePath} rel="next" className={currentPage === numberOfPages ? styles.linkDisabled : styles.link}>
              Next
            </Link>
          </li>
          <li className={currentPage === numberOfPages ? styles.disabled : styles.pagination}>
            <Link to={`/page/${numberOfPages}`} className={currentPage === numberOfPages ? styles.linkDisabled : styles.link}>
              Last
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Pagination
