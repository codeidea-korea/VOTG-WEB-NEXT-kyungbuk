import { Fragment, useEffect, useState } from 'react'

import { Box, Card, Grid, Typography, Tooltip, TextField, Divider } from '@mui/material'

/* Components :: For Static Info Title */
import Element_StaticInfo from '../element/element-static-info'

const ContetnsInfo = (props) => {
    const { currentSelected, editModeController, mainItemInfo, onChangeEditThisItem_Info, onChangeEditThisItem_LogoImage } = props

    const [isEditing, setIsEditing] = useState(currentSelected === -1)

    useEffect(() => {
        setIsEditing(currentSelected === -1)
    }, [currentSelected])

    return (
        <>
            <Grid container spacing={1}>
                {/**
                 *
                 *
                 * 0. Contents Card Setting Grid
                 *
                 *
                 * */}
                <Grid item xs={8} xmd={8} md={9}>
                    <Box sx={{ margin: '0 auto', my: 2, mx: 1 }}>
                        <Card
                            onClick={(e) => editModeController(e, -1, mainItemInfo)}
                            sx={{
                                minHeight: '250px',
                                height: '100%',
                                px: 5,
                                pt: 5,
                                pb: 4,
                                border: isEditing ? '2px solid #1f296aA0' : '2px solid #fff',
                                '&:hover': !isEditing && {
                                    border: '2px solid #FF535330',
                                    cursor: 'pointer',
                                    transition: 'all 0.5s',
                                },
                            }}
                        >
                            <Element_StaticInfo isEditing={isEditing} mainItemInfo={mainItemInfo} onChangeEditThisItem_Info={onChangeEditThisItem_Info} onChangeEditThisItem_LogoImage={onChangeEditThisItem_LogoImage} />
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ContetnsInfo
