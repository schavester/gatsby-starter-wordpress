import React from 'react'
import Layout from '../components/Layout/Layout'
import PostListMonth from '../components/PostList/PostListMonth'
// import Pagination from '../components/Navigation/Pagination/Pagination'

export default class IndexPage extends React.Component {
  render() {
    const { pageContext } = this.props
    const { group } = pageContext

    return (
      <Layout>
        <PostListMonth posts={group}/>
        {/* <Pagination pageContext={pageContext} pathPrefix="/" /> */}
      </Layout>
    )
  }
}
