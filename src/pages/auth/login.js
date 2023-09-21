import { useEffect } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material'
import { useSettings } from '@hooks/use-settings'
import { Logo } from '@components/layout/logo'
// import { AuthBanner } from '../../components/authentication/auth-banner'
import { JWTLogin } from '@components/auth/jwt-login-email'
import { GuestGuard } from '@components/auth/guest-guard'
import { useAuth } from '@hooks/use-auth'
// import { gtm } from '../../lib/gtm'

/* Language */
import { useTranslation } from 'react-i18next'

const Login = () => {
    const router = useRouter()
    const { platform } = useAuth()
    const { disableGuard } = router.query
    const { t } = useTranslation()

    // useEffect(() => {
    //     gtm.push({ event: 'page_view' })
    // }, [])

    return (
        <>
            <Head>
                <title>{t('로그인')} | VOTG</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '90vh',
                }}
            >
                {/* <AuthBanner /> */}
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: '30px',
                            md: '120px',
                        },
                    }}
                >
                    <Card elevation={16} sx={{ p: 4 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <NextLink href="/service/research" passHref>
                                <a>
                                    <Logo
                                        variant={'dark'}
                                        sx={{
                                            width: 210,
                                            height: 56,
                                        }}
                                    />
                                </a>
                            </NextLink>

                            <Typography variant="h4">{t('로그인')}</Typography>
                            {/* <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                                {t('간편 로그인')}
                            </Typography> */}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                            }}
                        >
                            {platform === 'JWT' && <JWTLogin />}
                            {/* <Divider sx={{ my: 3 }} /> */}
                            {/* {platform === 'JWT' && <KAKAOLogin />} */}
                        </Box>

                        <Divider sx={{ my: 5 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <NextLink href={disableGuard ? `/auth/register?disableGuard=${disableGuard}` : '/auth/register'} passHref>
                                    <Link color="textSecondary" variant="body2">
                                        회원가입
                                    </Link>
                                </NextLink>
                                <Box>
                                    <Typography sx={{ color: 'text.secondary', fontWeight: '400', mx: 1 }}>|</Typography>
                                </Box>
                                <NextLink href={disableGuard ? `/auth/findpsswd?disableGuard=${disableGuard}` : '/auth/findpsswd'} passHref>
                                    <Link color="textSecondary" variant="body2">
                                        비밀번호 찾기
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box sx={{ my: 1 }} />

                            <NextLink href={'/privacy'} passHref>
                                <Link color="textSecondary" variant="body2">
                                    개인정보보호정책
                                </Link>
                            </NextLink>
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default Login
