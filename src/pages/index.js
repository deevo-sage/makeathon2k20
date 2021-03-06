import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import NativeSelect from '@material-ui/core/NativeSelect';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Text from "@material-ui/core/TextField"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const skills = ['web design', 'Wordpress', 'microsoft word', 'management', 'excel']
const IndexPage = () => { 
  const [skillamount, setskillamount] = useState(4);
  const [temp, settemp] = useState([]);
  const [skillset, setskills] = useState({});
  useEffect(() => {
    let skillse = {}
    skills.forEach((item, key) => {
      skillse[item] = false;
    })
    setskills(skillse)
    let t = []
    for (let i = 0; i < skillamount; i++) {
      t.push(i)
    }
    settemp(t)
  }, [])
  useEffect(() => {
    let t = []
    for (let i = 0; i < skillamount; i++) {
      t.push(i)
    }
    settemp(t)
  }, [skillamount])
  return <Layout>
    <SEO title="Home" />
    <div style={{ height: 25 }}></div>
    <Top />
    <Skills temp={temp} setskillamount={setskillamount} skillamount={skillamount} />

  </Layout>
}
const Skills = ({ temp, setskillamount, skillamount }) => {
  return (<>
    <h3>Skills</h3>
    {temp.map((x, i) => {
      return <NativeSelect
        value={""}
        onChange={() => { }}
        variant="outlined"
        name="skills"
        inputProps={{
          id: 'name-native-error',
        }}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        {skills.map((item, key) => {
          return (<option value={item} key={item + "skills" + i + String(key)}>{item}</option>)
        })}
      </NativeSelect>
    })}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Fab color="primary" aria-label="add" onClick={() => {
        setskillamount(skillamount + 1)
      }}>
        <AddIcon />
      </Fab>
    </div></>)
}
const Top = ({ }) => {
  const [firstname, setfirstname] = useState("sidharth");
  const [lastname, setlastname] = useState("sahni");
  const [aboutme, setaboutme] = useState("sahni");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <StaticImage
          src="../images/face.png"
          width={150}
          quality={95}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="A Gatsby astronaut"
          style={{
            marginBottom: `1.45rem`,
            borderRadius: "50%",
            width: "150",
            height: "150",
          }}
        />
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            label="First Name"
            variant="outlined"
            value={firstname}
            onChange={(e) => {
              setfirstname(e.target.value)
            }}
          />
          <Text
            label="Last Name"
            variant="outlined"
            value={lastname}
            onChange={(e) => {
              setlastname(e.target.value)
            }}
          />
        </div>

      </div>
      <Text
        label="About Me"
        variant="outlined"
        value={aboutme}
        onChange={(e) => {
          setaboutme(e.target.value)
        }}

        multiline
        rows={4}
        rowsMax={8}
        style={{ width: "100%", marginBottom: '10px' }}
      />
    </>
  )
}
export default IndexPage
