import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconSurveyRequired = styled((props) => {
    const { variant, customColor, ...other } = props
    const color = variant === 'light' ? '#fff' : '#FF5353'

    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <g clipPath="url(#clip0_702_479)">
                <path
                    d="M26.7356 18.9423L19.0365 14.5L26.7356 10.0577C27.1695 9.80732 27.3179 9.25338 27.0675 8.81951L25.2539 5.67992C25.0036 5.24662 24.449 5.09766 24.0152 5.34801L16.316 9.79033V0.90625C16.316 0.405547 15.9099 0 15.4092 0H11.7819C11.2812 0 10.8751 0.405547 10.8751 0.90625V9.7909L3.17596 5.34857C2.7421 5.09822 2.18759 5.24719 1.93723 5.68049L0.123601 8.81951C-0.126751 9.25281 0.0216479 9.80732 0.455515 10.0577L8.15468 14.5L0.455515 18.9423C0.0216479 19.1927 -0.126751 19.7472 0.123601 20.1805L1.93723 23.3201C2.18759 23.7534 2.7421 23.9018 3.17596 23.652L10.8751 19.2097V28.0938C10.8751 28.5945 11.2812 29 11.7819 29H15.4092C15.9099 29 16.316 28.5945 16.316 28.0938V19.2091L24.0152 23.6514C24.449 23.9018 25.0036 23.7534 25.2539 23.3195L27.0675 20.1799C27.3179 19.7466 27.1695 19.1927 26.7356 18.9423Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id="clip0_702_479">
                    <rect width="27.19" height="29" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
})``

IconSurveyRequired.defaultProps = {
    variant: 'color',
}
IconSurveyRequired.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
