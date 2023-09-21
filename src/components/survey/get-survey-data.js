import axios from 'axios'
export const getServerSideProps = async (context) => {
    const { code } = context.query
    let editMode = false
    const resSurvey = await axios.get(`${process.env.NEXT_PUBLIC_API}/online/survey/loaded`, {
        params: { surveyCode: code },
    })

    const surveyDataFromDB = resSurvey.data.payload[0] === undefined ? null : resSurvey.data.payload[0]
    if (surveyDataFromDB !== null) {
        editMode = true
    }
    return {
        props: { surveyDataFromDB, editMode },
    }
}
