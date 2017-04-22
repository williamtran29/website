import React from 'react'
import Card3D from './Card3D'

export default () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col grid-img" />
      <div className="col">
        foo
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Card3D />
      </div>
      <div className="col grid-img" />
    </div>
  </div>
)
