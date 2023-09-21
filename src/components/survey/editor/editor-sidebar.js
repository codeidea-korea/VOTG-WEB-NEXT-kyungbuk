import { Fragment, useEffect, useState } from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { UuidTool } from 'uuid-tool'

/*MUI Element*/
import { styled } from '@mui/material/styles'
import { Box, Button, Chip, Divider, Drawer, Typography, Tooltip, useMediaQuery, IconButton, TextField, InputAdornment, ListItem } from '@mui/material'

/*MUI Icon*/
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'

/*Custom Icon*/
import { IconSurvey } from '@public/votg/IconSurvey'
import { IconPayment } from '@public/votg/IconPayment'
import { IconMypage } from '@public/votg/IconMypage'
import { IconCreateDragDrop } from '@public/votg/IconCreateDragDrop'
import { IconCreateOnlineForm } from '@public/votg/IconCreateOnlineForm'

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'

/* Survey Id Creater*/
import { createResourceCode } from '@utils/create-resource-id'
/* Survey Schema */
import { elementType, elementFunction } from '@schema/element-schema'

/*Drag Align*/
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

/* Component */
import { Scrollbar } from '@components/layout/scrollbar'

const EditorSidebar = (props) => {
    const { sidebarToggleHandler, open, autoScrollController, sideItemInfo, sideItemList, setSideItemList, currentSelected, setCurrentSelected, targets } = props
    const router = useRouter()

    /* Width Check */
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    })

    /* Sidebar Auto Spread Control */
    useEffect(() => {
        if (!open) {
            sidebarToggleHandler()
        }
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
        console.log('onDragEnd - result', result)
        // dropped outside the list
        if (!result.destination) {
            return
        }
        if (result.destination.index === result.source.index) {
            return
        }

        const items = reorder(sideItemList, result.source.index, result.destination.index)

        // console.log('onDragEnd - items', items)
        setSideItemList([...items])
        setCurrentSelected(result.destination.index)
    }

    /* Search Result */
    const [searchText, setSearchText] = useState('')
    const onChangeSearchText = (event) => {
        let inputText = event.target.value //.replace(/(^\s*)|(\s*$)/g, '')

        setSearchText(inputText)
    }
    const [itemListFiltered, setItemListFiltered] = useState([])

    useEffect(() => {
        // console.log('sideItemList', sideItemList)
        let resultItemList = sideItemList.filter((item) => item.title.includes(searchText) || item.typeText.includes(searchText))
        setItemListFiltered(resultItemList)
    }, [searchText])

    /* View Sidebar*/
    const content = (
        <>
            <Scrollbar
                sx={{
                    marginTop: '150px',
                    height: 'calc(100% - 150px)',
                    '& .simplebar-content': {
                        height: '100%',
                    },
                    backgroundColor: '#fefefe',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <>
                        <Box sx={{ p: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="검색"
                                inputProps={{
                                    style: { fontSize: '0.8rem' },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {searchText.length > 0 && <HighlightOffIcon sx={{ mr: 1 }} fontSize="small" onClick={() => setSearchText('')} />}
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                                value={searchText}
                                onChange={onChangeSearchText}
                            />
                        </Box>
                    </>
                    <Divider
                        sx={{
                            borderColor: '#eee',
                            my: 2,
                        }}
                    />
                    {searchText.length > 0 ? (
                        // Filtered Item List View
                        <Box sx={{ flexGrow: 1 }}>
                            {itemListFiltered.map((item, itemIndex) => {
                                return (
                                    <ListItem
                                        disableGutters
                                        sx={{
                                            display: 'flex',
                                            mb: 0.8,
                                            py: 0,
                                            pl: 0.5,
                                        }}
                                    >
                                        {/* <NextLink href={v.path} passHref> */}
                                        <Button
                                            component="a"
                                            sx={{
                                                borderRadius: 1,
                                                color: itemIndex === currentSelected ? '#000' : 'neutral.500',
                                                fontWeight: itemIndex === currentSelected ? '700' : 500,
                                                justifyContent: 'flex-start',
                                                pr: 3,
                                                textAlign: 'left',
                                                textTransform: 'none',
                                                width: '100%',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255, 0.08)',
                                                },
                                            }}
                                            onClick={() => autoScrollController(itemIndex)}
                                        >
                                            <Box sx={{ flexGrow: 1, fontSize: '0.7rem' }}>
                                                {sideItemList.indexOf(item) + 1}.{` `}
                                                {/* {item.title} */}
                                                {item.title.length > 0 ? `${item.title.substring(0, 7)}${item.title.length > 7 ? `...` : ''}` : `문항 제목을 입력해주세요`}
                                            </Box>
                                            {item.type !== null && item.type !== undefined && (
                                                <Box
                                                    sx={{
                                                        flexGrow: 0.5,
                                                        fontSize: '0.7rem',
                                                        alignItems: 'left',
                                                        color: 'text.secondary',
                                                        fontWeight: itemIndex === currentSelected ? '700' : 500,
                                                    }}
                                                >
                                                    {`· `} {item.typeText} {!item.duplicate ? `단일` : '중복'}
                                                </Box>
                                            )}
                                        </Button>
                                        {/* </NextLink> */}
                                    </ListItem>
                                )
                            })}
                        </Box>
                    ) : (
                        // Dragable Default Item List View
                        <>
                            {/* Item Infomation Fiexed Value */}
                            <Button
                                component="a"
                                sx={{
                                    borderRadius: 1,
                                    color: sideItemInfo.title.length == 0 ? 'error.main' : currentSelected === -1 ? '#000' : 'neutral.500',
                                    fontWeight: currentSelected === -1 ? '700' : 500,
                                    justifyContent: 'flex-start',
                                    pr: 3,
                                    textAlign: 'left',
                                    textTransform: 'none',
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255, 0.08)',
                                    },
                                }}
                                onClick={() => autoScrollController(-1)}
                                startIcon={<HistoryEduIcon size={'small'} />}
                            >
                                <Box sx={{ flexGrow: 1, fontSize: currentSelected === -1 ? '0.9rem' : '0.8rem' }}>
                                    {sideItemInfo.title.length > 0 ? `${sideItemInfo.title.substring(0, 15)}${sideItemInfo.title.length > 15 ? `...` : ''}` : `설문지 정보를 입력해주세요`}
                                </Box>
                            </Button>
                            {/* Item Qeustion List */}
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="side-question-list">
                                    {(provided) => (
                                        <Box sx={{ flexGrow: 1 }} ref={provided.innerRef} {...provided.droppableProps}>
                                            {sideItemList.map((item, itemIndex) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                                                        {(_provided, snapshot) => (
                                                            <ListItem
                                                                disableGutters
                                                                sx={{
                                                                    display: 'flex',
                                                                    mb: 0.8,
                                                                    py: 0,
                                                                    pl: 0.5,
                                                                    ..._provided.draggableProps.style,
                                                                }}
                                                                ref={_provided.innerRef}
                                                                snapshot={snapshot}
                                                                {..._provided.draggableProps}
                                                                {..._provided.dragHandleProps}
                                                            >
                                                                {/* <NextLink href={v.path} passHref> */}
                                                                <Button
                                                                    component="a"
                                                                    sx={{
                                                                        borderRadius: 1,
                                                                        color: item.title.length == 0 ? 'error.main' : itemIndex === currentSelected ? '#000' : 'neutral.500',
                                                                        fontWeight: itemIndex === currentSelected ? 700 : 500,
                                                                        justifyContent: 'flex-start',
                                                                        pr: 2,
                                                                        textAlign: 'left',
                                                                        textTransform: 'none',
                                                                        width: '100%',
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(255,255,255, 0.08)',
                                                                        },
                                                                    }}
                                                                    onClick={() => autoScrollController(itemIndex)}
                                                                    endIcon={
                                                                        <Tooltip title="원하는 위치에 끌어다 놓으세요" placement="right">
                                                                            <DragIndicatorIcon size={'small'} color={'disabled'} />
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                                                        <Box sx={{ flexGrow: 1, fontSize: itemIndex === currentSelected ? '0.8rem' : '0.7rem' }}>
                                                                            {itemIndex + 1}.{` `}
                                                                            {/* {item.title} */}
                                                                            {item.title.length > 0 ? `${item.title.substring(0, 15)}${item.title.length > 15 ? `...` : ''}` : `제목을 입력해주세요`}
                                                                        </Box>
                                                                        {item.type !== null && item.type !== undefined && (
                                                                            <Box
                                                                                sx={{
                                                                                    flexGrow: 1,
                                                                                    fontSize: itemIndex === currentSelected ? '0.7rem' : '0.6rem',
                                                                                    alignItems: 'left',
                                                                                    mt: 0,
                                                                                    pl: 1,
                                                                                    color: 'text.secondary',
                                                                                    fontWeight: itemIndex === currentSelected ? '700' : 500,
                                                                                }}
                                                                            >
                                                                                {`┗ `} {item.required && `*필수응답`} · {item.typeText} · {!item.duplicate ? `단일` : '중복'}
                                                                            </Box>
                                                                        )}
                                                                    </Box>
                                                                </Button>
                                                                {/* </NextLink> */}
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}

                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </>
                    )}
                </Box>
            </Scrollbar>
            {/* {userData?.organization.length >= 2 && (
                <OrganizationPopover
                    anchorEl={organizationsRef.current}
                    onClose={handleCloseOrganizationsPopover}
                    open={openOrganizationsPopover}
                />
            )} */}
        </>
    )

    /* Size Check & View */
    if (lgUp) {
        let returnDiv = open ? (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#fff',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        color: '#000',
                        width: 250,
                        zIndex: 9,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        ) : (
            <></>
        )
        return returnDiv
    }

    return (
        <Drawer
            anchor="left"
            onClose={sidebarToggleHandler}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#fff',
                    color: '#000',
                    width: 250,
                    zIndex: 9,
                },
            }}
            variant="temporary"
        >
            {content}
        </Drawer>
    )
}

export default EditorSidebar
