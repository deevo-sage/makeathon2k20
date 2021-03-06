import React, { useState, useEffect } from "react"
import Fab from '@material-ui/core/Fab';
import Text from "@material-ui/core/TextField"
import AddIcon from '@material-ui/icons/Add';
import { map } from 'lodash'
export const Workexp = ({ userdata, setuserdata, constuserdata }) => {
    const [tempwork, settempwork] = useState([]);
    const [count] = useState(userdata.workexp.length)
    const [workamount, setworkamount] = useState(2);
    const [workexpsubmit, setworkexpsubmit] = useState(false);
    const [item, setitem] = useState({})

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
        <h3 style={{ color: "white" }}>Work experience</h3>

        {userdata.workexp !== {} && map((constuserdata.workexp), (item, key) => {
            if (key > 0) return (
                <div>

                    <div style={{ display: 'flex', gap: '5px' }}>

                        <Text
                            label="Title"
                            variant="outlined"
                            value={item.title}
                            onChange={(e) => {
                                setitem({ ...item, title: e.target.value })
                                let achi = userdata.workexp;
                                achi[count] = item;
                                setuserdata({ ...userdata, workexp: achi })
                            }}
                            style={{ width: '50%' }}
                            disabled
                        />
                        <Text
                            label="from"
                            type="date"
                            defaultValue="2021-03-06"
                            value={item.from}
                            onChange={(e) => {
                                setitem({ ...item, from: e.target.value })
                                let achi = userdata.workexp;
                                achi[count] = item;
                                setuserdata({ ...userdata, workexp: achi })

                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled
                        />
                        <Text
                            label="to"
                            type="date"
                            defaultValue="2021-03-06"
                            value={item.to}
                            onChange={(e) => {
                                setitem({ ...item, to: e.target.value })
                                let achi = userdata.workexp;
                                achi[count] = item;
                                setuserdata({ ...userdata, workexp: achi })

                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled
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
                            let achi = userdata.workexp;
                            achi[count] = item;
                            setuserdata({ ...userdata, workexp: achi })

                        }}
                        style={{ width: '50%' }}
                    />
                    <Text
                        label="from"
                        type="date"
                        defaultValue="2021-03-06"
                        value={item.from}
                        onChange={(e) => {
                            setitem({ ...item, from: e.target.value })
                            let achi = userdata.workexp;
                            achi[count] = item;
                            setuserdata({ ...userdata, workexp: achi })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Text
                        label="to"
                        type="date"
                        defaultValue="2021-03-06"
                        value={item.to}
                        onChange={(e) => {
                            setitem({ ...item, to: e.target.value })
                            let achi = userdata.workexp;
                            achi[count] = item;
                            setuserdata({ ...userdata, workexp: achi })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
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