import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Top } from "../components/fptop"
import { Skills } from '../components/skills'
import { Workexp } from '../components/workexperience'
import { Achievement } from '../components/achievements'
import { Signin } from '../components/Signin'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firebase"
import Drawer from "@material-ui/core/Drawer"
import { Button, IconButton } from "@material-ui/core"
import { Settings } from "@material-ui/icons"
import PDF from "../components/padfmake"
import NativeSelect from '@material-ui/core/NativeSelect';
import { Theme } from "../theme"
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Jobs } from "../components/makejob"
import { JobPrint } from "../components/jobs"
const problems = [{ name: 'normal' }, { name: 'Tritanomaly' }, { name: 'Deuteranopia' }, { name: 'Deuteranomaly' }, { name: 'Protanomaly' }, { name: 'Tritanopia' }, { name: 'Achromatomaly' }, { name: 'Achromatopsia' }, { name: 'Protanopia' }]

const update = async (user, userdata) => {
  firestore.collection("users").doc(user.uid).update({
    name: userdata.name,
    email: userdata.email,
    skills: userdata.skills,
    workexp: userdata.workexp,
    achievements: userdata.achievements,
    about: userdata.about
  })
  console.log("updating")
}
const IndexPage = () => {
  const [user, loading, error] = useAuthState(auth);

  return <Layout>
    {user ?
      <Main user={user} /> :
      <Signin />
    }
  </Layout>
}
const abc = async (user, setuserdata, setconstuserdata) => {
  firestore.collection("users").doc(user.uid).onSnapshot(
    (snap) => {
      setconstuserdata(snap.data())
      setuserdata(snap.data())
      console.log("updated")
    }
  )
}

const Main = ({ user }) => {
  const [userdata, setuserdata] = useState()
  const [constuserdata, setconstuserdata] = useState()

  useEffect(() => {
    if (user) {
      abc(user, setuserdata, setconstuserdata)
    }

  }, [user])

  const [rightdrawer, togglerightDrawer] = useState(false)
  const [disable, setdisble] = useState(false)
  const [eye, seteye] = useState("normal")
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: { main: Theme[eye].primary }
    },
  });



  return <><div style={{
    background: Theme[eye].background,
    paddingBottom: "80px",
    minHeight: "100vh",
    minWidth: '375px'
  }}>
    <ThemeProvider theme={darkTheme}>

      <SEO title="Home" />
      {userdata &&
        <><div style={{ height: 25 }}>
          <Drawer
            anchor="right"
            open={rightdrawer}
            onClose={() => {
              togglerightDrawer(!togglerightDrawer)
            }}
          >
            <div style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              width: '50vw'
              , height: "100vh", display: 'flex', flexDirection: "column", justifyContent: '  en'
            }}>
              <div style={{ flex: 1, width: '100%' }}>

                {user.email !== "sidharthsahniii@gmail.com" &&
                  <Button onClick={() => { PDF(userdata) }}>Download Pdf of portfolio</Button>}
                <h5 style={{ textAlign: 'center' }}> Select you eye problem (if any)</h5>
                <NativeSelect
                  onChange={(e) => { seteye(e.target.value) }}
                  label="eyesight"
                  value={eye}
                  variant="outlined"
                  name="skills"
                  inputProps={{
                    id: 'name-native-error',
                  }}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  {problems.map((item, key) => {
                    return (<option value={item.name} key={JSON.stringify(item) + "skills" + key + String(key)}>{item.name}</option>)
                  })}
                </NativeSelect>
              </div>
              <div >
                <Button onClick={() => {
                  auth.signOut()

                }}
                  style={{ width: "100%" }}>sign out</Button>
              </div>
            </div>
          </Drawer>
          <div style={{ width: '100%', display: "flex", justifyContent: "flex-end" }}>

            <IconButton onClick={() => {
              togglerightDrawer(!rightdrawer)
            }} ><Settings />
            </IconButton>
          </div>
        </div>
          {user.email !== "sidharthsahniii@gmail.com" &&
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>
              <Top user={user} userdata={userdata} setuserdata={setuserdata} eye={eye} Theme={Theme} />
              <Skills userdata={userdata} setuserdata={setuserdata} eye={eye} Theme={Theme} />
              <Workexp userdata={userdata} setuserdata={setuserdata} constuserdata={constuserdata} eye={eye} Theme={Theme} />
              <Achievement userdata={userdata} setuserdata={setuserdata} constuserdata={constuserdata} eye={eye} Theme={Theme} />
              <Button style={{ width: "97%", maxWidth: '623px', position: "fixed", bottom: "15px", height: "50px", }} color="primary" variant="contained" disabled={disable} onClick={() => { update(user, userdata) }}>Submit Updates</Button>
            </div>}
          {user.email === "sidharthsahniii@gmail.com" &&
            <div style={{ padding: '5px' }}>
              <Jobs user={user} userdata={userdata} setuserdata={setuserdata} constuserdata={constuserdata} eye={eye} Theme={Theme} />
              <JobPrint user={user} userdata={userdata} setuserdata={setuserdata} constuserdata={constuserdata} eye={eye} Theme={Theme} />
            </div>}</>


      }

    </ThemeProvider>
  </div>
  </>
}

export default IndexPage
