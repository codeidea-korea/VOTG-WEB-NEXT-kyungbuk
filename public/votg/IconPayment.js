import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconPayment = styled((props) => {
    const { variant, customColor, ...other } = props
    const color = variant === 'light' ? '#fff' : '#FF5353'

    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg
            width="29"
            height="26"
            viewBox="0 0 29 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...other}
        >
            <path
                d="M1.45 0H27.55C27.9346 0 28.3034 0.152182 28.5753 0.423068C28.8472 0.693954 29 1.06135 29 1.44444V24.5556C29 24.9386 28.8472 25.306 28.5753 25.5769C28.3034 25.8478 27.9346 26 27.55 26H1.45C1.06544 26 0.696623 25.8478 0.424695 25.5769C0.152767 25.306 0 24.9386 0 24.5556V1.44444C0 1.06135 0.152767 0.693954 0.424695 0.423068C0.696623 0.152182 1.06544 0 1.45 0ZM2.9 2.88889V23.1111H26.1V2.88889H2.9ZM9.425 15.8889H17.4C17.5923 15.8889 17.7767 15.8128 17.9127 15.6774C18.0486 15.5419 18.125 15.3582 18.125 15.1667C18.125 14.9751 18.0486 14.7914 17.9127 14.656C17.7767 14.5205 17.5923 14.4444 17.4 14.4444H11.6C10.6386 14.4444 9.71656 14.064 9.03674 13.3868C8.35692 12.7096 7.975 11.7911 7.975 10.8333C7.975 9.87561 8.35692 8.95711 9.03674 8.27989C9.71656 7.60268 10.6386 7.22222 11.6 7.22222H13.05V4.33333H15.95V7.22222H19.575V10.1111H11.6C11.4077 10.1111 11.2233 10.1872 11.0873 10.3226C10.9514 10.4581 10.875 10.6418 10.875 10.8333C10.875 11.0249 10.9514 11.2086 11.0873 11.344C11.2233 11.4795 11.4077 11.5556 11.6 11.5556H17.4C18.3614 11.5556 19.2834 11.936 19.9633 12.6132C20.6431 13.2904 21.025 14.2089 21.025 15.1667C21.025 16.1244 20.6431 17.0429 19.9633 17.7201C19.2834 18.3973 18.3614 18.7778 17.4 18.7778H15.95V21.6667H13.05V18.7778H9.425V15.8889Z"
                fill={color}
            />
        </svg>
    )
})``

IconPayment.defaultProps = {
    variant: 'color',
}
IconPayment.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
