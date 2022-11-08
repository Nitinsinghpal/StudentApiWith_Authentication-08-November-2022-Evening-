import React from 'react'
import withRouter from './withRouter';
import { Navigate } from 'react-router-dom';
function Test() {
  var navigate = Navigate;
  return (
    <div>working fine !!!!!  test</div>
  )
}

export default withRouter(Test); 