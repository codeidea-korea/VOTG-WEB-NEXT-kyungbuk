import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconUploadFile = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="42" height="35" viewBox="0 0 42 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M37.668 4.99967H21.0013L16.8346 0.833008H4.33464C2.04297 0.833008 0.188802 2.70801 0.188802 4.99967L0.167969 29.9997C0.167969 32.2913 2.04297 34.1663 4.33464 34.1663H37.668C39.9596 34.1663 41.8346 32.2913 41.8346 29.9997V9.16634C41.8346 6.87467 39.9596 4.99967 37.668 4.99967ZM37.668 29.9997H4.33464V4.99967H15.1055L19.2721 9.16634H37.668V29.9997ZM15.6055 22.5413L18.918 19.2497V27.9163H23.0846V19.2497L26.3971 22.5622L29.3346 19.6038L21.0221 11.2497L12.668 19.6038L15.6055 22.5413Z"
                fill={color}
            />
        </svg>
    )
})``

IconUploadFile.defaultProps = {
    variant: 'color',
}
IconUploadFile.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
