import React from 'react'

const FilterItem = (props) => {

  const {name, changeSearchParams, min, max, step, value, label} = props;

  const currentValue = Number(String(value).replace("01-", ""));

  return (
    <div className="nav__range">
      <label htmlFor={name}>{label} {value}</label>
      <input type="range" min={min} max={max} step={step} name={name} value={currentValue} onInput={changeSearchParams} id={name}/>
    </div>
  )
}

export default FilterItem