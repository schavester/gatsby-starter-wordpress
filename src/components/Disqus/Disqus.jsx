import React, { Component } from 'react';
import DisqusThread from './DisqusThread'

class Disqus extends Component {
  render() {
    const { postNode } = this.props
    let url = ""
    if (typeof window !== 'undefined') {
      url = `${window.location.protocol}/${window.location.host}/${postNode.slug}`
    }
    return (
      <div>
        <DisqusThread
          id={postNode.id}
          title={postNode.title}
          path={url}
        />
      </div>
    )
  }
}

export default Disqus;
