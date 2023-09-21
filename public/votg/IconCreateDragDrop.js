import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconCreateDragDrop = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="93" height="131" viewBox="0 0 93 131" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M12.5719 75.6734C7.52395 79.1208 5 84.8259 5 92.7893C5 104.734 19.6829 125.151 32.9233 125.151C46.1634 125.151 53.8422 125.151 66.8013 125.151C79.7608 125.151 87.632 113.822 87.632 104.734C87.632 92.5148 87.632 80.2959 87.632 68.0766C87.632 62.8017 83.3635 58.5211 78.0882 58.5064C72.8321 58.4917 68.5592 62.7408 68.5445 67.9969C68.5445 68.0057 68.5445 68.0146 68.5445 68.0234V68.322"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
            />
            <path d="M16.6855 82.3307V18.246C16.6855 13.0188 20.9232 8.78125 26.1505 8.78125C31.3778 8.78125 35.6151 13.0188 35.6151 18.246V65.2749" stroke={color} strokeWidth="10" strokeLinecap="round" />
            <path d="M35.6152 66.3112V53.9769C35.6152 49.4207 39.3089 45.7271 43.8651 45.7271C48.4214 45.7271 52.115 49.4207 52.115 53.9769V67.5677" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52.0449 68.2474V59.8607C52.0449 55.3045 55.7386 51.6108 60.2948 51.6108C64.8511 51.6108 68.5447 55.3045 68.5447 59.8607V69.2627" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.7402 18.2388H85.7402" stroke={color} strokeWidth="10" strokeLinecap="round" />
            <path d="M73.291 31.4778L78.1944 27.0648L88.0009 18.2389L78.1944 9.41297L73.291 5" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
})``

IconCreateDragDrop.defaultProps = {
    variant: 'color',
}
IconCreateDragDrop.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
