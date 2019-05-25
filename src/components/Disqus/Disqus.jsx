import React, { Component } from 'react';
import DisqusThread from './DisqusThread'

class Disqus extends Component {
  render() {
    const { postNode } = this.props
    const url = `${window.location.protocol}/${window.location.host}/${postNode.slug}`
    console.log(url)
    return (
      <div>
        <DisqusThread
          id={postNode.id}
          title={postNode.title}
          path={postNode.slug}
        />
      </div>
    )
  }
}

export default Disqus;
