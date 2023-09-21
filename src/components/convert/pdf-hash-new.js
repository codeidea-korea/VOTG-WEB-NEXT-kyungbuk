import { Fragment, useState, useEffect } from 'react'
import { UuidTool } from 'uuid-tool'
import { Avatar, Button, CircularProgress, Checkbox, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { css } from '@emotion/react'
import axios from 'axios'

const wrapWidth = '100%'
const fontSizeLarge = '0.7rem'
const fontSizeRegular = '0.5rem'
const fontSizeSmall = '0.5rem'
const radioButtonScale = 'scale(0.5);'
const tablePadding = '3px'

const marginSmallTriger = true
const marginSamll = '-0.5rem'
const checkNumber = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳']
export const PDFHashPreviewer = ({ pageNumber, fileNameTriger, pageLength }) => {
    const [pdfData, setPDFData] = useState(null)
    const [fileName, setFileName] = useState(null)

    useEffect(() => {
        setFileName(globalThis.sessionStorage.getItem('set-file-cache'))
        console.log(globalThis.sessionStorage.getItem('set-file-cache'))
    }, [fileNameTriger, globalThis.sessionStorage.getItem('set-file-cache')])

    useEffect(async () => {
        let isMounted = true
        // declare the async data fetching function
        const fetchData = async () => {
            await axios
                // .get(`http://localhost:3400/json/sample/00`, null)
                .get(`${process.env.NEXT_PUBLIC_PDF_HASH}/json`, {
                    params: { filename: fileName },
                })
                .then((res) => {
                    if (res.data) {
                        if (isMounted) {
                            setPDFData(res.data)
                        }
                    }
                })
                .catch((error) => console.log(error))
        }
        // call the function
        if (fileName !== null) {
            fetchData().catch(console.error)
        }
        return () => {
            isMounted = false
        }
    }, [fileName])

    const [values, setValues] = useState([])
    const handleRadioChange = (event, field) => {
        // console.log(event.target.value, field)
        setValues({
            ...values,
            [field]: event.target.value,
        })
    }

    useEffect(() => {
        console.log(values)
    }, [values])

    //*setting new converstion data

    // const [pdfTitle, setPdfTitle] = useState('')
    const [pdfConvertQuestionList, setPdfConvertQuestionList] = useState([])
    let pdfTitle = ''
    let selectTitleArrayList = []
    let questionArrayList = []
    let selectNumberArrayList = []

    let arrayUnit = {
        title: '',
        type: 2,
        typeText: '행렬형',
        duplicate: false,
        logicActive: false,
        logicNext: null,
        required: true,
        answer: [],
        etcActive: false,
        etcAnswer: null,
        checked: null,
    }

    const [elementQuestions, setElementQuestions] = useState([])
    useEffect(() => {
        const newArrayListForPage = [...Array(pageLength)].map((v, index) => {
            return { id: UuidTool.newUuid().replace(/-/g, ''), ...arrayUnit }
        })
        setElementQuestions(newArrayListForPage)
        console.log('newArrayListForPage', newArrayListForPage)
    }, [pageLength])

    // useEffect(() => {
    //     console.log('pdfTitle', pdfTitle)
    // }, [pdfTitle])

    // const onClickTest = () => {
    //     console.log('pdfTitle', pdfTitle)
    //     console.log('selectTitleArrayList', selectTitleArrayList)
    //     console.log('questionArrayList', questionArrayList)
    //     console.log('selectNumberArrayList', selectNumberArrayList)
    //     questionTable.content = [selectTitleArrayList, questionArrayList, selectNumberArrayList]
    //     elementQuestions[0].answer = [questionTable]
    //     elementQuestions[0].title = pdfTitle

    //     console.log('elementQuestions', elementQuestions)
    //     setPdfConvertQuestionList(elementQuestions)
    // }

    useEffect(() => {
        {
            if (pdfData !== null) {
                pdfData.pageTables.map((v, index) => {
                    // console.log('tables', tables)
                    let questionTable = {
                        content: [],
                        type: 'Table',
                        id: UuidTool.newUuid().replace(/-/g, ''),
                    }

                    let selectTitleArrayList_Multi = []
                    let questionArrayList_Multi = []
                    let selectNumberArrayList_Multi = []
                    var tables = v.tables
                    var mergeAlias = v.merge_alias
                    var merges = v.merges

                    var eventData = tables.map((tr, rowIndex) => {
                        var page_row_index = [index, rowIndex].join('-')
                        return {
                            [page_row_index]: 0,
                        }
                    })

                    var selectTitleCounter = 0
                    var questionListCounter = 0
                    var counterStartRow = 0

                    var tables_00_tagging_newline = tables.map((table, rowIndex) => {
                        // console.log(r, table)
                        let newTables = table.map((v) => {
                            // console.log(r, v)
                            const regx = /\-(.*?)\s\-/g
                            let cv = v.replace(regx, '').split('\n')
                            // console.log(cv)
                            let convertNewLineTag = cv.map((t, tIndex) => (
                                <Fragment key={`t-${tIndex}`}>
                                    {t}
                                    {v.length > 0 && <br />}
                                </Fragment>
                            ))
                            return convertNewLineTag
                        })

                        var radioTrigger = false

                        var trContainer = newTables.map((td, colIndex) => {
                            var r_c = [rowIndex, colIndex].join('-')
                            var page_row_index = [index, rowIndex].join('-')
                            var tdData = ''
                            var emptyAlias = 'false'
                            if (!mergeAlias[r_c]) {
                                emptyAlias = 'true'
                                let cellDataCheck = tables[rowIndex][colIndex].replace(/\s/g, '')
                                let circleCheck = tables[rowIndex][colIndex].replace(/\s/g, '')
                                // console.log('cellDataCheck', `[${rowIndex}]-[${colIndex}]`, cellDataCheck, cellDataCheck.length)
                                if (cellDataCheck.length === 0 && rowIndex >= 0 && rowIndex < 2 && colIndex >= 0 && colIndex < 2) {
                                    counterStartRow++
                                }
                                if (cellDataCheck.length === 0 && colIndex < 2) {
                                    return null
                                }
                                if (checkNumber.includes(circleCheck)) {
                                    radioTrigger = true
                                } else {
                                    //Not Circle
                                    if (td.length > 5) {
                                        if (index === 0) {
                                        } else {
                                        }
                                    } else {
                                        if (rowIndex === counterStartRow + 0 && colIndex === 0) {
                                            const data = td.map((v, index) => {
                                                return v.props.children[0]
                                            })

                                            const joinData = data.join('')

                                            console.log('title ', index, rowIndex, colIndex, joinData)
                                            pdfTitle = joinData
                                        }

                                        if (rowIndex === counterStartRow + 1 && colIndex >= 2) {
                                            const data = td.map((v, index) => {
                                                return v.props.children[0]
                                            })

                                            const joinData = data.join('')

                                            console.log('select ', joinData)
                                            if (joinData.length > 0) {
                                                // console.log('data ', joinData)
                                                selectTitleArrayList.push({ id: selectTitleCounter, column: joinData, level: selectTitleCounter + 1, edit: false })
                                                selectTitleArrayList_Multi.push({ id: selectTitleCounter, column: joinData, level: selectTitleCounter + 1, edit: false })
                                                selectTitleCounter++
                                            }
                                        }

                                        if (rowIndex >= counterStartRow + 2 && colIndex === 1) {
                                            const data = td.map((v, index) => {
                                                return v.props.children[0]
                                            })

                                            const joinData = data.join('')

                                            // console.log('title ', joinData)
                                            if (joinData.length > 0) {
                                                // console.log('data ', joinData)
                                                questionArrayList.push({ id: questionListCounter, row: joinData, edit: false })
                                                selectNumberArrayList.push({ id: questionListCounter, checked: null })

                                                questionArrayList_Multi.push({ id: questionListCounter, row: joinData, edit: false })
                                                selectNumberArrayList_Multi.push({ id: questionListCounter, checked: null })
                                                questionListCounter++
                                            }
                                        }
                                    }
                                }
                            } else {
                                return
                            }
                        })

                        // return <tr key={`tr-${rowIndex}`}>{trContainer}</tr>
                    })
                    // console.log('questionArrayList_Multi', index, questionArrayList_Multi)
                    // console.log('selectTitleArrayList_Multi', index, selectTitleArrayList_Multi)
                    // console.log('selectNumberArrayList_Multi', index, selectNumberArrayList_Multi)

                    questionTable.content = [questionArrayList_Multi, selectTitleArrayList_Multi, selectNumberArrayList_Multi]
                    console.log('questionTable', index, questionTable)
                    elementQuestions[index].answer = [questionTable]
                    elementQuestions[index].title = pdfTitle
                    // console.log('elementQuestions')
                })
                // console.log('elementQuestions UseEffect', elementQuestions)
                // setPdfConvertQuestionList(elementQuestions)
                globalThis.sessionStorage.setItem('convert-survey-question', JSON.stringify(elementQuestions))
                globalThis.sessionStorage.setItem('convert-survey-question-init-check', false)
            }
        }
    }, [pdfData])
    if (pdfData === null) {
        return (
            <>
                <CircularProgress
                    size={24}
                    sx={{
                        color: 'primary.main',
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            </>
        )
    }
    // console.log(pdfData)

    return (
        <>
            {/* <Button onClick={onClickTest}>TEST</Button> */}

            {/* View */}
            {pdfData.pageTables.map((v, index) => {
                if (index !== pageNumber - 1) {
                    return
                }
                // console.log('tables', tables)
                var tables = v.tables
                var mergeAlias = v.merge_alias
                var merges = v.merges

                var eventData = tables.map((tr, rowIndex) => {
                    var page_row_index = [index, rowIndex].join('-')
                    return {
                        [page_row_index]: 0,
                    }
                })

                var selectTitleCounter = 0
                var questionListCounter = 0
                var counterStartRow = 0

                var tables_00_tagging_newline = tables.map((table, rowIndex) => {
                    // console.log(r, table)
                    let newTables = table.map((v) => {
                        // console.log(r, v)
                        const regx = /\-(.*?)\s\-/g
                        let cv = v.replace(regx, '').split('\n')
                        // console.log(cv)
                        let convertNewLineTag = cv.map((t, tIndex) => (
                            <Fragment key={`t-${tIndex}`}>
                                {t}
                                {v.length > 0 && <br />}
                            </Fragment>
                        ))
                        return convertNewLineTag
                    })

                    var radioTrigger = false

                    var trContainer = newTables.map((td, colIndex) => {
                        var r_c = [rowIndex, colIndex].join('-')
                        var page_row_index = [index, rowIndex].join('-')
                        var tdData = ''
                        var emptyAlias = 'false'
                        if (!mergeAlias[r_c]) {
                            emptyAlias = 'true'
                            let cellDataCheck = tables[rowIndex][colIndex].replace(/\s/g, '')
                            let circleCheck = tables[rowIndex][colIndex].replace(/\s/g, '')
                            // console.log('cellDataCheck', `[${rowIndex}]-[${colIndex}]`, cellDataCheck, cellDataCheck.length)
                            if (cellDataCheck.length === 0 && rowIndex >= 0 && rowIndex < 2 && colIndex >= 0 && colIndex < 2) {
                                counterStartRow++
                            }
                            if (cellDataCheck.length === 0 && colIndex < 2) {
                                return null
                            }
                            if (checkNumber.includes(circleCheck)) {
                                radioTrigger = true
                                // console.log('td', td)
                                // console.log('td', radioTrigger)

                                // setValues({
                                //     ...values,
                                //     [row_index]: 1,
                                // })
                                tdData = (
                                    <td
                                        key={`td-${rowIndex}-${colIndex}`}
                                        style={{
                                            borderTop: '1px solid #eee',
                                            borderBottom: '0px solid #eee',
                                            borderRight: '0px solid #eee',
                                            borderLeft: '1px solid #eee',
                                            padding: tablePadding,
                                            background: '#fff',
                                            textAlign: rowIndex < 1 || colIndex < 1 ? 'left' : 'center',
                                            fontWeight: rowIndex < 1 || colIndex < 1 ? '700' : '400',
                                            width: '10px',
                                        }}
                                        colSpan={merges[r_c]?.width}
                                        rowSpan={merges[r_c]?.height}
                                    >
                                        <Radio
                                            checked={values[page_row_index] == colIndex}
                                            value={colIndex}
                                            onChange={(e) => handleRadioChange(e, page_row_index)}
                                            sx={{
                                                transform: radioButtonScale,
                                                margin: marginSmallTriger === true ? marginSamll : 'auto',
                                            }}
                                        />
                                    </td>
                                )
                            } else {
                                //Not Circle
                                if (td.length > 5) {
                                    if (index === 0) {
                                        tdData = (
                                            <td
                                                key={`td-${rowIndex}-${colIndex}`}
                                                style={{
                                                    borderTop: '0px solid #eee',
                                                    borderBottom: '0px solid #eee',
                                                    borderRight: '0px solid #eee',
                                                    borderLeft: '0px solid #eee',
                                                    padding: tablePadding,
                                                    background: '#fff',
                                                    textAlign: 'left',
                                                    fontWeight: '400',
                                                    fontSize: fontSizeLarge,
                                                    lineHeight: '2.5',
                                                }}
                                                colSpan={merges[r_c]?.width}
                                                rowSpan={merges[r_c]?.height}
                                            >
                                                {/* {`td-${rowIndex}-${colIndex}`}
                                    <br /> */}
                                                <div
                                                    style={{
                                                        width: wrapWidth,
                                                    }}
                                                >
                                                    {td}
                                                </div>
                                            </td>
                                        )
                                    } else {
                                        tdData = (
                                            <td
                                                key={`td-${rowIndex}-${colIndex}`}
                                                style={{
                                                    borderTop: '0px solid #eee',
                                                    borderBottom: '0px solid #eee',
                                                    borderRight: '0px solid #eee',
                                                    borderLeft: '0px solid #eee',
                                                    padding: tablePadding,
                                                    background: '#fff',
                                                    textAlign: 'left',
                                                    fontWeight: '400',
                                                    fontSize: fontSizeRegular,
                                                    lineHeight: '2.5',
                                                }}
                                                colSpan={merges[r_c]?.width}
                                                rowSpan={merges[r_c]?.height}
                                            >
                                                <div
                                                    style={{
                                                        width: wrapWidth,
                                                    }}
                                                >
                                                    {td}
                                                </div>
                                            </td>
                                        )
                                    }
                                } else {
                                    if (rowIndex === counterStartRow + 0 && colIndex === 0) {
                                        const data = td.map((v, index) => {
                                            return v.props.children[0]
                                        })

                                        const joinData = data.join('')

                                        // console.log('title ', joinData)
                                        pdfTitle = joinData
                                    }

                                    if (rowIndex === counterStartRow + 1 && colIndex >= 2) {
                                        const data = td.map((v, index) => {
                                            return v.props.children[0]
                                        })

                                        const joinData = data.join('')

                                        // console.log('title ', joinData)
                                        if (joinData.length > 0) {
                                            // console.log('data ', joinData)
                                            // selectTitleArrayList.push({ id: selectTitleCounter, column: joinData, level: selectTitleCounter + 1, edit: false })
                                            // selectTitleCounter++
                                        }
                                    }

                                    if (rowIndex >= counterStartRow + 2 && colIndex === 1) {
                                        const data = td.map((v, index) => {
                                            return v.props.children[0]
                                        })

                                        const joinData = data.join('')

                                        // console.log('title ', joinData)
                                        if (joinData.length > 0) {
                                            // console.log('data ', joinData)
                                            // questionArrayList.push({ id: questionListCounter, row: joinData, edit: false })
                                            // selectNumberArrayList.push({ id: questionListCounter, checked: null })
                                            // questionListCounter++
                                        }
                                    }
                                    tdData = (
                                        <td
                                            key={`td-${rowIndex}-${colIndex}`}
                                            style={{
                                                borderTop: '1px solid #eee',
                                                borderBottom: '0px solid #eee',
                                                borderRight: '0px solid #eee',
                                                borderLeft: '1px solid #eee',
                                                padding: tablePadding,
                                                background: '#fff',
                                                textAlign: rowIndex < 1 || colIndex < 2 ? 'left' : 'center',
                                                // fontWeight: rowIndex < 1 || colIndex < 1 ? '700' : '400',
                                                fontWeight: '400',
                                                fontSize: fontSizeSmall,
                                            }}
                                            colSpan={merges[r_c]?.width}
                                            rowSpan={merges[r_c]?.height}
                                        >
                                            {td}
                                        </td>
                                    )
                                }
                            }
                        } else {
                            return
                        }

                        // console.log(tdData)
                        return !radioTrigger ? (
                            <Fragment key={`td-${rowIndex}-${colIndex}`}>{tdData}</Fragment>
                        ) : (
                            <Fragment key={`td-${rowIndex}-${colIndex}`}>
                                {/* <RadioGroup
                                    name={`radio-group-${rowIndex}-${colIndex}`}
                                    value={values[`group-${rowIndex}-${colIndex}`]}
                                    onChange={(event) =>
                                        // handleChange(
                                        //     `group-${rowIndex}-${colIndex}`,
                                        //     event.target.index,
                                        // )
                                        console.log(
                                            `group-${rowIndex}-${colIndex}`,
                                            event.target.value,
                                        )
                                    }
                                > */}
                                {tdData}
                                {/* </RadioGroup> */}
                            </Fragment>
                        )
                    })
                    return <tr key={`tr-${rowIndex}`}>{trContainer}</tr>
                })

                // var tables_01_tagging_tr = tables_00_tagging_newline.map((table, row) => {})

                // questionTable.content = [questionArrayList, selectTitleArrayList, selectNumberArrayList]
                // elementQuestions[index].answer = [questionTable]
                // elementQuestions[index].title = pdfTitle

                // console.log('elementQuestions', elementQuestions)
                // setPdfConvertQuestionList(elementQuestions)
                // globalThis.sessionStorage.setItem('convert-survey-question', JSON.stringify(elementQuestions))
                // globalThis.sessionStorage.setItem('convert-survey-question-init-check', false)
                return (
                    <Fragment key={index}>
                        {/* <Box sx={{ mt: 10, mb: 2 }}>
                            <Typography align="center" variant="h5">
                                Page {v.page}
                            </Typography>
                        </Box> */}
                        <table
                            style={{
                                width: '100%',
                                margin: '10px',
                                border: 0,
                                borderSpacing: '0 0',
                                borderCollapse: 'separate',
                            }}
                        >
                            <tbody>{tables_00_tagging_newline}</tbody>
                        </table>
                    </Fragment>
                )
            })}
        </>
    )
}
