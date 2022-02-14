import React from 'react'

const RangeSlider = (props) => {

  const {name, changeSearchParams, min, max, step, value, label} = props;

  return (
    <div className="nav__range">
      <label htmlFor={name}>{label} {value}</label>
      <input type="range" min={min} max={max} step={step} name={name} value={value} onInput={changeSearchParams} id={name}/>
    </div>
  )
}

export default RangeSlider