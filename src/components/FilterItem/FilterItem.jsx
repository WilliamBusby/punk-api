import React from 'react'

const FilterItem = (props) => {

  const {name, changeSearchParams, min, max, step} = props;

  return (
    <div className="checkbox">
      {/* <label htmlFor={name}>{name}</label> */}
      <input type="range" min={min} max={max} step={step} name={name} onInput={changeSearchParams} id={name} list="tickmarks"/>
      <datalist id="tickmarks">
        <option value={min} label={min}></option>
        <option value={(max-min)/4}></option>
        <option value={(max-min)/2} label={(max-min)/2}></option>
        <option value={3*(max-min)/4}></option>
        <option value={max} label={max}></option>
      </datalist>
    </div>
  )
}

export default FilterItem