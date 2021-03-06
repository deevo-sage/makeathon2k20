import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase"
import { Jobpdf } from "./jobpdf";
import pdfbanado from "./padfmake"
export const JobPrint = () => {
    const [jobs, setjobs] = useState([])
    useEffect(() => {
        firestore.collection('users').doc(auth.currentUser.uid).collection("Jobs").orderBy("timeStamp", "asc").onSnapshot((snap) => {
            let jebs = []
            snap.forEach((s) => {
                console.log(s.data())
                jebs.push(s.data())
            })
            setjobs(jebs)
        })
    }, [])
    return (<>
        <h3 style={{ color: "white", marginTop: '18px' }}>
            Jobs postings
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10' }}>
            {jobs.map((item, key) => {
                return <><Card {...item} key={key} sid={key < 2}
                />
                    <br />
                </>
            })}
        </div>
    </>)
}
const makejobpdf = async (skills, sid) => {
    if (!sid)
        await Jobpdf(skills, true)
    else {
        let userdata;
        await firestore.collection('users').doc('3FJxiYzHnrTE3tZpnx0Ksv8YQgq2').get().then((snap) => {
            userdata = snap.data()
            pdfbanado(userdata)
        })
    }
}
const Card = ({ photoURL, skills, by, title, about, date, sid }) => {

    return (<div style={{
        display: "flex", flexDirection: 'column', minHeight: '150px', width: '92.5vw', color: 'white', padding: '5px', boxShadow: "  4px 4px 20px rgba(0, 0, 0, 0.4)"
    }} onClick={() => { makejobpdf(skills, sid) }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '50px' }}>
            <img src={photoURL} style={{ height: '45px', width: '45px', borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', color: "white" }}>
                <p style={{ fontSize: '1.3rem', fontWeight: '700' }}>{title}</p>
                <p style={{ transform: "translateY(-100%)", fontSize: '0.8rem', color: "white", opacity: '0.8' }}>{by}</p>
            </div>
        </div >
        <p style={{ opacity: 0.8 }}>{about}</p>
        <h5 style={{ opacity: 0.8 }}>skills required</h5>
        <ul style={{ opacity: 0.8, lineHeight: 0.7 }}>
            {skills.map((item, key) => {
                if (item.valid === true)
                    return <li>{item.name}</li>
                else { return (<></>) }
            })}
        </ul>

    </div >)
}


