import React from 'react'
import Layout from '../components/Layout/Layout'
import PostListDay from '../components/PostList/PostListDay'
// import Pagination from '../components/Navigation/Pagination/Pagination'

export default class IndexPage extends React.Component {
  render() {
    const { pageContext } = this.props
    const { group } = pageContext

    return (
      <Layout>
        <PostListDay posts={group}/>
        {/* <Pagination pageContext={pageContext} pathPrefix="/" /> */}
      </Layout>
    )
  }
}
