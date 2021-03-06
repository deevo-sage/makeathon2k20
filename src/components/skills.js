import React, { useState, useEffect } from "react"
import NativeSelect from '@material-ui/core/NativeSelect';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { firestore, auth } from "../firebase"
const skillsasd = [{ name: 'web design', valid: false }, { name: 'Wordpress', valid: false }, { name: 'microsoft word', valid: false }, { name: 'management', valid: false }, { name: 'excel', valid: false }]
export const Skills = ({ userdata, setuserdata }) => {
    const [skillamount, setskillamount] = useState();
    const [tempskills, settempskill] = useState([]);
    const [skillsubmit, setskillsumbit] = useState(false);
    useEffect(() => {
        if (userdata) {
            let skillis = userdata.skills, count = 0;
            for (let key in skillis) {
                if (skillis[key].valid === true) {
                    count += 1
                }
            }
            setskillamount(count)
        }
    }, [userdata])
    useEffect(() => {
        let t = []
        for (let i = 0; i < skillamount; i++) {
            t.push(i)
        }
        settempskill(t)
    }, [skillamount])
    return (<>
        <h3 style={{color:"white"}}> Skills</h3>
        {userdata &&
            userdata.skills.map((x, i) => {
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
                var data = userdata.skills
                for (let key in userdata.skills) {
                    if (userdata.skills[key].name == e.target.value) {
                        if (userdata.skills[key].valid) {
                            setskillsumbit(false)
                            break
                        }
                        else {
                            data[key].valid = true;
                            firestore.collection("users").doc(auth.currentUser.uid).update({
                                skills: data
                            })
                            setskillsumbit(false)
                            break
                        }
                    }
                }
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