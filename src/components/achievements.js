import React, { useState, useEffect } from "react"
import Fab from '@material-ui/core/Fab';
import Text from "@material-ui/core/TextField"
import AddIcon from '@material-ui/icons/Add';
import { map } from 'lodash'
export const Achievement = ({ userdata, setuserdata, constuserdata }) => {
    const [tempwork, settempwork] = useState([]);
    const [workamount, setworkamount] = useState(2);
    const [item, setitem] = useState({})
    const [workexpsubmit, setworkexpsubmit] = useState(false);
    const [count] = useState(userdata.workexp.length)

    useEffect(() => {
        let t = []
        for (let i = 0; i < workamount; i++) {
            t.push(i)
        }
        settempwork(t)
    }, [])
    useEffect(() => {
        let t = []
        for (let i = 0; i < workamount; i++) {
            t.push(i)
        }
        settempwork(t)
    }, [workamount])
    useEffect(() => {
        setworkexpsubmit(false)
    }, [constuserdata])

    return (<>
        <h3 style={{ color: "white" }}>achievements</h3>

        {userdata.achievements !== {} && map((constuserdata.achievements), (item, key) => {
            if (key > 0)
                return (
                    <div>

                        <div style={{ display: 'flex', gap: '5px' }}>

                            <Text
                                label="Title"
                                variant="outlined"
                                value={item.title}
                                onChange={(e) => {
                                    setitem({ ...item, title: e.target.value })
                                    let achi = userdata.achievements;
                                    achi[count] = item;
                                    setuserdata({ ...userdata, achievements: achi })
                                }}
                                style={{ width: '50%' }}
                                disabled

                            />
                            <Text
                                label="dated"
                                type="date"
                                value={item.dated}
                                defaultValue="2021-03-06"
                                onChange={(e) => {
                                    setitem({ ...item, dated: String(e.target.value) })
                                    let achi = userdata.achievements;
                                    achi[count] = item;
                                    setuserdata({ ...userdata, achievements: achi })
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                        </div>
                        <Text
                            label="About the achievement"
                            variant="outlined"
                            onChange={(e) => {
                                setitem({ ...item, about: e.target.value })
                                let achi = userdata.achievements;
                                achi[count] = item;
                                setuserdata({ ...userdata, achievements: achi })
                            }}
                            multiline
                            rows={4}
                            rowsMax={8}
                            value={item.about}
                            style={{ width: "100%", marginBottom: '10px', marginTop: '10px' }}
                            disabled
                        />
                    </div>
                )
            else { return <></> }
        })}
        {workexpsubmit &&
            <div>

                <div style={{ display: 'flex', gap: '5px' }}>

                    <Text
                        label="Title"
                        variant="outlined"
                        value={item.title}
                        onChange={(e) => {
                            setitem({ ...item, title: e.target.value })
                            let achi = userdata.achievements;
                            achi[count] = item;
                            setuserdata({ ...userdata, achievements: achi })
                        }}
                        style={{ width: '50%' }}

                    />
                    <Text
                        label="dated"
                        type="date"
                        value={item.dated}
                        defaultValue="2021-03-06"
                        onChange={(e) => {
                            setitem({ ...item, dated: e.target.value })
                            let achi = userdata.achievements;
                            achi[count] = item;
                            setuserdata({ ...userdata, achievements: achi })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Text
                    label="About the achievement"
                    variant="outlined"
                    onChange={(e) => {
                        setitem({ ...item, about: e.target.value })
                        let achi = userdata.achievements;
                        achi[count] = item;
                        setuserdata({ ...userdata, achievements: achi })
                    }}
                    multiline
                    rows={4}
                    rowsMax={8}
                    style={{ width: "100%", marginBottom: '10px', marginTop: '10px' }}
                />
            </div>}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Fab color="primary" aria-label="add" onClick={() => {
                setworkexpsubmit(true)
            }}>
                <AddIcon />
            </Fab>
        </div>
    </>)
}