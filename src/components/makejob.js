import React, { useState, useEffect } from "react"
import Fab from '@material-ui/core/Fab';
import Text from "@material-ui/core/TextField"
import AddIcon from '@material-ui/icons/Add';
import { map } from 'lodash'
import { Skills } from "./jobskill";
import { Button } from "@material-ui/core";
import firebase, { auth, firestore } from "../firebase"
const skills = [{ name: 'web design', valid: false }, { name: 'Wordpress', valid: false }, { name: 'microsoft word', valid: false }, { name: 'management', valid: false }, { name: 'excel', valid: false }]

export const Jobs = ({ user, userdata, setuserdata, constuserdata }) => {
    const [count] = useState(userdata.workexp.length)
    const [workexpsubmit, setworkexpsubmit] = useState(false);
    const [item, setitem] = useState({})
    const [arrayskill, setarrayskill] = useState(skills)
    const handleSubmit = async () => {
        const date = new Date();
        const month = date.getMonth() + 1
        const day = date.getDay()
        const year = date.getFullYear()
        const Stringdate = day.toString(2) + "/" + month.toString(2) + "/" + year.toString(4)
        await firestore.collection('users').doc(user.uid).collection('Jobs').add({
            date: Stringdate,
            title: item.title,
            about: item.about,
            by: auth.currentUser.displayName,
            skills: arrayskill,
            photoURL: auth.currentUser.photoURL,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setarrayskill(skills)
        setitem({})
    }

    return (<>
        <h3 style={{ color: "white" }}>Create Postings</h3>

        {workexpsubmit &&
            <div>

                <div style={{ display: 'flex', gap: '5px' }}>

                    <Text
                        label="Company"
                        variant="outlined"
                        value={item.title}
                        onChange={(e) => {
                            setitem({ ...item, title: e.target.value })
                            let achi = userdata.workexp;
                            achi[count] = item;
                            setuserdata({ ...userdata, workexp: achi })

                        }}
                        style={{ width: '100%' }}
                    />
                </div>
                <Text
                    label="About the job"
                    variant="outlined"
                    onChange={(e) => {
                        setitem({ ...item, about: e.target.value })
                        let achi = userdata.workexp;
                        achi[count] = item;
                        setuserdata({ ...userdata, workexp: achi })
                    }}
                    multiline
                    rows={4}
                    rowsMax={8}
                    value={item.about}
                    style={{ width: "100%", marginBottom: '10px', marginTop: '10px' }}
                />
                <Skills arrayskill={arrayskill} setarrayskill={setarrayskill} />
            </div>
        }

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!workexpsubmit && <Fab color="primary" aria-label="add" onClick={() => {
                setworkexpsubmit(true)
            }}>
                <AddIcon />
            </Fab>}
            {workexpsubmit && <Button color="primary" aria-label="add"
                variant="contained"
                style={{ marginTop: '10px' }}
                onClick={() => { handleSubmit() }}
            >
                Submit
            </Button>}
        </div>

    </>)
}