import React from 'react'
import Layout from '../components/Layout/Layout'
import PostListMonth from '../components/PostList/PostListMonth'
import Pagination from '../components/Navigation/Pagination/Pagination'

export default class IndexPage extends React.Component {
  render() {
    const { pageContext } = this.props
    const { group, pageCount, index, pathPrefix} = pageContext

    const previousPagePath = index !== 1 ? `/${pathPrefix}/page/${index}` : `/${pathPrefix}`
    const nextPagePath = index !== pageCount ? `/${pathPrefix}/page/${index}` : `/${pathPrefix}/page/${pageCount}`
    const paginationData = { previousPagePath, nextPagePath, numberOfPages: pageCount, pageNumber: index - 1}

    return (
      <Layout>
        <PostListMonth posts={group}/>
        <Pagination pageContext={paginationData} pathPrefix={`/${pathPrefix}`} />
      </Layout>
    )
  }
}
