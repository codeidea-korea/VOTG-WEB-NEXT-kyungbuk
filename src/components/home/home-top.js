import NextLink from 'next/link'
import { Avatar, Box, Button, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '@components/icons/check-circle-outlined'
import { Users as UsersIcon } from '@components/icons/users'
import { Star as StarIcon } from '@components/icons/star'
import { Template as TemplateIcon } from '@components/icons/template'

export const HomeSectionTop = (props) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                pt: 6,
            }}
            {...props}
        >
            <Container
                maxWidth="xl"
                sx={{
                    alignItems: 'left',
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
                    }}
                >
                    <Typography
                        color="primary.contrastText"
                        align="left"
                        variant="h1"
                        sx={{
                            fontFamily: 'Poppins',
                            paddingInline: {
                                md: 5,
                                xs: 'none',
                            },
                        }}
                    >
                        DRAG AND SURVEY
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
