import { useEffect } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material'
import { useSettings } from '@hooks/use-settings'
import { Logo } from '@components/layout/logo'
import { JWTFindPassword } from '@components/auth/jwt-find-password'
import { GuestGuard } from '@components/auth/guest-guard'
import { useAuth } from '@hooks/use-auth'
// import { gtm } from '../../lib/gtm'

/* Language */
import { useTranslation } from 'react-i18next'

const Register = () => {
    const router = useRouter()
    const { platform } = useAuth()
    const { disableGuard } = router.query
    const { t } = useTranslation()

    useEffect(() => {
        /* Chai iamport */
        // const { IMP } = window
        // IMP.init('imp11137846') // 예: imp00000000
        // // IMP.certification(param, callback) 호출
        // IMP.certification(
        //     {
        //         // param
        //         // 주문 번호
        //         merchant_uid: 'ORD20180131-0000011',
        //         // 모바일환경에서 popup:false(기본값) 인 경우 필수
        //         m_redirect_url: 'http://localhost:7701/auth/register/',
        //         // PC환경에서는 popup 파라메터가 무시되고 항상 true 로 적용됨
        //         popup: false,
        //     },
        //     (rsp) => {
        //         // callback
        //         if (rsp.success) {
        //             console.log(rsp.imp_uid)
        //         } else {
        //             alert(`인증에 실패하였습니다.\n${rsp.error_msg}`)
        //         }
        //     },
        // )
    }, [])

    return (
        <>
            <Head>
                <title>{t('비밀번호 찾기')} | 인공지능 기반 건축설계 자동화 기술개발 연구단</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                {/* <AuthBanner /> */}
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: '60px',
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
                            <Typography variant="h4">{t('비밀번호 찾기')}</Typography>
                            {/* <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                                {t('계정 회원가입')}
                            </Typography> */}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                            }}
                        >
                            {platform === 'JWT' && <JWTFindPassword />}
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <div>
                            <NextLink href={disableGuard ? `/auth/login?disableGuard=${disableGuard}` : '/auth/login'} passHref>
                                <Link color="textSecondary" variant="body2">
                                    {t('← 로그인 바로가기')}
                                </Link>
                            </NextLink>
                        </div>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default Register
