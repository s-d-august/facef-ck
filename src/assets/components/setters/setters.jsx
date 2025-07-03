import React from 'react';
import './setters.css';

const Setters = ({ sensitivity, max }) => (
    <div id='settersDiv'>
        <div id="sensitivitySettersDiv">
            {sensitivity.map(({ id, label, setter, value, ...inputProps }) => (
                <input
                    key={id}
                    id={id}
                    type="range"
                    className="sensitivitySet"
                    min={0}
                    max={5}
                    step={0.1}
                    title={label}
                    value={value ?? 1}
                    onChange={e => setter(e.target.value)}
                    {...inputProps}
                />
            ))}
        </div>
        <div id='maxSettersDiv'>
            {max.map(({ id, setter, value, label }) => (
                <div className='maxSetterWrap'>
                    <label for={id}>{label}</label>
                    <input
                        key={id}
                        id={id}
                        type='number'
                        className='maxSet'
                        min="100"
                        step="1"
                        value={value ?? 1}
                        onChange={e => setter(e.target.value)}
                    />
                </div>
            ))}
        </div>
    </div>
)

export default Setters;