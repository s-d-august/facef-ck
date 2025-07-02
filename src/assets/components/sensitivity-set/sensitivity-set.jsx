import React from 'react';
import './sensitivity-set.css';

const SensitivitySet = ({ setters }) => (
    <div id="sensitivitySettersDiv">
        {setters.map(({ id, label, setter, value, ...inputProps }) => (
            <input
                key={id}
                id={id}
                type="range"
                orient="vertical"
                className="sensitivitySet"
                min={0}
                max={2}
                step={0.1}
                title={label}
                value={value ?? 1}
                onChange={e => setter(e.target.value)}
                {...inputProps}
            />
        ))}
    </div>
);

export default SensitivitySet;