import { useEffect, useState, useRef } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { debounce, throttle } from 'lodash'

/*MUI Element*/
import { Box, CircularProgress, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, TextField, Typography, IconButton } from '@mui/material'

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { AuthGuard } from '@components/auth/auth-guard'

//ELEMENT
const PAGE_TITLE = '설문지 배포하기'

/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'
import LayoutSurveyProgressMenu from '@layouts/ws/layout-survey-progress-menu'
/*Import Components*/
import ShareDistributeType from '@components/survey/share/share-distribute-type'
import ShareTypePhone from '@components/survey/share/share-type-phone'
import ShareTypeEmail from '@components/survey/share/share-type-email'
import ShareTypeUrl from '@components/survey/share/share-type-url'

/* Survey Schema */
import { sendContactForm } from '@schema/element-schema'

/* getServerSideProps */
import { getServerSideProps } from '@components/survey/get-survey-data'
export { getServerSideProps }

const Survey_Share = (props) => {
    const { user } = useAuth()
    /*Router*/
    const router = useRouter()
    // Path Check
    const { asPath, pathname } = router // asPath = /realdata , pathname = /[code]
    // Param Check
    const { code, type } = router.query

    if (code == null || code == undefined) {
        router.push('/ws/manager').catch(console.error)
    }
    /* */

    /* getServerSideProps */
    const { surveyDataFromDB, editMode } = props
    const [routingCheck, setRoutingCheck] = useState(false)
    useEffect(() => {
        if (surveyDataFromDB !== null && surveyDataFromDB.UserCode.data.toString() !== user?.code.data.toString()) {
            router.push('/ws/manager').catch(console.error)
        } else {
            setRoutingCheck(true)
        }
    }, [user])
    // console.log(`${PAGE_TITLE} :: surveyDataFromDB`, surveyDataFromDB)
    // console.log(`${PAGE_TITLE} :: editMode`, editMode)
    const [sendContactLoadData, setSendContactLoadData] = useState(surveyDataFromDB !== null ? JSON.parse(surveyDataFromDB?.sendContact) : surveyDataFromDB)

    /**
     * Routing Type
     * 설문조사 종류에 따라서
     *  1. 온라인 설문조사 t = nml
     *  2. 커스텀 설문조사 t = cnvt
     */

    /**배포관련 데이터 관리 */
    /* Selected Distibute Type */
    const [selectDistribute, setSelectDistribute] = useState(3) // 0 : MMS / 1 : KAKAO / 2 : EMAIL / 3 : KAKAO
    const [phoneNumberArrayList, setPhoneNumberArrayList] = useState([]);
    const [emailArrayList, setEmailArrayList] = useState([]);


    /* Send Contact Session Data Code*/
    const CONTACT_CODE = `svct-${code}`
    // 1. 세션이 존재하는 경우 => 최우선으로 화면표시
    // 2. 세션이 없을경우는 2가지 경우가 생김
    // 2-1. 세션이 없음 && 데이터 베이스에도 없음 => 신규로 데이터 생성이 필요 => 세션스토리지에 더미데이터로 등록
    // 2-2. 세션이 없음 but 데이서 테이스에는 있음 => 신규로 데이터 생성 x => 데이터 베이스에 있는 데이터를 불러와 세션스토리지에 등록
    // 2-2-1. 수정이 발생함 => 원본 데이터베이스에 있는 데이터 들은 데이터베이스 원본으로 세션스토리지를 만들어 별도로 관리하여 불러올 수 있도록함
    // 2-2-2. 수정이 발생함 => 세션스토리지 메인 가지에서만 계속해서 저장
    // 2-2 => 1. 세션이 존재하는 경우 => 동일하게 최우선으로 화면 설정할 수 있도록 함.

    useEffect(() => {
        let contactSessionStorageData = globalThis.sessionStorage.getItem(CONTACT_CODE)
        // console.log('contactSessionStorageData - Init Data', contactSessionStorageData)
        if (contactSessionStorageData === undefined || contactSessionStorageData === null) {
            //신규 설정
            globalThis.sessionStorage.setItem(CONTACT_CODE, JSON.stringify(sendContactForm))
            console.log('sendContactLoadData1', sendContactLoadData)
            if (sendContactLoadData?.sendType !== undefined) {
                //session storage에는 없지만, 저장된 데이터가 서버에 있으면 세팅
                setSelectDistribute(sendContactLoadData?.sendType)
            }
            if (sendContactLoadData?.phoneNumbers !== undefined) {
                setPhoneNumberArrayList(sendContactLoadData?.phoneNumbers)
            }
            if (sendContactLoadData?.emails !== undefined) {
                setEmailArrayList(sendContactForm.emails);
            }
        } else {
            console.log('sendContactLoadData2', sendContactLoadData)
            let jsonConvertSessionStorageData = JSON.parse(contactSessionStorageData)
            //이미 로딩되어진 global session stroage의 데이터를 받아와서 세팅
            setSelectDistribute(jsonConvertSessionStorageData.sendType)
            setPhoneNumberArrayList(jsonConvertSessionStorageData.phoneNumbers)
            setEmailArrayList(jsonConvertSessionStorageData.emails);
        }
    }, [])

    /**
     *
     *
     * 발송 방법 및 연락처 데이터 수정시 Session Storage 반영
     *
     */
    /*
        const throttled = useRef(throttle((newValue) => console.log(newValue), 1000))
        useEffect(() => throttled.current(value), [value])
    */

    /* 1. 발송 타입(sendType) 수정시 세션 반영 */
    const updateSendType = useRef(
        throttle((selectDistribute) => {
            let contactSessionStorageData = globalThis.sessionStorage.getItem(CONTACT_CODE)
            // console.log('selectDistribute', selectDistribute)
            if (contactSessionStorageData !== undefined && contactSessionStorageData !== null) {
                //기존 데이터 로드
                let jsonConvertSessionStorageData = JSON.parse(contactSessionStorageData)
                // console.log('jsonConvertSessionStorageData - sendType', jsonConvertSessionStorageData.sendType)
                //업데이트
                jsonConvertSessionStorageData.sendType = selectDistribute
                globalThis.sessionStorage.setItem(CONTACT_CODE, JSON.stringify(jsonConvertSessionStorageData))
                // console.log('contactSessionStorageData - Edit :: selectDistribute ', selectDistribute)
            }
        }, 1),
    )
    useEffect(() => updateSendType.current(selectDistribute), [selectDistribute])

    /* 2. 연락처 정보(sendType) 수정시 세션 반영 */
    const updatePhonenNumbers = useRef(
        throttle((phoneNumberArrayList) => {
            let contactSessionStorageData = globalThis.sessionStorage.getItem(CONTACT_CODE)
            // console.log('selectDistribute', selectDistribute)
            if (contactSessionStorageData !== undefined && contactSessionStorageData !== null) {
                //기존 데이터 로드
                let jsonConvertSessionStorageData = JSON.parse(contactSessionStorageData)
                // console.log('jsonConvertSessionStorageData - info', jsonConvertSessionStorageData)
                //업데이트
                jsonConvertSessionStorageData.phoneNumbers = phoneNumberArrayList
                globalThis.sessionStorage.setItem(CONTACT_CODE, JSON.stringify(jsonConvertSessionStorageData))
                // console.log('contactSessionStorageData - Edit :: phoneNumberArrayList ', phoneNumberArrayList)
            }
        }, 1000),
    )
    useEffect(() => updatePhonenNumbers.current(phoneNumberArrayList), [phoneNumberArrayList])

    const updateEmails = useRef(
        throttle((emailArrayList) => {
            let contactSessionStorageData = globalThis.sessionStorage.getItem(CONTACT_CODE)
            // console.log('selectDistribute', selectDistribute)
            if (contactSessionStorageData !== undefined && contactSessionStorageData !== null) {
                //기존 데이터 로드
                let jsonConvertSessionStorageData = JSON.parse(contactSessionStorageData)
                // console.log('jsonConvertSessionStorageData - info', jsonConvertSessionStorageData)
                //업데이트
                jsonConvertSessionStorageData.emails = emailArrayList
                globalThis.sessionStorage.setItem(CONTACT_CODE, JSON.stringify(jsonConvertSessionStorageData))
                // console.log('contactSessionStorageData - Edit :: emailArrayList ', emailArrayList)
            }
        }, 1000),
    )
    useEffect(() => updateEmails.current(emailArrayList), [emailArrayList])

    return (
        <>
            <Head>
                <title>{PAGE_TITLE} | 뷰즈온더고 :: Views On the Go</title>
            </Head>
            {routingCheck && (
                <LayoutSurveyProgressMenu editMode={false}>
                    <Container
                        component="main"
                        maxWidth="md"
                        sx={{
                            flexGrow: 1,
                            py: 5,
                            background: '#fff',
                            minHeight: '100vh',
                        }}
                    >
                        <Box sx={{ mt: 0, mx: 0, mb: 5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <ShareDistributeType selectDistribute={selectDistribute} setSelectDistribute={setSelectDistribute} />
                                </Grid>
                                <Grid item xs={12}>
                                    {(selectDistribute === 0 || selectDistribute === 1) && (
                                        <ShareTypePhone
                                            selectDistribute={selectDistribute}
                                            setSelectDistribute={setSelectDistribute}
                                            surveyDataFromDB={surveyDataFromDB}
                                            phoneNumberArrayList={phoneNumberArrayList}
                                            setPhoneNumberArrayList={setPhoneNumberArrayList}
                                        />
                                    )}
                                    {selectDistribute === 2 && <ShareTypeEmail 
                                        selectDistribute={selectDistribute}
                                        setSelectDistribute={setSelectDistribute}
                                        surveyDataFromDB={surveyDataFromDB}
                                        emailArrayList={emailArrayList}
                                        setEmailArrayList={setEmailArrayList}
                                    />}
                                    {selectDistribute === 3 && <ShareTypeUrl />}
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </LayoutSurveyProgressMenu>
            )}
        </>
    )
}

Survey_Share.getLayout = (page) => (
    <AuthGuard>
        <LayoutWithServiceMenu>{page}</LayoutWithServiceMenu>
    </AuthGuard>
)

export default Survey_Share
