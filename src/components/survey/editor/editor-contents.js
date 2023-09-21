import { Fragment, useEffect, useState } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { UuidTool } from 'uuid-tool'

/*MUI Element*/
import { styled } from '@mui/material/styles'
import { useMediaQuery, AppBar, Avatar, Badge, Box, Button, ButtonBase, Card, Grid, IconButton, Toolbar, Tooltip, Typography, Divider } from '@mui/material'

/*MUI Icon*/

/*Custom Icon*/

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'

/* Survey Id Creater*/
import { createResourceCode } from '@utils/create-resource-id'
/* Survey Schema */
import { elementType, elementFunction, defaultQuestion, answerType } from '@schema/element-schema'

/*Drag Align*/
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
/*Transition*/
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'
/*Transition Style*/
const duration = 300

/* Component */
import { Scrollbar } from '@components/layout/scrollbar'
import ContetnsInfo from '@components/survey/editor/contents-info'
import ContentsCard from '@components/survey/editor/contents-card' // %=== ./contents-card'
import ContentsAdd from '@components/survey/editor/contents-add'

const EditorContents = (props) => {
    const { sidebarToggleHandler, open, editModeController, mainItemInfo, setMainItemInfo, mainItemList, setMainItemList, currentSelected, setCurrentSelected, targets } = props

    /* Width Check */
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    })

    /* Sidebar Auto Spread Control */
    useEffect(() => {
        // if (!open) {
        //     sidebarToggleHandler()
        // }
    }, [lgUp])

    /* Drag Cotroller */
    // Drag Reorder
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }
    // Drage End Action
    const onDragEnd = (result) => {
        // console.log('onDragEnd - result', result)
        // dropped outside the list
        if (!result.destination) {
            return
        }
        if (result.destination.index === result.source.index) {
            return
        }

        const items = reorder(mainItemList, result.source.index, result.destination.index)

        // console.log('onDragEnd - items', items)
        setMainItemList([...items])
        setCurrentSelected(result.destination.index)
    }

    /* Survey Infomation Title & Description Control */
    const onChangeEditThisItem_Info = (event) => {
        let updateItem = {}
        const inputType = event.target.name
        const inputData = event.target.value
        // console.log('event.target.name', event.target.name)
        if (inputType === 'title') {
            // console.log('title', inputData)
            updateItem = { ...mainItemInfo, title: inputData }
        } else {
            // console.log('description', inputData)
            updateItem = { ...mainItemInfo, description: inputData }
        }
        setMainItemInfo(updateItem)
    }

    const onChangeEditThisItem_LogoImage = (path) => {
        let updateItem = {}
        console.log('onChangeEditThisItem_LogoImage', path)
        updateItem = { ...mainItemInfo, logoImage: path }
        setMainItemInfo(updateItem)
    }

    /* Main Item Contnents Control Event */
    // 0. Add Question Item
    const onClickAddQeustionItem = (currentIndex) => {
        // console.log('qNumber', currentIndex)
        mainItemList.splice(currentIndex, 0, { id: UuidTool.newUuid().replace(/-/g, ''), ...defaultQuestion })
        // console.log('questionList', questionList)
        setMainItemList([...mainItemList])
        // setQuestionList([...questionList, defaultQuestion])
    }

    // 1. Remove
    const onClickRemoveThisItem = (questionItem) => setMainItemList((items) => items.filter((item) => item.id !== questionItem.id))
    // 2. Edit Contnents
    const onChangeEditThisItem_Value = (selectedIndex, event) => {
        // console.log('onChangeEditThisItem_Value - selectedIndex', selectedIndex)
        // console.log('onChangeEditThisItem_Value - name', event.target.name)
        // console.log('onChangeEditThisItem_Value - value', event.target.value)
        const updateList = mainItemList.map((item, index) => {
            if (selectedIndex === index) {
                if (event.target.name == 'title') {
                    const updateItem = { ...item, [event.target.name]: event.target.value }
                    return updateItem
                } else {
                    const updateItem = { ...item, [event.target.name]: event.target.value }
                    return updateItem
                }
            }
            return item
        })
        // console.log('onChangeEditThisItem_Value :: updateList', updateList)
        setMainItemList(updateList)
    }
    // 3. Edit Type
    const onChangeEditThisItem_Type = (selectedIndex, typeData) => {
        // console.log('onChangeEditThisItem_Type - selectedIndex', selectedIndex)
        // console.log('onChangeEditThisItem_Type - typeData', typeData)
        const updateList = mainItemList.map((item, index) => {
            if (selectedIndex === index) {
                const updateItem = {
                    ...item,
                    type: typeData.number,
                    typeText: typeData.title,
                    duplicate: false,
                    etcActive: false,
                    etcAnswer: { content: '', type: 'TextField' },
                    answer: [{ id: UuidTool.newUuid().replace(/-/g, ''), ...answerType[typeData.number] }],
                }
                // console.log('updateItem', updateItem)
                return updateItem
            }
            return item
        })
        // console.log('onChangeEditThisItem_Type :: updateList', updateList)
        setMainItemList(updateList)
    }
    // 4. Edit Function
    const onChangeEditThisItem_Func = (selectedIndex, functionData, currentQuestion) => {
        // console.log('onChangeEditThisItem_Func - selectedIndex', selectedIndex)
        // console.log('onChangeEditThisItem_Func - functionData', functionData)
        const updateList = mainItemList.map((item, index) => {
            if (selectedIndex === index) {
                let updateItem = {}
                if (functionData.number === 0) {
                    updateItem = { ...item, duplicate: false }
                } else if (functionData.number === 1) {
                    if (item.type === 0) {
                        updateItem = { ...item, duplicate: true, logicActive: false, logicNext: [] }
                    }
                } else if (functionData.number === 2) {
                    updateItem = !item.logicActive ? { ...item, logicActive: !item.logicActive, logicNext: [] } : { ...item, logicActive: !item.logicActive, logicNext: null }
                } else if (functionData.number === 3) {
                    updateItem = { ...item, required: !item.required }
                } else {
                    return item
                }

                // console.log('updateItem', updateItem)
                return updateItem
            }
            return item
        })
        // console.log('updateList', updateList)
        setMainItemList(updateList)
        if (functionData.number === 4) {
            // console.log('selectedIndex', selectedIndex)
            onCopyQuestionAnswer(selectedIndex, currentQuestion)
        }
    }

    // 4-4. Copy Question Function
    const onCopyQuestionAnswer = (selectedIndex, selectedAnswer) => {
        console.log('onCopyQuestionAnswer', selectedAnswer)
        let newQuestion = { ...selectedAnswer }
        delete newQuestion.id
        mainItemList.splice(selectedIndex + 1, 0, { id: UuidTool.newUuid().replace(/-/g, ''), ...newQuestion })
        setMainItemList([...mainItemList])
    }

    return (
        <>
            <Scrollbar sx={{ marginLeft: open && lgUp ? '250px' : 0, mb: '200px' }}>
                {/**
                 * 1. Survey Contents Infomation
                 * Sruvey Infomation Title & Description
                 * */}
                <Box
                    sx={{ my: 2, mx: 1 }}
                    // Sidebar Click Auto Scroll Focus ref Event
                    ref={(el) => (targets.current[-1] = el)}
                >
                    <ContetnsInfo
                        currentSelected={currentSelected}
                        editModeController={editModeController}
                        mainItemInfo={mainItemInfo}
                        onChangeEditThisItem_Info={onChangeEditThisItem_Info}
                        onChangeEditThisItem_LogoImage={onChangeEditThisItem_LogoImage}
                    />
                </Box>
                {/**
                 * 2. Contents Card
                 * Sruvey Infomation Title & Description
                 * */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="question-list">
                        {(provided) => (
                            <Box ref={provided.innerRef} {...provided.droppableProps}>
                                <Box ref={provided.innerRef} {...provided.droppableProps}>
                                    <TransitionGroup>
                                        {mainItemList.map((q, qIndex) => {
                                            const qNumber = qIndex + 1
                                            return (
                                                <CSSTransition key={q.id} timeout={duration * 1.5} classNames="fade">
                                                    <Draggable key={q.id} draggableId={q.id} index={qIndex}>
                                                        {(_provided, snapshot) => (
                                                            //  Drag Element Wrapper
                                                            <Box
                                                                sx={{ ..._provided.draggableProps.style, margin: '0 auto' }} //
                                                                ref={_provided.innerRef}
                                                                snapshot={snapshot}
                                                                {..._provided.draggableProps}
                                                                {..._provided.dragHandleProps}
                                                            >
                                                                {/* If Dragging or not style edit */}
                                                                <Box
                                                                    sx={{
                                                                        opacity: snapshot.isDragging ? '0.5' : '1',
                                                                    }}
                                                                >
                                                                    {/**
                                                                     * Element Style Start
                                                                     * */}

                                                                    <Box
                                                                        sx={{ my: 2, mx: 1 }}
                                                                        // Sidebar Click Auto Scroll Focus ref Event
                                                                        ref={(el) => (targets.current[qIndex] = el)}
                                                                    >
                                                                        <ContentsCard
                                                                            dragSnapshot={snapshot}
                                                                            questionList={mainItemList}
                                                                            setQuestionList={setMainItemList}
                                                                            questionsLength={mainItemList.length}
                                                                            questionItem={q}
                                                                            setQuestionItem={setMainItemInfo}
                                                                            questionIndex={qIndex}
                                                                            questionNumber={qNumber}
                                                                            currentSelected={currentSelected}
                                                                            editModeController={editModeController}
                                                                            onClickRemoveThisItem={onClickRemoveThisItem}
                                                                            onChangeEditThisItem_Value={onChangeEditThisItem_Value}
                                                                            onChangeEditThisItem_Type={onChangeEditThisItem_Type}
                                                                            onChangeEditThisItem_Func={onChangeEditThisItem_Func}
                                                                        />
                                                                    </Box>

                                                                    {/**
                                                                     * Element Add Line
                                                                     */}
                                                                    {!snapshot.isDragging && <ContentsAdd onClickAddQeustionItem={() => onClickAddQeustionItem(qNumber)} />}
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                </CSSTransition>
                                            )
                                        })}
                                    </TransitionGroup>
                                </Box>
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Scrollbar>
        </>
    )
}

export default EditorContents
