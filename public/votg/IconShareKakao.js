import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconShareKakao = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path d="M24.9412 27.9234C26.3153 27.9234 27.4292 26.8094 27.4292 25.4353C27.4292 24.0612 26.3153 22.9473 24.9412 22.9473C23.5671 22.9473 22.4531 24.0612 22.4531 25.4353C22.4531 26.8094 23.5671 27.9234 24.9412 27.9234Z" fill={color} />
            <path d="M34.8904 27.9234C36.2645 27.9234 37.3784 26.8094 37.3784 25.4353C37.3784 24.0612 36.2645 22.9473 34.8904 22.9473C33.5163 22.9473 32.4023 24.0612 32.4023 25.4353C32.4023 26.8094 33.5163 27.9234 34.8904 27.9234Z" fill={color} />
            <path d="M14.9881 27.9234C16.3622 27.9234 17.4761 26.8094 17.4761 25.4353C17.4761 24.0612 16.3622 22.9473 14.9881 22.9473C13.6139 22.9473 12.5 24.0612 12.5 25.4353C12.5 26.8094 13.6139 27.9234 14.9881 27.9234Z" fill={color} />
            <path
                d="M42.5309 7.84472C38.4485 3.7357 33.0605 1.17976 27.2956 0.617527C21.5307 0.0552996 15.7503 1.52202 10.951 4.76484C6.15163 8.00765 2.63405 12.8233 1.0047 18.3816C-0.624659 23.94 -0.263686 29.8926 2.02538 35.2133C2.26396 35.7078 2.34225 36.2645 2.24931 36.8056L0.0598226 47.3301C-0.0245318 47.7336 -0.00730651 48.1518 0.109951 48.547C0.227208 48.9422 0.440823 49.302 0.731597 49.5942C0.969963 49.8309 1.25377 50.0168 1.56593 50.1408C1.87808 50.2648 2.2121 50.3243 2.54787 50.3158H3.04549L13.6944 48.176C14.2356 48.111 14.7844 48.1882 15.2867 48.4C20.6074 50.689 26.56 51.05 32.1184 49.4207C37.6767 47.7913 42.4923 44.2737 45.7352 39.4744C48.978 34.675 50.4447 28.8946 49.8825 23.1298C49.3202 17.3649 46.7643 11.9768 42.6553 7.89448L42.5309 7.84472ZM44.596 28.6448C44.1095 31.6155 42.9556 34.4372 41.221 36.8975C39.4865 39.3577 37.2165 41.3926 34.5819 42.8488C31.9473 44.305 29.0168 45.1447 26.0108 45.3046C23.0048 45.4646 20.0016 44.9406 17.2274 43.7722C16.2435 43.3537 15.1865 43.1338 14.1173 43.1253C13.6503 43.1286 13.1843 43.1702 12.724 43.2497L5.7077 44.6679L7.12589 37.6516C7.40835 36.1321 7.22627 34.5627 6.6034 33.1482C5.43499 30.374 4.91104 27.3708 5.07099 24.3648C5.23094 21.3588 6.07061 18.4283 7.52682 15.7937C8.98304 13.1591 11.0178 10.8891 13.4781 9.15455C15.9384 7.42001 18.7601 6.26609 21.7308 5.77964C24.849 5.26788 28.0442 5.50588 31.0522 6.47395C34.0602 7.44202 36.7944 9.11234 39.0289 11.3467C41.2633 13.5811 42.9336 16.3154 43.9016 19.3234C44.8697 22.3314 45.1077 25.5266 44.596 28.6448Z"
                fill={color}
            />
        </svg>
    )
})``

IconShareKakao.defaultProps = {
    variant: 'color',
}
IconShareKakao.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}