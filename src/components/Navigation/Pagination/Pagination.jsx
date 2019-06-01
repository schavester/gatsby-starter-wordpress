/* eslint-disable no-lonely-if */
import React from 'react'
import { Link } from 'gatsby'
import styles from "./Pagination.module.css"

const Pagination = ({ pageContext, pathPrefix }) => {
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
      startPage = 1
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
    <nav>
        <Link to={pathPrefix} className={currentPage === 1 ? styles.linkTextDisabled : styles.linkText}>
          First
        </Link>
        <Link to={previousPagePath} rel="prev" className={currentPage === 1 ? styles.linkTextDisabled : styles.linkText}>
          Previous
        </Link>
        {
          pages.map((pageIndex) => (
            <Link key={pageIndex} to={pageIndex === 1 ? `${pathPrefix}` : `${pathPrefix}/page/${pageIndex}`} className={pageIndex === currentPage ? styles.linkCurrent : styles.link}>
              {pageIndex}
            </Link>
          ))
        }
        <Link to={nextPagePath} rel="next" className={currentPage === numberOfPages ? styles.linkTextDisabled : styles.linkText}>
          Next
        </Link>
        <Link to={`${pathPrefix}/page/${numberOfPages}`} className={currentPage === numberOfPages ? styles.linkTextDisabled : styles.linkText}>
          Last
        </Link>
    </nav>
  )
}

export default Pagination
