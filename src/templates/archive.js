import React from 'react'
import Layout from '../components/Layout/Layout'
import Archive from '../components/Aside/Archive'

const h1Style = {
    margin: '6rem 0 0 0'
};

const ArchiveTemplate = () => (
    <Layout>
        <h1 style={h1Style}>Archive</h1>
      <Archive/>
    </Layout>
  )

export default ArchiveTemplate
