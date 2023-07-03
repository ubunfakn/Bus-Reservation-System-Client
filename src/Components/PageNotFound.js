import React from 'react'
import {Link} from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className='' style={{backgroundColor:'white', backgroundRepeat:'no-repeat', height:'100%'}}>
        <h1 className='text-danger'>Oops!!  Error 4O4..</h1>
      <h1>
        Page Not Found......
      </h1>
      <h2><Link to={"/"}>Go back to homepage--&gt;</Link></h2>
    </div>
  )
}
