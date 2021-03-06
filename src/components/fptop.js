import React, { useState, useEffect } from "react"
import Text from "@material-ui/core/TextField"
export const Top = ({ user, userdata, setuserdata, Theme, eye }) => {
    const [name, setname] = useState(userdata.name.split(" "));

    const [firstname, setfirstname] = useState(name[0]);
    const [lastname, setlastname] = useState(name[1] ? name[1] : "");
    const [aboutme, setaboutme] = useState(userdata.about);
    useEffect(() => {
        setuserdata({ ...userdata, name: firstname + " " + lastname })

    }, [firstname, lastname])
    useEffect(() => {
        setuserdata({ ...userdata, about: aboutme })

    }, [aboutme])
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <img
                    src={user.photoURL}
                    alt=""
                    style={{
                        marginBottom: `1.45rem`,
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
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
                        color={Theme[eye].primary}
                    />
                    <Text
                        label="Last Name"
                        variant="outlined"
                        value={lastname}
                        onChange={(e) => {
                            setlastname(e.target.value)
                        }}
                        color={Theme[eye].primary}

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
                color={"white"}

                multiline
                rows={4}
                rowsMax={8}
                style={{ width: "100%", marginBottom: '10px' }}
            />
        </>
    )
}