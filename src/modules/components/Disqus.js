import React from 'react'

class Disqus extends React.Component {
  componentDidMount() {
    window.disqus_config = function config() {
      this.page.url = this.props.url
      this.page.identifier = this.props.pageIdentifier
    }
    const d = document
    const s = d.createElement('script')
    s.src = 'https://smooth-code.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    ;(d.head || d.body).appendChild(s)
  }

  render() {
    return <div id="disqus_thread" />
  }
}

export default Disqus
