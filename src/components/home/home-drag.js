import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { UuidTool } from 'uuid-tool'
import { Avatar, Box, Button, Container, Typography, Link, Chip, Card, CardContent, CardMedia } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@hooks/use-auth'
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '@components/icons/check-circle-outlined'
import { Users as UsersIcon } from '@components/icons/users'
import { Star as StarIcon } from '@components/icons/star'
import { Template as TemplateIcon } from '@components/icons/template'

import { FileDropzone } from '@components/convert/home-file-dropzone-demo'
import { PDFViewr } from '@components/convert/home-file-pdfviewer-demo'

import ServiceCheckPopover from '@components/popovers/popover-service-check'

/* Survey Id Creater*/
import { createResourceCode } from '@utils/create-resource-id'
/* Survey Schema */
import { surveyType } from '@schema/survey-type'

/*Popup*/
import DefaultInfoPopoverInfoConvert from '@components/popovers/popover-default-info'
/*Popup*/
import ConvertGuidePopover from '@components/popovers/popover-convert-guide'

export const HomeSectionDrag = ({ onMoveScroll }) => {
    const auth = useAuth()
    const { user } = useAuth()
    const router = useRouter()

    /* Service Check*/
    const initService = router.query.init

    const theme = useTheme()

    /* File Setting */
    const [files, setFiles] = useState([])
    const [fileName, setFileName] = useState('')
    useEffect(() => {
        if (globalThis.sessionStorage.getItem('set-file-cache') !== null) {
            globalThis.sessionStorage.removeItem('set-file-cache')
        }
    }, [])

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }

    const handleRemove = (file) => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path))
        globalThis.sessionStorage.removeItem('set-file-cache')
    }

    const handleRemoveAll = () => {
        setFiles([])
    }

    /* File Data Chekc */
    // useEffect(() => {
    //     if (files.length > 0) {
    //         // console.log(files)
    //         globalThis.sessionStorage.setItem('set-file-cache', JSON.stringify(files))
    //     }
    // }, [files])

    /* logout file session Remove */
    useEffect(() => {
        if (!auth.isAuthenticated) {
            setFiles([])
        }
    }, [auth.isAuthenticated])

    const [openDialogLoginModal, setOpenDialogLoginModal] = useState(false)

    const handleOpenLoginDialog = () => {
        if (auth.isAuthenticated) {
            // router.push('/dashboard').catch(console.error)
            onMoveScroll()
        } else {
            // setOpenDialogLoginModal(true)
            // TEST LOGIN STATE
            router.push('/auth/login').catch(console.error)
        }
    }

    const handleCloseLoginDialog = () => {
        setOpenDialogLoginModal(false)
    }

    /*Service Check */
    const [openDialogServiceCheck, setOpenDialogServiceCheck] = useState(false)

    const handleOpenServiceCheck = () => {
        setOpenDialogServiceCheck(true)
    }

    const handleCloseServiceCheck = () => {
        setOpenDialogServiceCheck(false)
    }

    const handleDismissServiceCheck = () => {
        globalThis.sessionStorage.setItem('dismiss-popup-service-check', 'true')
        setOpenDialogServiceCheck(false)
    }

    useEffect(() => {
        const value = globalThis.sessionStorage.getItem('dismiss-popup-service-check')

        if (initService === 'true' && value !== 'true') {
            setOpenDialogServiceCheck(true)
        }
    }, [initService])

    /* Service Price Intro */
    const [openDialogServiceBillingInfo, setOpenDialogServiceBillingInfo] = useState(false)
    const handleOpenServiceBillingInfo = () => {
        setOpenDialogServiceBillingInfo(true)
    }

    const handleCloseServiceBillingInfo = async () => {
        setOpenDialogServiceBillingInfo(false)
    }

    const handelMoveScroll = async () => {
        await handleCloseServiceBillingInfo()
        await onMoveScroll()
    }

    /*Info Popup*/
    const [openDialogDefaultInfo, setOpenDialogDefaultInfo] = useState(false)
    const handleOpenDefaultInfo = () => {
        setOpenDialogDefaultInfo(true)
    }
    const handleCloseDefaultInfo = async () => {
        setOpenDialogDefaultInfo(false)
    }

    const handleCloseMoveScroll = async () => {
        await handleCloseDefaultInfo()
        await onMoveScroll()
    }

    /*Guide Popup*/
    const [openDialogConvertGuide, setOpenDialogConvertGuide] = useState(false)
    const handleOpenConvertGuide = () => {
        setOpenDialogConvertGuide(true)
    }
    const handleCloseConvertGuide = async () => {
        setOpenDialogConvertGuide(false)
    }

    /*Popup Setting*/
    useEffect(() => {
        if (files.length > 0) {
            handleOpenDefaultInfo()
        }
    }, [files])

    return (
        <>
            <DefaultInfoPopoverInfoConvert onClose={handleCloseMoveScroll} open={openDialogDefaultInfo} title={'변환이 완료되었습니다.'} description={'계속해서 설문지를 만들어보세요!'} event={onMoveScroll} />
            {/* <ServiceCheckPopover
                onClose={handleCloseServiceCheck}
                open={openDialogServiceCheck}
                title={'설문지 파일을 드래그해서 변환해보세요!'}
                // dismiss={handleDismissServiceCheck}
            /> */}
            <ServiceCheckPopover
                onClose={handelMoveScroll}
                open={openDialogServiceBillingInfo}
                title={'결제 후 서비스를 이용해보세요!'}
                // dismiss={handleDismissServiceCheck}
            />
            <ConvertGuidePopover onClose={handleCloseConvertGuide} open={openDialogConvertGuide} title={'변환 방법 가이드'} description={''} buttonName={'닫기'} />
            <Box
                sx={{
                    // backgroundImage: `url(/background/design_typo_new.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right bottom',
                    backgroundSize: '80% auto',
                    backgroundColor: 'primary.main',
                    pt: 0,
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        alignItems: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'none',
                        // boxShadow: theme.shadows[7],
                    }}
                >
                    <Box
                        sx={{
                            pt: 8,
                            pb: 10,
                            paddingInline: {
                                xsl: 20,
                                lg: 10,
                                md: 0,
                                xs: 'none',
                            },
                        }}
                    >
                        {/* 아이콘+클릭만하면 서베이 완성 타이포 */}
                        {/* 드래그 영역 */}
                        {/* 마우스 오버레이시 보여주게될 화면 */}
                        <Card
                            sx={{
                                background: 'rgba(255,255,255,0.9)',
                                position: 'relative',
                                '& + &': {
                                    mt: 6,
                                },
                                paddingBlock: {
                                    md: 1,
                                    xs: 'none',
                                },
                                paddingInline: {
                                    md: 3,
                                    xs: 'none',
                                },
                                borderRadius: 0,
                                boxShadow: theme.shadows[15],
                                // '&:hover': {
                                //     backgroundColor: 'action.hover',
                                //     cursor: 'pointer',
                                //     opacity: 0.5,
                                //     transition: 'all 0.5s',
                                // },
                                // '&:after': {
                                //     content: '"\\A"',
                                //     position: 'absolute',
                                //     // display: 'flex',
                                //     width: '100%',
                                //     height: '100%',
                                //     top: 0,
                                //     left: 0,
                                //     background: 'rgba(0, 0, 0, 1)',
                                //     opacity: 0,
                                //     transition: 'all 0.5s',
                                // },
                                // '&:hover:after': {
                                //     opacity: 1,
                                // },
                            }}
                        >
                            <CardContent>
                                {/* Contents */}
                                <Box
                                    sx={{
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <img alt="" src="/ico/favicon.png" width={50} />
                                    <Typography
                                        color="text.black"
                                        sx={{
                                            fontSize: {
                                                md: '2rem',
                                                sm: '1.8rem',
                                                xs: '1.3rem',
                                            },
                                            fontWeight: 700,
                                            // height: 48,
                                            overflow: 'hidden',
                                            fontFamily: 'Noto Sans KR',
                                            textOverflow: 'ellipsis',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            ml: 2,
                                        }}
                                    >
                                        클릭만하면 서베이 완성!
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button
                                        onClick={() => (auth.isAuthenticated ? (user?.status == 3 ? router.push(`/ws/survey/${createResourceCode()}/${surveyType[0].url}/editor`) : setOpenDialogServiceBillingInfo(true)) : router.push('/auth/login'))}
                                        variant="contained"
                                        size="medium"
                                        align="right"
                                        sx={{ ml: 2, color: 'primary.text', display: { sm: 'flex', xs: 'none' } }}
                                    >
                                        온라인 설문 제작
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: { sm: 'row', xs: 'column' },
                                        flexWrap: 'wrap',
                                        mt: 2,
                                    }}
                                >
                                    {/* <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Typography variant="subtitle2">Sub Title</Typography>
                                </Box> */}

                                    <Box sx={{ mt: 3, display: { sm: 'none', xs: 'flex' } }} />
                                    <Button
                                        onClick={() => router.push(auth.isAuthenticated ? `/ws/survey/${createResourceCode()}/${surveyType[0].url}/editor` : '/auth/login')}
                                        variant="contained"
                                        size="medium"
                                        align="right"
                                        sx={{ ml: 0, color: 'primary.text', my: 0, display: { sm: 'none', xs: 'flex' } }}
                                    >
                                        온라인 설문 제작
                                    </Button>
                                    {/* <Button onClick={handleOpenConvertGuide} variant="outlined" size="medium" align="right" sx={{ ml: 0, color: 'primary.text', my: 1, display: { sm: 'none', xs: 'flex' } }} target="_blank" download>
                                        변환 방법 가이드
                                    </Button> */}
                                    <Box sx={{ mt: 3, display: { sm: 'none', xs: 'flex' } }} />
                                    <Box sx={{ flexGrow: 1, display: { sm: 'flex', xs: 'none' } }} />
                                    
                                </Box>

                                <Box
                                    sx={{
                                        mt: 2,
                                    }}
                                >
                                    <FileDropzone
                                        accept={{
                                            'application/pdf': [],
                                        }}
                                        files={files}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                    />
                                </Box>

                                <PDFViewr files={files} openPopup={handleOpenServiceBillingInfo} />

                                {/* Over lay */}
                                {!auth.isAuthenticated && files.length > 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            top: 0,
                                            left: 0,
                                            background: 'rgba(0, 0, 0, 1)',
                                            zIndex: 999,
                                            opacity: 0,
                                            transition: 'all 1s ease-out',
                                            '&:hover': {
                                                opacity: 0.8,
                                                transition: 'all 1.5s ease-in',
                                            },
                                        }}
                                    >
                                        <Typography
                                            color="text.white"
                                            sx={{
                                                width: '100%',
                                                overflow: 'hidden',
                                                textAlign: 'center',
                                                fontFamily: 'Noto Sans KR',
                                                textOverflow: 'ellipsis',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                marginBlock: 10,
                                            }}
                                            variant="h4"
                                        >
                                            1%의 시간만 쓰세요. 99%는 저희가 해드립니다.
                                        </Typography>
                                        <Button
                                            onClick={handleOpenLoginDialog}
                                            size="large"
                                            sx={{
                                                height: '30px',
                                                borderRadius: '20px 0px 20px 0px',
                                                mb: 13,
                                            }}
                                            type="button"
                                            variant="contained"
                                        >
                                            서비스 이용하기
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
                <Container
                    maxWidth="xl"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'none',
                    }}
                >
                    <Box
                        sx={{
                            paddingInline: {
                                md: 'none',
                                xs: 'none',
                            },
                            marginBottom: { md: '-60px', xs: '-40px' },
                        }}
                    >
                        {/* <Typography
                            color="primary.contrastText"
                            align="right"
                            variant="h1"
                            sx={{
                                fontFamily: 'Poppins',

                                paddingInline: {
                                    md: 5,
                                    xs: 'none',
                                },
                            }}
                        >
                            SURVEY MAKERS
                        </Typography> */}
                    </Box>
                </Container>
            </Box>
        </>
    )
}
