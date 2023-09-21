import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { Alert, Box, Button, FormHelperText, TextField } from '@mui/material'
import { useAuth } from '@hooks/use-auth'
import { useMounted } from '@hooks/use-mounted'
/* Language */
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export const JWTLogin = (props) => {
    const isMounted = useMounted()
    const router = useRouter()
    const auth = useAuth()
    const { login, logout } = useAuth()
    const { t } = useTranslation()

    /* Form Setting */
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null,
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('올바른 메일주소 형식으로 입력해주세요.')).max(255).required(t('메일주소를 입력해주세요.')),
            password: Yup.string().max(255).required(t('비밀번호를 입력해주세요.')),
        }),
        onSubmit: async (values, helpers) => {
            try {
                await login(values.email, values.password)
                // toast('환영합니다!')

                if (isMounted()) {
                    const returnUrl = router.query.returnUrl || '/?init=true'
                    // const returnUrl = router.query.returnUrl || '/welcome?disableguard=true'

                    router.push(returnUrl).catch(console.error)
                }
            } catch (err) {
                // console.error(err)
                if (isMounted()) {
                    helpers.setStatus({ success: false })
                    helpers.setErrors({ submit: err.message })
                    helpers.setSubmitting(false)
                }
            }
        },
    })

    useEffect(() => {
        if (auth.isAuthenticated) {
            logout()
        }
    }, [])

    return (
        <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
                // autoFocus
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label={t('이메일')}
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
            />
            <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label={t('비밀번호')}
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
            />
            {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
            )}
            <Box sx={{ mt: 2 }}>
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                        ':hover': {
                            color: 'primary.contrastText',
                            boxShadow: '0 0 0 2px inset',
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    {t('로그인')}
                </Button>
            </Box>
            {/* <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                    <div>
                        Use <b>demo@devias.io</b> and password <b>Password123!</b>
                    </div>
                </Alert>
            </Box> */}
        </form>
    )
}
