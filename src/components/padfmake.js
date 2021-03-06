import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const pdfbanado = (userdata) => {
    console.log({ userdata })
    const { workexp, achievements, name, about, skills } = userdata;
    const document = { content: [{ text: 'Details', fontStyle: 23, lineHeight: 1.5, fontSize: 30, bold: true }] }
    const [firstName, lastName] = name.split([" "])
    document.content.push({
        columns: [
            { text: 'firstname', width: 60 },
            { text: ':', width: 10 },
            { text: firstName, width: 50 },]
    })
    document.content.push({
        columns: [
            { text: 'lastName', width: 60 },
            { text: ':', width: 10 }, { text: lastName, width: 50 }
        ],
    });
    document.content.push({
        columns: [
            { text: 'about me', width: 60 },
            { text: ':', width: 10 }, { text: about, width: 200 }
        ],
        lineHeight: 2
    });
    document.content.push({ text: 'Work experience', fontStyle: 30, lineHeight: 1.5, fontSize: 23, bold: true })
    workexp.forEach((item, key) => {
        if (key > 0) {

            document.content.push({
                text: item.title, fontStyle: 22, width: 60, lineHeight: 1.8, fontSize: 18, bold: true
            })
            document.content.push({
                columns: [
                    { text: 'duration', width: 60 },
                    { text: ':', width: 10 },
                    { text: item.from, width: 50 },
                    { text: '-', width: 10 },
                    { text: item.to, width: 30 },
                ],

                lineHeight: 1
            });
            document.content.push({
                columns: [
                    { text: 'about the work', width: 90 },
                    { text: ':', width: 10 },
                    { text: item.about, width: 300 },
                ],
                lineHeight: 2
            });
        }
    });
    achievements.forEach((item, key) => {
        if (key > 0) {

            document.content.push({
                text: item.title, fontStyle: 22, width: 60, lineHeight: 1.8, fontSize: 18, bold: true
            })
            document.content.push({
                columns: [
                    { text: 'date', width: 45 },
                    { text: ':', width: 10 },
                    { text: item.dated, width: 50 },
                ],


                lineHeight: 1
            });

            document.content.push({
                columns: [
                    { text: 'about the project', width: 100 },
                    { text: ':', width: 10 },
                    { text: item.about, width: 300 },
                ],
                lineHeight: 2
            });
        }
    });
    document.content.push({ text: 'Skills', fontStyle: 30, lineHeight: 1.5, fontSize: 23, bold: true })

    const itemi = []
    skills.forEach((item, key) => {
        itemi.push(
            item.name
        )
    })
    document.content.push({

        ul: itemi

    })
    pdfMake.createPdf(document).download()
}

export default pdfbanado;