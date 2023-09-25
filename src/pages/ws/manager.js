import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import axios from 'axios'

/*MUI Element*/
import { Box, CircularProgress, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, TextField, Typography, IconButton } from '@mui/material'

/* MUI Icon*/
import PostAddIcon from '@mui/icons-material/PostAdd'
import ListIcon from '@mui/icons-material/List'
import DoneIcon from '@mui/icons-material/Done'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { AuthGuard } from '@components/auth/auth-guard'

//ELEMENT
const PAGE_TITLE = '설문지 관리'

/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'

/*Import Component*/
import SurveyCreateSelect from '@components/survey/survey-create-select'
import SurveyListTable from '@components/survey/survey-list-table'
import SurveyListTableEditable from '@components/survey/survey-list-table-editable'

/*Import Popup*/
import PopupSurveyCreate from '@components/popup/popup-survey-create'

const Page_Manager = () => {
    const { user } = useAuth()
    const router = useRouter()
    globalThis.sessionStorage.clear()

    //*/ Load Survey Data
    const [surveyListData, setSurveyListData] = useState(null)
    useEffect(() => {
        // 1. Router Load Check
        if (!router.isReady) {
            return
        }
        // 2. Mount Setting
        let isMounted = true

        //3 .Data Fetch
        const fetchData = async () => {
            await axios
                .get(`${process.env.NEXT_PUBLIC_API}/online/survey/list`, {
                    params: { UserCode: user?.code.data },
                })
                .then((res) => {
                    // console.log(res.data)
                    if (res.data) {
                        if (isMounted) {
                            setSurveyListData(res.data.payload)
                        }
                    }
                })
                .catch((error) => console.log(error))
        }
        // call the function
        fetchData().catch(console.error)
        return () => {
            isMounted = false
        }
    }, [])
    //*/

    //*/ Popup Contorl :: Create Survey
    const [popup_SurveyCreate, setPopup_SurveyCreate] = useState(false)

    const handleOpenPopup_SurveyCreate = () => {
        setPopup_SurveyCreate(true)
    }

    const handleClosePopup_SurveyCreate = () => {
        setPopup_SurveyCreate(false)
    }

    //*/ Editable Activation Control
    const [editableListActivation, setEditableListActivation] = useState(false)

    //*/ Data Loading Check
    if (surveyListData === null) {
        return (
            <CircularProgress
                size={50}
                sx={{
                    color: 'primary.main',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
            />
        )
    }

    //*/

    return (
        <>
            <PopupSurveyCreate onClose={handleClosePopup_SurveyCreate} open={popup_SurveyCreate} />
            <Head>
                <title>{PAGE_TITLE} | 인공지능 기반 건축설계 자동화 기술개발 연구단</title>
            </Head>
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    flexGrow: 1,
                    py: 5,
                    background: '#fff',
                    minHeight: 'calc(100vh - 150px)',
                }}
            >
                {/* Title Line */}
                <Box sx={{ mb: 4 }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography variant="h4">설문지 관리</Typography>
                        </Grid>
                        {surveyListData.length !== 0 && (
                            <Grid item>
                                <NextLink href={`/ws/ipaupload`}>
                                    <Button
                                        sx={{ mr: 1 , mt:1 }}
                                        variant="outlined"
                                        startIcon={<FileUploadOutlinedIcon />}
                                        color='secondary'
                                    >
                                        IPA 설문 업로드
                                    </Button>
                                </NextLink>
                                
                                <Button
                                    sx={{ mr: 1, mt:1 }}
                                    onClick={() => setEditableListActivation(!editableListActivation)}
                                    variant="outlined"
                                    startIcon={!editableListActivation ? <ListIcon /> : <DoneIcon />}
                                    color={!editableListActivation ? 'secondary' : 'primary'}
                                >
                                    {!editableListActivation ? '리스트 편집' : '편집 완료'}
                                </Button>

                                <Button 
                                    sx={{  mt:1 }} onClick={handleOpenPopup_SurveyCreate} variant="outlined" startIcon={<PostAddIcon />} color="secondary">
                                    설문지 제작하기
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />
                {/* Empty Title Line */}
                {surveyListData.length == 0 && (
                    <Box sx={{}}>
                        <SurveyCreateSelect />
                    </Box>
                )}

                {/* Selected Item List */}
                {surveyListData.length !== 0 && <Box>{!editableListActivation ? <SurveyListTable onlineData={surveyListData} /> : <SurveyListTableEditable onlineData={surveyListData} />}</Box>}
            </Container>
        </>
    )
}

Page_Manager.getLayout = (page) => (
    <AuthGuard>
        <LayoutWithServiceMenu>{page}</LayoutWithServiceMenu>
    </AuthGuard>
)

export default Page_Manager
