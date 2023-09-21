import { useEffect, useState, useRef } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'

/*MUI Element*/
import { Box, CircularProgress, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, TextField, Typography, IconButton } from '@mui/material'

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { AuthGuard } from '@components/auth/auth-guard'

//ELEMENT
const PAGE_TITLE = '설문지 미리보기'

/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'
import LayoutSurveyProgressMenu from '@layouts/ws/layout-survey-progress-menu'
/*Import Components*/
import PreviewContents from '@components/survey/preview/preview-contents'

/* Survey Schema */
import { surveyForm, elementInfo, elementType, elementFunction, elementQuestions, defaultQuestion, answerType } from '@schema/element-schema'

/* getServerSideProps */
import { getServerSideProps } from '@components/survey/get-survey-data'
export { getServerSideProps }

const Survey_Preview = (props) => {
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
    const [surveyLoadData, setSurveyLoadData] = useState(surveyDataFromDB !== null ? JSON.parse(surveyDataFromDB?.survey) : surveyDataFromDB)
    /* */

    /* 질문 아이템 포커스 스크롤 관리 */
    // 클릭 이벤트 Scroll Ref
    const targets = useRef([])

    /**
     * Routing Type
     * 설문조사 종류에 따라서
     *  1. 온라인 설문조사 t = nml
     *  2. 커스텀 설문조사 t = cnvt
     */

    /**설문조사 데이터 관리 */
    /* Question Edit State */
    const [currentSelectedQuestion, setCurrentSelectedQuestion] = useState(-1)
    /* Question Load */
    const [questionInfo, setQuestionInfo] = useState(elementInfo)
    /* Question Load */
    const [questionList, setQuestionList] = useState(elementQuestions)
    /* Question Temp Data */
    const [questionTempData, setQuestionTempData] = useState({})

    /**설문조사 응답에 대한 포커싱 구분 */
    const onChangeFocusingController = (event, selectedIndex, selectedData) => {
        // console.log('onChangeFocusingController')
        // console.log('currentSelectedQuestion', selectedIndex)
        event.stopPropagation()
        if (selectedData !== questionTempData) {
            setCurrentSelectedQuestion(selectedIndex)
            setQuestionTempData(selectedData)
            // console.log('selectedData', selectedData)
            // console.log('questionTempData', questionTempData)
        }
    }

    /**
     *
     * 설문조사 데이터 초기 데이터 반영 :: 새로 제작 or 수정 진행
     *
     */

    const SURVEY_CODE = `svcd-${code}`
    // 1. 세션이 존재하는 경우 => 최우선으로 화면표시
    // 2. 세션이 없을경우는 2가지 경우가 생김
    // 2-1. 세션이 없음 && 데이터 베이스에도 없음 => 신규로 데이터 생성이 필요 => 세션스토리지에 더미데이터로 등록
    // 2-2. 세션이 없음 but 데이서 테이스에는 있음 => 신규로 데이터 생성 x => 데이터 베이스에 있는 데이터를 불러와 세션스토리지에 등록
    // 2-2-1. 수정이 발생함 => 원본 데이터베이스에 있는 데이터 들은 데이터베이스 원본으로 세션스토리지를 만들어 별도로 관리하여 불러올 수 있도록함
    // 2-2-2. 수정이 발생함 => 세션스토리지 메인 가지에서만 계속해서 저장
    // 2-2 => 1. 세션이 존재하는 경우 => 동일하게 최우선으로 화면 설정할 수 있도록 함.

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        let surveySessionStorageData = globalThis.sessionStorage.getItem(SURVEY_CODE)
        // console.log('surveySessionStorageData - Init Data', surveySessionStorageData)
        if (surveySessionStorageData === undefined || surveySessionStorageData === null) {
            //신규 설정
            globalThis.sessionStorage.setItem(SURVEY_CODE, JSON.stringify(surveyForm))
            if (surveyDataFromDB !== null) {
                //session storage에는 없지만, 저장된 데이터가 서버에 있으면 세팅
                setQuestionInfo({ title: surveyLoadData?.title || surveyLoadData?.info?.title, description: surveyLoadData?.info?.description, logoImage: surveyLoadData?.info?.logoImage })
                setQuestionList(surveyLoadData?.question || surveyLoadData?.questions)
            }
        } else {
            let jsonConvertSessionStorageData = JSON.parse(surveySessionStorageData)
            //이미 로딩되어진 global session stroage의 데이터를 받아와서 세팅
            setQuestionInfo(jsonConvertSessionStorageData.info)
            setQuestionList(jsonConvertSessionStorageData.questions)
        }
    }, [router])

    /**
     *
     *
     * 설문조사 데이터 수정시 Session Storage 반영
     *
     */

    /* 미리보기의 경우 데이터 수정시 Seesion에 반영되어 저장되지 않음. */

    /* 설문조사 질문이 제대로 채워졌는지 체크 */
    const [questionDataValid, setQuestionDataValid] = useState(false)
    const [questionErrorList, setQuestionErrorList] = useState([])
    useEffect(() => {
        let error = ''
        let errorList = []
        let validInfo = true
        let validList = true
        Object.values(questionInfo).map((c, cIndex) => {
            console.log(cIndex, validInfo && c.length > 0)
            if (cIndex === 0 && c.trim().length === 0) {
                validInfo = validInfo && c.trim().length > 0
                error = `설문지 제목이 입력되지 않음`
                // console.log(error)
                errorList.push(error)
            } else if (cIndex === 1 && c.trim().length === 0) {
                validInfo = validInfo && c.trim().length > 0
                error = `설문지 안내사항이 입력되지 않음`
                // console.log(error)
                errorList.push(error)
            }
        })
        Object.values(questionList).map((q, qIndex) => {
            let qNumber = qIndex + 1
            if (q.title.trim().length === 0) {
                error = `${qNumber}번 :: 질문 제목이 입력되지 않음`
                // console.log(error)
                errorList.push(error)
                validList = validList && false
            }
            if (q.type === null) {
                error = `${qNumber}번 :: 질문의 응답유형이 선택되지 않음`
                // console.log(error)
                errorList.push(error)
                validList = validList && false
            } else if (q.logicActive && q.logicNext.some((item) => item.questionId.length < 5)) {
                error = `${qNumber}번 :: 로직설정의 다음 문항이 선택되지 않음`
                errorList.push(error)
                validList = validList && false
            } else {
                if (q.type == 0) {
                    //객관식
                    q.answer.map((a, aIndex) => {
                        let aNumber = aIndex + 1
                        if (a.content.trim().length == 0) {
                            error = `${qNumber}-${aNumber}번 :: 선택지 내용이 입력되지 않음`
                            // console.log(error)
                            errorList.push(error)
                            validList = validList && false
                        }
                    })
                } else if (q.type == 1) {
                    //주관식
                } else if (q.type == 2) {
                    //행렬형
                    // console.log(q.answer[0].content)
                    //ROW 행
                    q.answer[0].content[0].map((item, rowIndex) => {
                        let rowNumber = rowIndex + 1
                        if (item.row.trim().length == 0) {
                            error = `${qNumber}번 ${rowNumber}행 :: 질문이 입력되지 않음`
                            // console.log(error)
                            errorList.push(error)
                            validList = validList && false
                        }
                    })
                    //COLUMN 열
                    q.answer[0].content[1].map((item, colIndex) => {
                        let colNumber = colIndex + 1
                        if (item.column.trim().length == 0) {
                            error = `${qNumber}번 ${colNumber}열 :: 선택지 내용이 입력되지 않음`
                            // console.log(error)
                            errorList.push(error)
                            validList = validList && false
                        }
                    })
                } else if (q.type == 3) {
                    //별점형
                } else if (q.type == 4) {
                    //연락처
                }
            }
        })

        console.log('validInfo result', validInfo)
        console.log('validList result', validList)
        console.log('Validation Check List', errorList)
        setQuestionDataValid(validInfo && validList)
        setQuestionErrorList(errorList)
    }, [questionInfo, questionList])

    return (
        <>
            <Head>
                <title>{PAGE_TITLE} | 인공지능 기반 건축설계 자동화 기술개발 연구단</title>
            </Head>
            {routingCheck && (
                <LayoutSurveyProgressMenu editMode={editMode} questionCheck={questionDataValid} errorList={questionErrorList}>
                    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 150px)' }} onClick={(e) => onChangeFocusingController(e, -2, null)}>
                        <Container
                            component="main"
                            maxWidth="xmd"
                            sx={{
                                flexGrow: 1,
                                backgroundColor: 'background.grade',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <PreviewContents
                                focusingController={onChangeFocusingController}
                                mainItemInfo={questionInfo}
                                setMainItemInfo={setQuestionInfo}
                                mainItemList={questionList}
                                setMainItemList={setQuestionList}
                                currentSelected={currentSelectedQuestion}
                                setCurrentSelected={setCurrentSelectedQuestion}
                                targets={targets}
                            />
                        </Container>
                    </Box>
                </LayoutSurveyProgressMenu>
            )}
        </>
    )
}

Survey_Preview.getLayout = (page) => (
    <AuthGuard>
        <LayoutWithServiceMenu>{page}</LayoutWithServiceMenu>
    </AuthGuard>
)

export default Survey_Preview
