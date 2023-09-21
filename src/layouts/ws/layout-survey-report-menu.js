import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import PropTypes, { bool } from 'prop-types'
import { styled } from '@mui/material/styles'
import { UuidTool } from 'uuid-tool'
import { toast } from 'react-toastify'
import API from '@utils/API'
import { wait } from '@utils/wait'

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'

/*MUI Component*/
import { Box, Typography, Toolbar, IconButton } from '@mui/material'
/*MUI Icon*/
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

/*Import Components*/
import SurveyMenu from '@components/ws/survey-menu'

/*Root*/
const LayoutSurveyRoot = styled('div')(({ theme }) => ({
    // background: '#fff',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    marginTop: '80px',
    [theme.breakpoints.down('md')]: {
        marginTop: '110px',
    },
}))

/* Menu Info Init*/

const LayoutSurveyReportMenu = (props) => {
    const { children, editMode, questionCheck, panelCheck, errorList } = props
    /*User*/
    const { user, logout } = useAuth()
    /*Router*/
    const router = useRouter()
    // Path Check
    const { asPath, pathname } = router // asPath = /realdata , pathname = /[code]
    // Param Check
    const { code, type } = router.query

    return (
        <>
            <Box
                sx={{
                    background: '#fff',
                    boxShadow: (theme) => theme.shadows[3],
                    mb: 1,
                    zIndex: 10,
                    /* width: '100%', */
                    position: 'fixed',
                    top: '65px',
                    left: 0,
                    right: 0,
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // background: '#000',
                        }}
                    >
                        <NextLink href={`/ws/manager`}>
                            <IconButton
                                color="primary"
                                // onClick={handleOpenLogoutWarning}
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                }}
                            >
                                <NavigateBeforeIcon width={40} color="primary" />
                                설문지 관리
                            </IconButton>
                        </NextLink>
                    </Box>
                </Toolbar>
            </Box>
            <LayoutSurveyRoot>{children}</LayoutSurveyRoot>
        </>
    )
}

LayoutSurveyReportMenu.propTypes = {
    children: PropTypes.node,
    editMode: bool,
}

export default LayoutSurveyReportMenu
