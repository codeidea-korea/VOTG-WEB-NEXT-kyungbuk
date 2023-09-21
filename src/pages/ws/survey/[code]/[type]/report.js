import { useEffect, useState, useRef, useCallback, Fragment, createRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks/use-auth'
import { useMounted } from '@hooks/use-mounted'
import API from '@utils/API'
import axios from 'axios'
import { UuidTool } from 'uuid-tool'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles'
import { wait } from '@utils/wait'
import {
    AppBar,
    useMediaQuery,
    CircularProgress,
    Box,
    Button,
    IconButton,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    MenuItem,
    Tooltip,
    TextField,
    Toolbar,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    Collapse,
    Rating,
    Tabs,
    Tab,
} from '@mui/material'

//ELEMENT
const PAGE_TITLE = '설문 결과'

/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'
import LayoutSurveyReportMenu from '@layouts/ws/layout-survey-report-menu'

/* Excel */
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

/* M Icon */
import AddIcon from '@mui/icons-material/Add'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

/* Icons */
import { IconSurveyDelete } from '@public/votg/IconSurveyDelete'
import { IconSurveyMinimap } from '@public/votg/IconSurveyMinimap'
import { IconSurveyChoice } from '@public/votg/IconSurveyChoice'
import { IconSurveyEssay } from '@public/votg/IconSurveyEssay'
import { IconSurveyTable } from '@public/votg/IconSurveyTable'
import { IconSurveyStar } from '@public/votg/IconSurveyStar'
import { IconSurveyContact } from '@public/votg/IconSurveyContact'

import { IconSurveyRadio } from '@public/votg/IconSurveyRadio'
import { IconSurveyDuplicate } from '@public/votg/IconSurveyDuplicate'
import { IconSurveyLogic } from '@public/votg/IconSurveyLogic'
import { IconSurveyRequired } from '@public/votg/IconSurveyRequired'
import { IconSurveyCopy } from '@public/votg/IconSurveyCopy'

/*Popup*/
import DefaultInfoPopoverInfoConvert from '@components/popovers/popover-default-info'
import { borderColor } from '@mui/system'

/*Scroll Hook*/
import { useMoveScroll } from '@hooks/use-move-scroll'

/*Drag Align*/
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

/*Transition*/
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'

// Import Chart Type
import ChartType_Bar from '@components/survey/charts/chart-type-bar'
import ChartType_Pie from '@components/survey/charts/chart-type-pie'

//Import Report Element
import Report_Title_Download from '@components/survey/report/report-title-download'
import Report_NoneType from '@components/survey/report/report-none-type'

const Survey_answers = () => {
    const theme = useTheme()
    const router = useRouter()
    const { code } = router.query
    const { user } = useAuth()
    //Scroll Ref
    const targets = useRef([])

    /*Survey Data */
    const [surveySelectedInfo, setSurveySelectedInfo] = useState(null)
    const [surveySelectedSurveyTitle, setSurveySelectedSurveyQuestionTitle] = useState(null)
    /* Question Edit State */
    const [originQuestions, setOriginQuestions] = useState([])
    const [questionList, setQuestionList] = useState([])

    /* Result Load */
    const [surveyResult, setSurveyResult] = useState(null)
    const [resultRebuild, setResultRebuild] = useState([])
    const [graphTypeControl, setGraphTypeControl] = useState([])

    /* 상품 정보 */
    const [selectedReward, setSelectedReward] = useState(null)
    //** 리워드 데이터를 로딩한 후 리워드 데이터가 구매했는지 여부 판단이 필요함 */
    const [rewardRequestItem, setRewardRequestItem] = useState(false)
    const [rewardRequestStatus, setRewardRequestStatus] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const result = await API.get('payment/request/item', {
                UserCode: UuidTool.toString(user?.code.data).replace(/-/g, ''),
                orderCode: selectedReward.code,
            })
            // console.log('result', result)
            if (result.payload !== null && result.payload !== undefined) {
                // console.log('result', result.payload.status === '0' ? false : result.payload.status === '1' ? 'true' : false)
                setRewardRequestItem(result.payload)
                setRewardRequestStatus(result.payload.status === '0' ? false : result.payload.status === '1' ? 'true' : false)
            }
        }

        if (selectedReward?.code !== undefined && selectedReward?.code !== null) {
            fetchData()
        }
    }, [selectedReward])

    // useEffect(() => {
    //     console.log('rewardRequestItem', rewardRequestItem)
    //     console.log('rewardRequestStatus', rewardRequestStatus)
    // }, [rewardRequestItem, rewardRequestStatus])

    /* Question Update */
    useEffect(() => {
        // console.log('questionList - data', questionList)
        // console.log('surveyResult - data', surveyResult)

        const rebuildData = surveyResult?.map((result, rIndex) => {
            // const identifyCode = UuidTool.toString(Buffer.from(result.identifyCode, 'hex')).replace(/-/g, '')
            const identifyCode = UuidTool.toString(result.identifyCode.data).replace(/-/g, '')
            const ans = result.answer
            let answerJson = JSON.parse(ans)
            // console.log('identifyCode', identifyCode)
            // console.log('ans', answerJson)
            // console.log('answerJson - data', answerJson)
            answerJson.map((a, aIndex) => {
                // console.log('a.type', a.type)
                // console.log('a.typeText', a.typeText)

                /*

                    console.log('a', a)
                    console.log(
                        'questionList[aIndex]',
                        questionList.find((q) => q.id == a.id),
                    )
                    */
                if (questionList.find((q) => q.id == a.id) === undefined) {
                    return
                }
                if (a.type === 0) {
                    //객관식 선택 응답 재구성
                    if (a.etcActive) {
                        if (questionList.find((q) => q.id == a.id).answer[originQuestions.find((q) => q.id == a.id).answer.length] === undefined) {
                            questionList
                                .find((q) => q.id == a.id)
                                .answer.push({
                                    id: 'etc-code-value',
                                    checked: false,
                                    content: '기타',
                                    result: 0,
                                    type: 'Radio',
                                })
                            questionList.find((q) => q.id == a.id).etcAnswer = []
                        }
                    }
                    if (!questionList.find((q) => q.id == a.id).duplicate) {
                        questionList
                            .find((q) => q.id == a.id)
                            .answer.map((eachAnswer, eIndex) => {
                                if (eIndex === a.checked) {
                                    //질문에 대한 항목이 전혀 없을 경우 결과 지표 생성
                                    if (eachAnswer.result === undefined) {
                                        questionList.find((q) => q.id == a.id).answer[eIndex].result = 1
                                    }
                                    //지표에 결과 추가
                                    else {
                                        questionList.find((q) => q.id == a.id).answer[eIndex].result = questionList.find((q) => q.id == a.id).answer[eIndex].result + 1
                                    }
                                }
                                //현제 체크된 인덱스와 상관없이 :질문에 대한 항목이 전혀 없을 경우 결과 지표 생성
                                if (eIndex != a.checked && eachAnswer.result === undefined) {
                                    questionList.find((q) => q.id == a.id).answer[eIndex].result = 0
                                }
                            })

                        if (a.etcActive && a.checked === originQuestions.find((q) => q.id == a.id).answer.length) {
                            //기타 응답 리스트로 추가
                            questionList.find((q) => q.id == a.id).etcAnswer[rIndex] = { identifyCode: identifyCode, content: a.etcAnswer?.content }
                        }
                    } else {
                        questionList
                            .find((q) => q.id == a.id)
                            .answer.map((eachAnswer, eIndex) => {
                                if (a.checked?.includes(eIndex)) {
                                    //질문에 대한 항목이 전혀 없을 경우 결과 지표 생성
                                    if (eachAnswer.result === undefined) {
                                        questionList.find((q) => q.id == a.id).answer[eIndex].result = 1
                                    }
                                    //지표에 결과 추가
                                    else {
                                        questionList.find((q) => q.id == a.id).answer[eIndex].result = questionList.find((q) => q.id == a.id).answer[eIndex].result + 1
                                    }
                                }
                                //현제 체크된 인덱스와 상관없이 :질문에 대한 항목이 전혀 없을 경우 결과 지표 생성
                                if (eIndex != a.checked && eachAnswer.result === undefined) {
                                    questionList.find((q) => q.id == a.id).answer[eIndex].result = 0
                                }
                            })

                        if (a.etcActive && a.checked?.includes(originQuestions.find((q) => q.id == a.id).answer.length)) {
                            //기타 응답 리스트로 추가
                            questionList.find((q) => q.id == a.id).etcAnswer[rIndex] = { identifyCode: identifyCode, content: a.etcAnswer?.content }
                        }
                    }
                }
                //주관식 선택 응답 재구성
                else if (a.type === 1) {
                    questionList.find((q) => q.id == a.id).answer[rIndex] = { identifyCode: identifyCode, content: a.answer[0].content }
                } else if (a.type === 2) {
                    questionList
                        .find((q) => q.id == a.id)
                        .answer.map((eachAnswer, eIndex) => {
                            // console.log('eachAnswer[2]', identifyCode, eachAnswer, eachAnswer.content[2], a.answer[0].content[2])
                            eachAnswer.content[2].map((row, rIndex) => {
                                // console.log('a.answer[0].content[2]', a.answer[0].content[2][rIndex].checked)
                                if (row[a.answer[0].content[2][rIndex].checked] === undefined) {
                                    row[a.answer[0].content[2][rIndex].checked] = 1
                                } else {
                                    row[a.answer[0].content[2][rIndex].checked] = row[a.answer[0].content[2][rIndex].checked] + 1
                                }
                            })
                            for (var i = 0; i < eachAnswer.content[1].length; i++) {
                                eachAnswer.content[2].map((row, rIndex) => {
                                    delete row.checked
                                    if (row[i] === undefined) {
                                        row[i] = 0
                                    }
                                })
                            }

                            // if (eIndex === a.checked) {
                            //     if (eachAnswer[eIndex] === undefined) {
                            //         questionList.find((q) => q.id == a.id).answer[2][eIndex].result = 1
                            //     } else {
                            //         questionList.find((q) => q.id == a.id).answer[2][eIndex].result = questionList.find((q) => q.id == a.id).answer[eIndex].result + 1
                            //     }
                            // }
                            // if (eIndex != a.checked && eachAnswer.result === undefined) {
                            //     questionList.find((q) => q.id == a.id).answer[eIndex].result = 0
                            // }
                        })
                }
                //별점형 선택 응답 재구성
                else if (a.type === 3) {
                    questionList.find((q) => q.id == a.id).answer[rIndex] = { identifyCode: identifyCode, content: a.answer[0].content }
                }
                //연락처 선택 응답 재구성
                else if (a.type === 4) {
                    questionList.find((q) => q.id == a.id).answer[rIndex] = { identifyCode: identifyCode, content: a.answer[0].content }
                }
            })
            // return
        })

        setResultRebuild(questionList)

        const graphType = questionList?.map((r, rIndex) => {
            return {
                type: 0,
            }
        })
        setGraphTypeControl(graphType)
        // console.log('new questionList - length', questionList.length)
        // console.log('graphTypeControl - value', graphType)
    }, [surveyResult])

    // useEffect(() => {
    //     console.log('resultRebuild', resultRebuild)
    // }, [resultRebuild])

    const onChangeGraphType = (index, value) => {
        // console.log('index', index)
        // console.log('value', value)
        if (graphTypeControl[index]?.type !== undefined && graphTypeControl[index]?.type !== null) graphTypeControl[index].type = value
        setGraphTypeControl([...graphTypeControl])
    }

    /* Loaded survey Data */
    useEffect(() => {
        if (!router.isReady) {
            return
        }
        let isMounted = true
        // declare the async data fetching function
        // let currentCreateSureveyData = JSON.parse(globalThis.sessionStorage.getItem('current-create-survey'))

        const fetchData = async () => {
            await axios
                // .get(`http://localhost:3400/json/sample/00`, null)
                .get(`${process.env.NEXT_PUBLIC_API}/online/survey/answers/result`, {
                    params: { UserCode: user?.code.data, surveyCode: code },
                })
                .then(async (res) => {
                    // console.log(res.data)
                    if (res.data) {
                        if (isMounted) {
                            // console.log('surveyResult GetData - ', res.data.payload.result)
                            // console.log('result', res.data.payload.selected)
                            // setSurveySelectedSurvey(JSON.parse(res.data.payload.selected.survey.question))
                            // console.log('title', JSON.parse(res.data.payload.selected.survey).title)

                            // setQuestionInfo({ title: surveyLoadData?.title || surveyLoadData?.info?.title, description: surveyLoadData?.info?.description })
                            setSurveySelectedSurveyQuestionTitle(JSON.parse(res.data.payload.selected.survey).title || JSON.parse(res.data.payload.selected.survey).info?.title)
                            // console.log('questionList', JSON.parse(res.data.payload.selected.survey).question)
                            setQuestionList(JSON.parse(res.data.payload.selected.survey).question || JSON.parse(res.data.payload.selected.survey).questions)
                            setOriginQuestions(JSON.parse(res.data.payload.selected.survey).question || JSON.parse(res.data.payload.selected.survey).questions)
                            // await wait(500)
                            setSurveyResult(res.data.payload.result)
                            // console.log('surveyResult GetData', JSON.parse(res.data.payload.selected.survey).reward)
                            setSelectedReward(JSON.parse(res.data.payload.selected.survey).reward)
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                    router.push('/ws/manager').catch(console.error)
                })
        }
        // call the function
        fetchData().catch(console.error)
        return () => {
            isMounted = false
        }
    }, [user])

    const colorArray = ['#FF5353', '#0C7CD5', '#7BC67E', '#FFB547', '#2F3EB1']

    /**
     *
     *
     * 행렬형 ROW
     *
     *
     */
    const TableCollapsRow = ({ item, a, aIndex, rowIndex }) => {
        const [open, setOpen] = useState(false)

        const [tableToggle, setTableToggle] = useState(0)

        const resultRebuild = a.content[1].map((item, colIndex) => {
            // console.log('colum', rowIndex, item.column)
            // console.log('value', rowIndex, a.content[2][rowIndex][colIndex] || 0)

            const content = item.column
            const result = a.content[2][rowIndex][colIndex] || 0
            return {
                content: content,
                result: result,
            }
        })

        return (
            <Fragment>
                <TableRow>
                    {/* 질문 */}
                    <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                        <Typography
                            sx={{
                                lineHeight: '1.3',
                                fontSize: { sm: '0.8rem', xs: '0.5rem' },
                                textAlign: 'left',
                                ml: '0.3rem',
                                py: 1,
                            }}
                        >
                            {item.row.length === 0 ? '선택지가 입력되지 않았습니다' : item.row}
                        </Typography>
                    </TableCell>
                    {/* 질문별 선택지 */}
                    {a.content[1].map((item, colIndex) => {
                        // console.log('item', item)
                        return (
                            <TableCell key={`table-body-row-cell-select-${aIndex}-${colIndex}`} sx={{ maxWidth: '5rem' }}>
                                {/* {q.duplicate ? (
                                    <Checkbox sx={{ '& span': { width: '100%' } }} />
                                ) : (
                                    <Radio
                                        sx={{ transform: { sm: 'scale(0.8)', xs: 'scale(0.5)' } }}
                                        checked={a.content[2][rowIndex].checked === colIndex}
                                        onChange={(e) => onChangeTableAnswer(e, 'radio', qIndex, a.content[2][rowIndex], a.content[2], 2, rowIndex, colIndex)}
                                    />
                                )} */}
                                <Typography
                                    sx={{
                                        lineHeight: '1.3',
                                        fontSize: { sm: '0.8rem', xs: '0.5rem' },
                                        textAlign: 'center',
                                    }}
                                >
                                    {a.content[2][rowIndex][colIndex]}
                                    {/* {console.log('a.content', a.content[2])} */}
                                </Typography>
                            </TableCell>
                        )
                    })}
                    <TableCell>
                        <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow sx={{ background: '#fafafa' }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={a.content[1].length + 2}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <AppBar position="static" sx={{ backgroundColor: '#FFF !important', mb: 5 }}>
                                    <Tabs
                                        value={tableToggle}
                                        onChange={(e, value) => setTableToggle(value)}
                                        textColor="inherit"
                                        variant="fullWidth"
                                        indicatorColor="primary"
                                        sx={{
                                            '& .MuiTabs-indicator': {
                                                color: '#fff',
                                                backgroundColor: 'primary.main',
                                                height: '100%',
                                                zIndex: 0,
                                            },
                                        }}
                                    >
                                        <Tab
                                            label="막대 그래프"
                                            value={0}
                                            sx={{
                                                color: 'text.black',
                                                '&[aria-selected=true]': {
                                                    color: 'text.white',
                                                    zIndex: 1,
                                                },
                                            }}
                                        />
                                        <Tab
                                            label="파이 그래프"
                                            value={1}
                                            sx={{
                                                color: 'text.black',
                                                '&[aria-selected=true]': {
                                                    color: 'text.white',
                                                    zIndex: 1,
                                                },
                                            }}
                                        />
                                    </Tabs>
                                </AppBar>
                                {tableToggle == 0 && <ChartType_Bar colorArray={colorArray} resultData={resultRebuild} />}
                                {tableToggle == 1 && <ChartType_Pie colorArray={colorArray} resultData={resultRebuild} />}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        )
    }

    return (
        <>
            <Head>
                <title>{PAGE_TITLE} | 인공지능 기반 건축설계 자동화 기술개발 연구단</title>
            </Head>
            <LayoutSurveyReportMenu>
                <Container disableGutters={true} maxWidth={'md'}>
                    <Box sx={{ mt: 3, mb: 10, mx: 0 }}>
                        <Grid container spacing={3}>
                            {/* 00. 설문 제목 & 설문 데이터 다운로드 */}
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Report_Title_Download surveySelectedSurveyTitle={surveySelectedSurveyTitle} questionList={questionList} surveyResult={surveyResult} rewardRequestStatus={rewardRequestStatus} rewardRequestItem={rewardRequestItem} />
                            </Grid>

                            {/* 수집된 결과가 있을 경우 */}
                            {/* Result Each List */}
                            {surveyResult?.length > 0 && (
                                <>
                                    <Grid item xs={12}>
                                        <Divider>
                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>문항별 응답 수집 결과</Typography>
                                        </Divider>
                                    </Grid>
                                    {questionList?.map((q, qIndex) => {
                                        // console.log('questionList', questionList)
                                        const qNumber = qIndex + 1
                                        return (
                                            <Grid item xs={12} sx={{ my: 2 }} key={`questionList-${qIndex}`}>
                                                <Box>
                                                    <Card>
                                                        <CardHeader
                                                            title={
                                                                q.title?.length > 0 ? (
                                                                    <>
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                justifyContent: 'flex-start',
                                                                                alignItems: 'top',
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize: '0.8rem',
                                                                                    fontWeight: '700',
                                                                                }}
                                                                            >{`${qNumber}.`}</Typography>
                                                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'pre-wrap', ml: 1 }}>{`${q.title}`}</Typography>
                                                                        </Box>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'text.secondary' }}>{`${qNumber}. 문항 제목이 입력되지 않았습니다.`}</Typography>
                                                                    </>
                                                                )
                                                            }
                                                        />
                                                        <Divider />
                                                        {q.type === null && <Report_NoneType />}

                                                        {q.type !== null && (
                                                            <>
                                                                {/* 객관식 0*/}
                                                                {q.type === 0 && (
                                                                    <>
                                                                        <CardContent>
                                                                            <Box>
                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                    <li>문항 타입 : 객관식 응답</li>
                                                                                    <li>답변 방법 : {q.duplicate ? `중복 응답` : `단일 응답`}</li>
                                                                                    <li>필수 여부 : {q.required ? `필수응답 O` : `필수응답 X`}</li>
                                                                                </Typography>
                                                                            </Box>
                                                                            <Box sx={{ mt: 3 }}>
                                                                                {resultRebuild[qIndex]?.answer !== undefined && (
                                                                                    <>
                                                                                        <AppBar position="static" sx={{ backgroundColor: '#FFF !important', mb: 5 }}>
                                                                                            <Tabs
                                                                                                value={graphTypeControl[qIndex]?.type}
                                                                                                onChange={(e, value) => onChangeGraphType(qIndex, value)}
                                                                                                textColor="inherit"
                                                                                                variant="fullWidth"
                                                                                                indicatorColor="primary"
                                                                                                sx={{
                                                                                                    '& .MuiTabs-indicator': {
                                                                                                        color: '#fff',
                                                                                                        backgroundColor: 'primary.main',
                                                                                                        height: '100%',
                                                                                                        zIndex: 0,
                                                                                                    },
                                                                                                }}
                                                                                            >
                                                                                                <Tab
                                                                                                    label="막대 그래프"
                                                                                                    value={0}
                                                                                                    sx={{
                                                                                                        color: 'text.black',
                                                                                                        '&[aria-selected=true]': {
                                                                                                            color: 'text.white',
                                                                                                            zIndex: 1,
                                                                                                        },
                                                                                                    }}
                                                                                                />
                                                                                                <Tab
                                                                                                    label="파이 그래프"
                                                                                                    value={1}
                                                                                                    sx={{
                                                                                                        color: 'text.black',
                                                                                                        '&[aria-selected=true]': {
                                                                                                            color: 'text.white',
                                                                                                            zIndex: 1,
                                                                                                        },
                                                                                                    }}
                                                                                                />
                                                                                            </Tabs>
                                                                                        </AppBar>
                                                                                        {/* {console.log('resultRebuild', resultRebuild[qIndex])} */}
                                                                                        {graphTypeControl[qIndex]?.type == 0 && <ChartType_Bar colorArray={colorArray} resultData={resultRebuild[qIndex]?.answer} />}
                                                                                        {graphTypeControl[qIndex]?.type == 1 && <ChartType_Pie colorArray={colorArray} resultData={resultRebuild[qIndex]?.answer} />}
                                                                                    </>
                                                                                )}
                                                                            </Box>
                                                                        </CardContent>
                                                                        {/* 객관식 응답 */}
                                                                        <Table>
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>
                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>응답 항목</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell align="right">응답 결과</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {q.answer.map((a, aIndex) => {
                                                                                    return (
                                                                                        <Fragment key={`question-key-${aIndex}`}>
                                                                                            <TableRow>
                                                                                                <TableCell>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            alignItems: 'center',
                                                                                                            display: 'flex',
                                                                                                        }}
                                                                                                    >
                                                                                                        <Box
                                                                                                            sx={{
                                                                                                                border: 3,
                                                                                                                borderColor: colorArray[aIndex % 5],
                                                                                                                borderRadius: '50%',
                                                                                                                height: 16,
                                                                                                                mr: 1,
                                                                                                                width: 16,
                                                                                                            }}
                                                                                                        />
                                                                                                        <Typography variant="subtitle2">
                                                                                                            {a.content?.length > 0 ? (
                                                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>{a.content}</Typography>
                                                                                                            ) : (
                                                                                                                <Typography
                                                                                                                    sx={{
                                                                                                                        fontSize: { xs: '0.8rem' },
                                                                                                                        fontWeight: 500,
                                                                                                                        color: 'text.secondary',
                                                                                                                    }}
                                                                                                                >
                                                                                                                    입력되지 않았습니다.
                                                                                                                </Typography>
                                                                                                            )}
                                                                                                        </Typography>
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                                <TableCell align="right">
                                                                                                    <Typography color="textSecondary" variant="body2">
                                                                                                        {/* {numeral(item.data).format('$0,0.00')} */}
                                                                                                        {resultRebuild[qIndex]?.answer[aIndex].result}명
                                                                                                    </Typography>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        </Fragment>
                                                                                    )
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                        {/* 객관식 기타 응답 */}
                                                                        {q.etcActive && q.answer[q.answer.length - 1].result > 0 && (
                                                                            <Table>
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>기타 응답</Typography>
                                                                                        </TableCell>
                                                                                        <TableCell align="right">답변</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {q.etcAnswer?.map((etc, aIndex) => {
                                                                                        const answerNumber = aIndex + 1
                                                                                        // console.log('etc answer')
                                                                                        return (
                                                                                            <Fragment key={`question-key-${aIndex}`}>
                                                                                                <TableRow>
                                                                                                    <TableCell>
                                                                                                        <Box
                                                                                                            sx={{
                                                                                                                alignItems: 'center',
                                                                                                                display: 'flex',
                                                                                                            }}
                                                                                                        >
                                                                                                            {/* <Box
                                                                                                        sx={{
                                                                                                            border: 3,
                                                                                                            borderColor: colorArray[aIndex % 5],
                                                                                                            borderRadius: '50%',
                                                                                                            height: 16,
                                                                                                            mr: 1,
                                                                                                            width: 16,
                                                                                                        }}
                                                                                                    /> */}
                                                                                                            <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                                                {/* {answerNumber}. : {a.identifyCode} */}
                                                                                                                {answerNumber}번 응답자
                                                                                                            </Typography>
                                                                                                        </Box>
                                                                                                    </TableCell>
                                                                                                    <TableCell align="right">
                                                                                                        <Box>
                                                                                                            {etc.content?.length > 0 ? (
                                                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>{etc.content}</Typography>
                                                                                                            ) : (
                                                                                                                <Typography
                                                                                                                    sx={{
                                                                                                                        fontSize: { xs: '0.8rem' },
                                                                                                                        fontWeight: 500,
                                                                                                                        color: 'text.secondary',
                                                                                                                    }}
                                                                                                                >
                                                                                                                    작성하지 않았습니다.
                                                                                                                </Typography>
                                                                                                            )}
                                                                                                        </Box>
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            </Fragment>
                                                                                        )
                                                                                    })}
                                                                                </TableBody>
                                                                            </Table>
                                                                        )}
                                                                    </>
                                                                )}
                                                                {/* 주관식 1 */}
                                                                {q.type === 1 && (
                                                                    <>
                                                                        <CardContent>
                                                                            <Box>
                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                    <li>문항 타입 : 주관식 응답</li>
                                                                                    <li>필수 여부 : {q.required ? `필수응답 O` : `필수응답 X`}</li>
                                                                                    {/* <li>응답자수 : {q.answer?.length}</li> */}
                                                                                </Typography>
                                                                            </Box>
                                                                        </CardContent>
                                                                        <Table>
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>
                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>응답 항목</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell align="right">응답 결과</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {q.answer.map((a, aIndex) => {
                                                                                    const answerNumber = aIndex + 1
                                                                                    return (
                                                                                        <Fragment key={`question-key-${aIndex}`}>
                                                                                            <TableRow>
                                                                                                <TableCell>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            alignItems: 'center',
                                                                                                            display: 'flex',
                                                                                                        }}
                                                                                                    >
                                                                                                        {/* <Box
                                                                                                        sx={{
                                                                                                            border: 3,
                                                                                                            borderColor: colorArray[aIndex % 5],
                                                                                                            borderRadius: '50%',
                                                                                                            height: 16,
                                                                                                            mr: 1,
                                                                                                            width: 16,
                                                                                                        }}
                                                                                                    /> */}
                                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                                            {/* {answerNumber}. : {a.identifyCode} */}
                                                                                                            {answerNumber}.
                                                                                                        </Typography>
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                                <TableCell align="right">
                                                                                                    <Box>
                                                                                                        {a.content?.length > 0 ? (
                                                                                                            <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>{a.content}</Typography>
                                                                                                        ) : (
                                                                                                            <Typography
                                                                                                                sx={{
                                                                                                                    fontSize: { xs: '0.8rem' },
                                                                                                                    fontWeight: 500,
                                                                                                                    color: 'text.secondary',
                                                                                                                }}
                                                                                                            >
                                                                                                                응답하지 않았습니다.
                                                                                                            </Typography>
                                                                                                        )}
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        </Fragment>
                                                                                    )
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </>
                                                                )}
                                                                {/* 행렬형 2*/}
                                                                {q.type === 2 &&
                                                                    !q.duplicate &&
                                                                    q.answer.map((a, aIndex) => {
                                                                        return (
                                                                            <Box key={`table-wrapper-${aIndex}`} sx={{ width: '100%' }}>
                                                                                <CardContent>
                                                                                    <Box>
                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                            <li>문항 타입 : 행렬형 응답</li>
                                                                                            <li>답변 방법 : {q.duplicate ? `중복 응답` : `단일 응답`}</li>
                                                                                            <li>필수 여부 : {q.required ? `필수응답 O` : `필수응답 X`}</li>
                                                                                            {/* <li>응답자수 : {q.answer?.length}</li> */}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </CardContent>
                                                                                <Table
                                                                                    sx={{
                                                                                        '& th': {
                                                                                            paddingBlock: '10px',
                                                                                            paddingInline: '5px',
                                                                                            borderRight: '1px solid #ddd',
                                                                                        },
                                                                                        '& td': {
                                                                                            paddingBlock: '3px',
                                                                                            paddingInline: '5px',
                                                                                        },
                                                                                        '& td > span': {
                                                                                            width: '100%',
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    <TableHead sx={{ visibility: 'visible' }}>
                                                                                        <TableRow>
                                                                                            <TableCell sx={{ width: '35%' }}></TableCell>
                                                                                            {a.content[1].map((item, colIndex) => {
                                                                                                // console.log('item', item)
                                                                                                return (
                                                                                                    <TableCell
                                                                                                        key={`table-head-row-cell-${aIndex}-${colIndex}`}
                                                                                                        sx={{
                                                                                                            width: `${60 / a.content[1].length}%`,
                                                                                                        }}
                                                                                                    >
                                                                                                        <Typography
                                                                                                            sx={{
                                                                                                                lineHeight: '1.3',
                                                                                                                fontSize: { sm: '0.8rem', xs: '0.5rem' },
                                                                                                                textAlign: 'center',
                                                                                                            }}
                                                                                                        >
                                                                                                            {item.column}
                                                                                                        </Typography>
                                                                                                    </TableCell>
                                                                                                )
                                                                                            })}
                                                                                            <TableCell
                                                                                                sx={{
                                                                                                    width: `5%`,
                                                                                                }}
                                                                                            >
                                                                                                <Typography
                                                                                                    sx={{
                                                                                                        lineHeight: '1.3',
                                                                                                        fontSize: { sm: '0.7rem', xs: '0.5rem' },
                                                                                                        textAlign: 'center',
                                                                                                    }}
                                                                                                >
                                                                                                    그래프
                                                                                                </Typography>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    </TableHead>
                                                                                    <TableBody>
                                                                                        {a.content[0].map((item, rowIndex) => {
                                                                                            // console.log('item', item)

                                                                                            return <TableCollapsRow key={`table-body-row-${aIndex}-${rowIndex}`} item={item} a={a} aIndex={aIndex} rowIndex={rowIndex} />
                                                                                        })}
                                                                                    </TableBody>
                                                                                </Table>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                                {/* 별점형 3*/}
                                                                {q.type === 3 && (
                                                                    <>
                                                                        <CardContent>
                                                                            <Box>
                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                    <li>문항 타입 : 별점형 응답</li>
                                                                                    <li>필수 여부 : {q.required ? `필수응답 O` : `필수응답 X`}</li>
                                                                                    {/* <li>응답자수 : {q.answer?.length}</li> */}
                                                                                </Typography>
                                                                            </Box>
                                                                        </CardContent>
                                                                        <Table>
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>
                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>응답 항목</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell align="right">응답 결과</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {q.answer.map((a, aIndex) => {
                                                                                    const answerNumber = aIndex + 1
                                                                                    return (
                                                                                        <Fragment key={`question-key-${aIndex}`}>
                                                                                            <TableRow>
                                                                                                <TableCell>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            alignItems: 'center',
                                                                                                            display: 'flex',
                                                                                                        }}
                                                                                                    >
                                                                                                        {/* <Box
                                                                                                        sx={{
                                                                                                            border: 3,
                                                                                                            borderColor: colorArray[aIndex % 5],
                                                                                                            borderRadius: '50%',
                                                                                                            height: 16,
                                                                                                            mr: 1,
                                                                                                            width: 16,
                                                                                                        }}
                                                                                                    /> */}
                                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                                            {/* {answerNumber}. : {a.identifyCode} */}
                                                                                                            {answerNumber}.
                                                                                                        </Typography>
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                                <TableCell align="right">
                                                                                                    <Box sx={{ display: 'flex', justifyContent: 'right', py: 0 }}>
                                                                                                        <Rating size="large" value={a.content.value} />
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        </Fragment>
                                                                                    )
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </>
                                                                )}
                                                                {/* 연락처 4*/}
                                                                {q.type === 4 && (
                                                                    <>
                                                                        <CardContent>
                                                                            <Box>
                                                                                <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                    <li>문항 타입 : 연락처 응답</li>
                                                                                    <li>필수 여부 : {q.required ? `필수응답 O` : `필수응답 X`}</li>
                                                                                    {/* <li>응답자수 : {q.answer?.length}</li> */}
                                                                                </Typography>
                                                                            </Box>
                                                                        </CardContent>
                                                                        <Table>
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>
                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>응답 항목</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell align="right">응답 결과</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {q.answer.map((a, aIndex) => {
                                                                                    const answerNumber = aIndex + 1
                                                                                    return (
                                                                                        <Fragment key={`question-key-${aIndex}`}>
                                                                                            <TableRow>
                                                                                                <TableCell>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            alignItems: 'center',
                                                                                                            display: 'flex',
                                                                                                        }}
                                                                                                    >
                                                                                                        {/* <Box
                                                                                                        sx={{
                                                                                                            border: 3,
                                                                                                            borderColor: colorArray[aIndex % 5],
                                                                                                            borderRadius: '50%',
                                                                                                            height: 16,
                                                                                                            mr: 1,
                                                                                                            width: 16,
                                                                                                        }}
                                                                                                    /> */}
                                                                                                        <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>
                                                                                                            {/* {answerNumber}. : {a.identifyCode} */}
                                                                                                            {answerNumber}.
                                                                                                        </Typography>
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                                <TableCell align="right">
                                                                                                    <Box>
                                                                                                        {a.content?.length > 0 ? (
                                                                                                            <Typography sx={{ fontSize: { xs: '0.8rem' }, fontWeight: 500 }}>{a.content}</Typography>
                                                                                                        ) : (
                                                                                                            <Typography
                                                                                                                sx={{
                                                                                                                    fontSize: { xs: '0.8rem' },
                                                                                                                    fontWeight: 500,
                                                                                                                    color: 'text.secondary',
                                                                                                                }}
                                                                                                            >
                                                                                                                응답하지 않았습니다.
                                                                                                            </Typography>
                                                                                                        )}
                                                                                                    </Box>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        </Fragment>
                                                                                    )
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </Card>
                                                </Box>
                                            </Grid>
                                        )
                                    })}
                                </>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </LayoutSurveyReportMenu>
        </>
    )
}

Survey_answers.getLayout = (page) => <LayoutWithServiceMenu>{page}</LayoutWithServiceMenu>

export default Survey_answers
