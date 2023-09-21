import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconSurveyContact = styled((props) => {
    const { variant, customColor, ...other } = props
    const color = variant === 'light' ? '#fff' : '#FF5353'

    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M28.5833 2H4.41667C3.77573 2 3.16104 2.25461 2.70783 2.70783C2.25461 3.16104 2 3.77573 2 4.41667V28.5833C2 29.2243 2.25461 29.839 2.70783 30.2922C3.16104 30.7454 3.77573 31 4.41667 31H28.5833C29.2243 31 29.839 30.7454 30.2922 30.2922C30.7454 29.839 31 29.2243 31 28.5833V4.41667C31 3.77573 30.7454 3.16104 30.2922 2.70783C29.839 2.25461 29.2243 2 28.5833 2Z"
                stroke={color}
                strokeWidth="3"
            />
            <path
                d="M12.8275 8.44434C13.1852 8.44434 13.5155 8.63847 13.6895 8.95184L14.8946 11.1228C15.0525 11.4072 15.0597 11.7511 14.9139 12.0411L14.0842 14.0832C14.0842 14.0832 14.2872 15.8973 15.6953 17.3054C17.1034 18.7136 18.9175 18.9166 18.9175 18.9166L20.9532 18.0804C21.2432 17.9354 21.5879 17.9434 21.8723 18.1005L24.0497 19.3113C24.3623 19.4853 24.5564 19.8148 24.5564 20.1732V22.6729C24.5564 23.9456 23.3738 24.8648 22.1679 24.458C19.69 23.6218 15.8443 22.0308 13.4075 19.5924C10.9699 17.1556 9.37893 13.3107 8.54276 10.8328C8.13596 9.62689 9.0551 8.44434 10.3279 8.44434H12.8275V8.44434Z"
                stroke={color}
                strokeWidth="3"
                strokeLinejoin="round"
            />
        </svg>
    )
})``

IconSurveyContact.defaultProps = {
    variant: 'color',
}
IconSurveyContact.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
