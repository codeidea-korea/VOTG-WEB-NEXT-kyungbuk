import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { toast } from 'react-toastify'
import { UuidTool } from 'uuid-tool'
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar, Typography, Tooltip } from '@mui/material'
import { useAuth } from '@hooks/use-auth'
import { useSettings } from '@hooks/use-settings'
import { Logo } from '@components/layout/logo'

/* MUI Icon */
import PolicyIcon from '@mui/icons-material/Policy'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

/* Icon */
import { Menu as MenuIcon } from '@components/icons/menu'

// 1. Menu List
/* 서베이조사,  통계분석 크롤링 빅데이터분석, 의뢰하기 */
const menuCenter = [
    {
        title: '서베이 조사',
        href: '/service/research',
    },
    {
        title: '통계분석',
        href: '/service/statistics',
    },
    {
        title: '크롤링',
        href: '/service/crawling',
    },
    {
        title: '빅데이터 분석',
        href: '/service/bigdata',
    },
    {
        title: '상담신청',
        href: '/request',
    },
    {
        title: '공지사항',
        href: '/board/notice',
    },
]

const HomeSubNavbar = (props) => {
    const auth = useAuth()
    const { user, logout } = useAuth()
    const router = useRouter()
    const { asPath } = router

    const { onOpenSidebar } = props

    const [openDialog, setOpenDialog] = useState(false)

    const handleRouteLoginLogoutControl = () => {
        if (auth.isAuthenticated) {
            handleLogout()
        } else {
            router.push('/auth/login').catch(console.error)
        }
    }

    const handleRouteSurvey = () => {
        if (auth.isAuthenticated) {
            router.push('/ws').catch(console.error)
        } else {
            router.push('/auth/login').catch(console.error)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            handlePushRoutingEvent()
            toast.success('로그아웃')
        } catch (err) {
            console.error(err)
            toast.error('Unable to logout.')
        }
    }

    const handleCloseLoginDialog = () => {
        setOpenDialog(false)
    }

    const handlePushRoutingEvent = async () => {
        globalThis.sessionStorage.removeItem('shared-check')
        globalThis.sessionStorage.removeItem('convert-pdf-cache')
        globalThis.sessionStorage.removeItem('convert-survey-question-init-check')
        globalThis.sessionStorage.removeItem('convert-survey-question')
        globalThis.sessionStorage.removeItem('create-survey-question')
        globalThis.sessionStorage.removeItem('current-create-survey')
        globalThis.sessionStorage.removeItem('set-file-cache')
        globalThis.sessionStorage.removeItem('send-phone-number')
        globalThis.sessionStorage.removeItem('send-type')
        await router.push('/').catch(console.error)
    }

    return (
        <>
            <AppBar
                elevation={0}
                sx={{
                    backgroundColor: '#fff',
                    // borderBottomColor: 'divider',
                    // borderBottomStyle: 'solid',
                    // borderBottomWidth: 1,
                    color: 'text.secondary',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: 64, maxHeight: 70 }}>
                        {/* LOGO BUTTON */}
                        <NextLink href="/service/research" passHref>
                            <a>
                                <Box
                                    sx={{
                                        justifyContent: 'left',
                                        alignItems: 'left',
                                        display: 'flex',
                                    }}
                                >
                                    <Logo
                                        // variant={'color'}
                                        sx={{
                                            display: {
                                                md: 'inline',
                                                // xs: 'none',
                                            },
                                            width: { md: 150, xs: 130 },
                                            height: 40,
                                            marginRight: '0px',
                                        }}
                                    />
                                </Box>
                            </a>
                        </NextLink>
                        <Box sx={{ flexGrow: 1 }} />

                        {/* CENTER ROUTER BUTTON */}
                        {/* 서베이조사,  통계분석 크롤링 빅데이터분석, 의뢰하기 */}
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: {
                                    md: 'flex',
                                    xs: 'none',
                                },
                                ml: { lg: 15, md: 5 },
                                mr: 0,
                            }}
                        >
                            {menuCenter.map((menu, index) => {
                                return (
                                    <NextLink href={menu.href} key={`center-menu-${index}`}>
                                        <Button
                                            component="a"
                                            size="large"
                                            variant="contained"
                                            sx={{
                                                color: menu.href == asPath ? 'primary.main' : 'text.black',
                                                background: 'transparent',
                                                // ...(menu.href === asPath && { pointerEvents: 'none', cursor: 'default' }),
                                                ':hover': {
                                                    color: 'text.secondary',
                                                    background: 'transparent',
                                                },
                                                fontSize: { xl: '1.2rem', lg: '1rem', md: '0.9rem' },
                                                p: { xl: 5, lg: 2, md: 1 },
                                            }}
                                        >
                                            {menu.title}
                                        </Button>
                                    </NextLink>
                                )
                            })}
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        {/* RIGHT SIDE ICON BUTTON */}
                        <Box
                            sx={{
                                width: '300px',
                                alignItems: 'center',
                                justifyContent: 'right',
                                display: {
                                    md: 'flex',
                                    xs: 'none',
                                },
                            }}
                        >
                            {user?.mode >= 2 && (
                                <IconButton
                                    onClick={() => router.push('/adm')}
                                    sx={{
                                        color: 'primary.main',
                                        mr: '2px',
                                    }}
                                >
                                    <Tooltip title="관리자 모드">
                                        <AdminPanelSettingsIcon fontSize="medium" />
                                    </Tooltip>
                                </IconButton>
                            )}

                            {!(auth.isAuthenticated && auth.survey) ? (
                                <>
                                    {/* <Tooltip title="로그인·회원가입"> */}
                                    <Button
                                        onClick={handleRouteLoginLogoutControl}
                                        sx={{
                                            color: 'primary.main',
                                            mr: '10px',
                                        }}
                                        // startIcon={<LoginIcon fontSize="medium" />}
                                    >
                                        로그인·회원가입
                                    </Button>
                                    {/* </Tooltip> */}
                                </>
                            ) : (
                                <>
                                    {user?.status == 3 && (
                                        <IconButton
                                            onClick={() => router.push('/ws/manager')}
                                            sx={{
                                                color: 'primary.main',
                                                mr: '2px',
                                            }}
                                        >
                                            <Tooltip title="설문지 관리">
                                                <HistoryEduIcon fontSize="medium" />
                                            </Tooltip>
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => router.push('/ws/mypage')}
                                        sx={{
                                            color: 'primary.main',
                                            mr: '2px',
                                        }}
                                    >
                                        <Tooltip title="마이페이지">
                                            <AccountCircleIcon fontSize="medium" />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleRouteLoginLogoutControl}
                                        sx={{
                                            color: 'primary.main',
                                            mr: '10px',
                                        }}
                                    >
                                        <Tooltip title="로그아웃">
                                            <LogoutIcon fontSize="medium" />
                                        </Tooltip>
                                    </IconButton>
                                </>
                            )}
                            <>
                                {/* <Tooltip title="로그인·회원가입"> */}
                                {/* <NextLink href={`/panel`}> */}
                                {/* <Button
                                    component="a"
                                    href="/panel"
                                    sx={{
                                        // color: 'info.main',
                                        mr: '0px',
                                    }}
                                    color="primary"
                                    variant="contained"
                                    // startIcon={<LoginIcon fontSize="medium" />}
                                >
                                    패널 커뮤니티
                                </Button> */}
                                {/* </NextLink> */}
                                {/* </Tooltip> */}
                            </>
                        </Box>

                        {/* MOBILE ICON SIDEBAR ACTIVE BUTTON */}
                        <IconButton
                            onClick={onOpenSidebar}
                            sx={{
                                color: 'primary.main',
                                display: {
                                    md: 'none',
                                },
                            }}
                        >
                            <MenuIcon fontSize="medium" />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

HomeSubNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
}

export default HomeSubNavbar
