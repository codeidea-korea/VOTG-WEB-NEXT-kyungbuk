import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconShareMail = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="50" height="41" viewBox="0 0 50 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M5 15.5V35.5H45V15.5L25 23L5 15.5ZM5 5.5V10.5L25 18L45 10.5V5.5H5ZM5 0.5H45C46.3261 0.5 47.5979 1.02678 48.5355 1.96447C49.4732 2.90215 50 4.17392 50 5.5V35.5C50 36.8261 49.4732 38.0979 48.5355 39.0355C47.5979 39.9732 46.3261 40.5 45 40.5H5C3.67392 40.5 2.40215 39.9732 1.46447 39.0355C0.526784 38.0979 0 36.8261 0 35.5V5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5Z"
                fill={color}
            />
        </svg>
    )
})``

IconShareMail.defaultProps = {
    variant: 'color',
}
IconShareMail.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
