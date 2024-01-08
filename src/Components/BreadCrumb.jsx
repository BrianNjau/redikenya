import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({title=""}) => {
  return (
    <>
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {title}
      </li>
    </ol>
  </>
  
    )
}

export default BreadCrumb