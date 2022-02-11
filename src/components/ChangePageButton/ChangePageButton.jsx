import React from 'react'

const ChangePageButton = (props) => {

  const {changeSearchParams, id, img} = props;

  return (
    <img src={img} id={id} onClick={changeSearchParams} className="nav__change-search"/>
  )
}

export default ChangePageButton