import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, Tabs, Tab, TextField, Typography } from '@mui/material'
import { AuthGuard } from '@components/auth/auth-guard'
// import { DashboardLayout } from '@layouts/dashboard'

/* Icons */
import { ArrowRight as ArrowRightIcon } from '@components/icons/arrow-right'
import { Briefcase as BriefcaseIcon } from '@components/icons/briefcase'
import { Download as DownloadIcon } from '@components/icons/download'
import { ExternalLink as ExternalLinkIcon } from '@components/icons/external-link'
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '@components/icons/information-circle-outlined'
import { Reports as ReportsIcon } from '@components/icons/reports'
import { Users as UsersIcon } from '@components/icons/users'
// import { gtm } from '../../lib/gtm'

import { AccountGeneralSettings } from '@components/mypage/account-general-setting'

//Tabs Contents
const tabs = [
    { label: '계정 정보', value: 'account' },
    // { label: '이용 서비스', value: 'billing' },
]

//ELEMENT
const PAGE_TITLE = '내정보'

/*Improt Layouts*/
import LayoutWithDefaultMenu from '@layouts/ws/layout-with-default-menu'

const Mypage = () => {
    const router = useRouter()
    const selected = router.query.selected
    //Banner
    const [displayBanner, setDisplayBanner] = useState(true)
    //Tab
    const [currentTab, setCurrentTab] = useState(selected || 'account')

    // useEffect(() => {
    //     gtm.push({ event: 'page_view' })
    // }, [])

    useEffect(() => {
        // Restore the persistent state from local/session storage
        const value = globalThis.sessionStorage.getItem('dismiss-banner')

        if (value === 'true') {
            // setDisplayBanner(false);
        }
    }, [])

    const handleDismissBanner = () => {
        // Update the persistent state
        // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
        setDisplayBanner(false)
    }

    //Tab
    const handleTabsChange = (event, value) => {
        setCurrentTab(value)
    }

    return (
        <>
            <Head>
                <title>{PAGE_TITLE} | 뷰즈온더고 :: Views On the Go</title>
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
                <Box sx={{ mb: 4 }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography variant="h4">내정보</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Tabs indicatorColor="primary" onChange={handleTabsChange} scrollButtons="auto" textColor="primary" value={currentTab} variant="scrollable" sx={{ mt: 3 }}>
                    {tabs.map((tab) => (
                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </Tabs>
                <Divider sx={{ mb: 3 }} />
                {currentTab === 'account' && <AccountGeneralSettings />}
                {/* {currentTab === 'billing' && <PlanSelect />} */}
                {/* {currentTab === 'team' && <AccountTeamSettings />}
                    {currentTab === 'notifications' && <AccountNotificationsSettings />}
                    {currentTab === 'security' && <AccountSecuritySettings />} */}
            </Container>
        </>
    )
}

Mypage.getLayout = (page) => (
    <AuthGuard>
        <LayoutWithDefaultMenu>{page}</LayoutWithDefaultMenu>
    </AuthGuard>
)

export default Mypage
