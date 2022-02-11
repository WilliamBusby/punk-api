import React from 'react'

const FilterItem = (props) => {

  const {name, changeSearchParams, min, max, step} = props;

  return (
    <div className="nav__range">
      <label htmlFor={name}>{name.replace("nav__", "")}</label>
      <input type="range" min={min} max={max} step={step} name={name} onInput={changeSearchParams} id={name} list={`tickmarks-${name}`}/>
      <datalist id={`tickmarks-${name}`}>
        <option value={min} label={min}>{min}</option>
        <option value={max} label={max}>{max}</option>
      </datalist>
    </div>
  )
}

export default FilterItem