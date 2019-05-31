import React from 'react'
import Layout from '../components/Layout/Layout'
import PostListYear from '../components/PostList/PostListYear'
// import Pagination from '../components/Navigation/Pagination/Pagination'

export default class IndexPage extends React.Component {
  render() {
    const { pageContext } = this.props
    const { group } = pageContext

    return (
      <Layout>
        <PostListYear posts={group}/>
        {/* <Pagination pageContext={pageContext} pathPrefix="/" /> */}
      </Layout>
    )
  }
}
