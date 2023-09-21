import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconUploadTyping = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="42" height="31" viewBox="0 0 42 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M37.668 5.08366V25.917H4.33464V5.08366H37.668ZM37.668 0.916992H4.33464C2.04297 0.916992 0.188802 2.79199 0.188802 5.08366L0.167969 25.917C0.167969 28.2087 2.04297 30.0837 4.33464 30.0837H37.668C39.9596 30.0837 41.8346 28.2087 41.8346 25.917V5.08366C41.8346 2.79199 39.9596 0.916992 37.668 0.916992ZM18.918 7.16699H23.0846V11.3337H18.918V7.16699ZM18.918 13.417H23.0846V17.5837H18.918V13.417ZM12.668 7.16699H16.8346V11.3337H12.668V7.16699ZM12.668 13.417H16.8346V17.5837H12.668V13.417ZM6.41797 13.417H10.5846V17.5837H6.41797V13.417ZM6.41797 7.16699H10.5846V11.3337H6.41797V7.16699ZM12.668 19.667H29.3346V23.8337H12.668V19.667ZM25.168 13.417H29.3346V17.5837H25.168V13.417ZM25.168 7.16699H29.3346V11.3337H25.168V7.16699ZM31.418 13.417H35.5846V17.5837H31.418V13.417ZM31.418 7.16699H35.5846V11.3337H31.418V7.16699Z"
                fill={color}
            />
        </svg>
    )
})``

IconUploadTyping.defaultProps = {
    variant: 'color',
}
IconUploadTyping.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
