import React, { useState, useEffect } from "react"
import NativeSelect from '@material-ui/core/NativeSelect';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { firestore, auth } from "../firebase"
const skillsasd = [{ name: 'web design', valid: false }, { name: 'Wordpress', valid: false }, { name: 'microsoft word', valid: false }, { name: 'management', valid: false }, { name: 'excel', valid: false }]
export const Skills = ({ arrayskill, setarrayskill }) => {
    const [skillsubmit, setskillsumbit] = useState(false);
    return (<>
        <h3 style={{ color: "white" }}> Skills</h3>
        {arrayskill.map((x, i) => {
            if (x.valid) {
                return <NativeSelect
                    value={x.name}
                    onChange={() => { }}
                    variant="outlined"
                    name="skills"
                    inputProps={{
                        id: 'name-native-error',
                    }}
                    style={{ width: '100%', marginBottom: '10px' }}
                    key={i + "select" + i}
                    disabled
                >
                    {skillsasd.map((item, key) => {
                        return (<option value={item.name} key={JSON.stringify(item) + "skills" + i + String(key)}>{item.name}</option>)
                    })}
                </NativeSelect>
            }
            else {
                return (<></>)
            }
        })}
        {skillsubmit && <NativeSelect
            onChange={(e) => {
                let skillz = arrayskill
                skillz.forEach((element, key) => {
                    if (element.name == e.target.value) {
                        element.valid = true;
                    }

                });
                setarrayskill(skillz)
                setskillsumbit(false)
            }}
            variant="outlined"
            name="skills"
            inputProps={{
                id: 'name-native-error',
            }}
            style={{ width: '100%', marginBottom: '10px' }}
            key={"skillinput"}
        >
            <option value=""></option>
            {skillsasd.map((item, key) => {
                return (<option value={item.name} key={JSON.stringify(item) + "skills" + String(key)}>{item.name}</option>)
            })}
        </NativeSelect>}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Fab color="primary" aria-label="add" onClick={() => {
                setskillsumbit(true)
            }}>
                <AddIcon />
            </Fab>
        </div></>)
}