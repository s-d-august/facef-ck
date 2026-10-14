import React from 'react';
import { useEffect } from 'react';
import './setters.css';

const Setters = ({ sensitivity, max, secret, modes, JP, setJP }) => {

    useEffect(() => {
        const settingsIcon = document.getElementById("settingsIcon")
        const hideSettingsButton = document.getElementById("hideSettingsButton")
        settingsIcon.addEventListener("click", showHideSettings)
        hideSettingsButton.addEventListener("click", showHideSettings)

        function showHideSettings() {
            const elements = ["settersDiv", "settingsContents", "settingsIcon"]
            elements.forEach((el) => {
                document.getElementById(el).classList.toggle("collapsed")
            })
        }

        return () => {
            settingsIcon.removeEventListener("click", showHideSettings)
            hideSettingsButton.removeEventListener("click", showHideSettings)
        }
    }, [])

    return (
        <div id='settersDiv' className='collapsed'>
            <svg
                id='settingsIcon'
                viewBox="0 -960 960 960"
                fill="#FFFFFF">
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
            <div id='settingsContents' className='collapsed'>

                <div id="sensitivitySettersDiv">
                    <p>{JP ? "興奮の上昇率" : "Sensitivity"}</p>
                    {sensitivity.map(({ id, label, labelJP, setter, value, ...inputProps }) => (
                        <input
                            key={id}
                            id={id}
                            type="range"

                            className="sensitivitySet"
                            min={0}
                            max={5}
                            step={0.1}
                            title={JP ? labelJP : label}
                            value={value ?? 1}
                            onChange={e => setter(e.target.value)}
                            {...inputProps}
                        />
                    ))}
                </div>
                <div id='flexRow'>


                    <div id='maxSettersDiv'>
                        {max.map(({ id, setter, value, label, labelJP }) => (
                            <div className='maxSetterWrap' key={id}>
                                <label htmlFor={id}>{JP ? labelJP : label}</label>
                                <input
                                    id={id}
                                    type='number'
                                    className='maxSet'
                                    min="100"
                                    step="1"
                                    value={value ?? 100}
                                    onChange={e => {
                                        const val = Number(e.target.value);
                                        setter(val === 0 ? 100 : val);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div id='depthSecret'>
                        <div id='modeSetterDiv'>
                            <label for={modes.id}>{modes.label}</label>
                            <br />
                            <select
                                name={modes.id}
                                id={modes.id}
                                onChange={e => modes.setter(e.target.value)}>
                                {modes.modes.map((el) => (
                                    <option
                                        key={JP ? el.jp : el.en}
                                        value={el.en}

                                    >{JP ? el.jp : el.en}</option>
                                ))}
                            </select>
                        </div>

                        <div id='langSetterDiv'>
                            <label for="langSetter">{JP ? "言語： " : "Language: "}</label>
                            <br />
                            <select
                                name="langSetter"
                                id="langSetter"
                                value={JP ? "true" : "false"}
                                onChange={e => {
                                    setJP(e.target.value === "true");
                                    localStorage.setItem("JP", e.target.value);
                                }}
                            >
                                <option value="false">English</option>
                                <option value="true">日本語</option>
                            </select>
                        </div>
                    </div>
                    <div id='secretSettingsButtons'>
                        <div id='secret'>

                            <label className='switch'>
                                <input
                                    checked={secret.value}
                                    id={secret.id}
                                    type="checkbox"
                                    onChange={e => {
                                        secret.setter(e.target.checked)
                                        localStorage.setItem("ravenousModeOn", e.target.checked)
                                    }} />
                                <span className="slider round"></span>
                            </label>
                            <p>{secret.label}</p>
                        </div>
                        <button id='hideSettingsButton'>
                            {JP ? "設定を閉まる" : "Hide Settings"}
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Setters;