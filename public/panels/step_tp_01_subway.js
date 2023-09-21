import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconTp01Subway = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="55" height="62" viewBox="0 0 55 62" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M12.4 0C5.58 0 0 5.58 0 12.4V42.16C0.00343023 45.0229 0.831007 47.8242 2.38385 50.2293C3.9367 52.6345 6.14916 54.5417 8.75688 55.7231L2.48 62H8.29312L13.33 56.9631C13.826 57.0127 14.3666 57.04 14.88 57.04H39.68C40.1934 57.04 40.7365 57.0102 41.23 56.9631L46.2669 62H52.08L45.8031 55.7231C48.4108 54.5417 50.6233 52.6345 52.1761 50.2293C53.729 47.8242 54.5566 45.0229 54.56 42.16V12.4C54.56 5.58 48.98 0 42.16 0H12.4ZM12.4 4.96H42.16C45.4336 4.96 48.2062 7.01344 49.2131 9.92H5.34688C5.85937 8.46157 6.81456 7.19961 8.07905 6.31038C9.34354 5.42115 10.8542 4.94904 12.4 4.96ZM4.96 14.88H24.8V29.76H4.96V14.88ZM29.76 14.88H49.6V29.76H29.76V14.88ZM4.96 34.72H49.6V42.16C49.6 47.6631 45.1831 52.08 39.68 52.08H14.88C9.37688 52.08 4.96 47.6631 4.96 42.16V34.72ZM13.64 39.68C12.6534 39.68 11.7072 40.0719 11.0096 40.7696C10.3119 41.4672 9.92 42.4134 9.92 43.4C9.92 44.3866 10.3119 45.3328 11.0096 46.0304C11.7072 46.7281 12.6534 47.12 13.64 47.12C14.6266 47.12 15.5728 46.7281 16.2704 46.0304C16.9681 45.3328 17.36 44.3866 17.36 43.4C17.36 42.4134 16.9681 41.4672 16.2704 40.7696C15.5728 40.0719 14.6266 39.68 13.64 39.68ZM40.92 39.68C39.9334 39.68 38.9872 40.0719 38.2896 40.7696C37.5919 41.4672 37.2 42.4134 37.2 43.4C37.2 44.3866 37.5919 45.3328 38.2896 46.0304C38.9872 46.7281 39.9334 47.12 40.92 47.12C41.9066 47.12 42.8528 46.7281 43.5504 46.0304C44.2481 45.3328 44.64 44.3866 44.64 43.4C44.64 42.4134 44.2481 41.4672 43.5504 40.7696C42.8528 40.0719 41.9066 39.68 40.92 39.68Z"
                fill={color}
            />
        </svg>
    )
})``

IconTp01Subway.defaultProps = {
    variant: 'color',
}
IconTp01Subway.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}