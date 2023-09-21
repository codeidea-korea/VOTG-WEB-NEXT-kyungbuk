import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconServiceStatistics = styled((props) => {
    const { variant, customColor, ...other } = props
    var color = variant === 'light' ? '#fff' : '#FF5353'
    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...other}>
            <path
                d="M43.1786 85.0714C44.8279 85.4728 46.517 85.6884 48.2143 85.7143C52.4698 85.7132 56.6286 84.445 60.1607 82.0714L77.4107 97.4464C76.0442 100.041 75.2423 102.896 75.0576 105.823C74.873 108.75 75.3098 111.683 76.3393 114.429C77.4207 117.54 79.2048 120.36 81.5531 122.67C83.9014 124.98 86.7506 126.718 89.8794 127.748C93.0081 128.778 96.3323 129.073 99.5935 128.609C102.855 128.146 105.965 126.937 108.684 125.077C111.402 123.216 113.654 120.754 115.267 117.882C116.879 115.009 117.807 111.804 117.979 108.514C118.152 105.225 117.563 101.94 116.26 98.9148C114.957 95.8896 112.973 93.2057 110.464 91.0714L124.071 63.8036C126.727 64.4026 129.477 64.4599 132.155 63.9721C134.834 63.4842 137.387 62.4612 139.661 60.9643C143.523 58.6074 146.54 55.0885 148.279 50.9119C150.019 46.7353 150.392 42.1152 149.345 37.7137C148.297 33.3121 145.884 29.3549 142.45 26.409C139.016 23.4632 134.738 21.6798 130.228 21.3144C125.719 20.949 121.209 22.0204 117.346 24.375C113.482 26.7296 110.463 30.2467 108.721 34.4222C106.979 38.5978 106.604 43.2176 107.648 47.6198C108.692 52.022 111.104 55.9806 114.536 58.9286L100.929 86.1964C99.4507 85.8716 97.9417 85.7099 96.4286 85.7143C92.173 85.7154 88.0142 86.9836 84.4821 89.3571L67.2321 73.9821C68.5986 71.3873 69.4006 68.5326 69.5852 65.6057C69.7699 62.6789 69.3331 59.746 68.3036 57C67.2302 53.9112 65.4641 51.109 63.1406 48.8081C60.8171 46.5072 57.9978 44.7685 54.8987 43.7253C51.7996 42.6821 48.5028 42.362 45.2609 42.7895C42.019 43.217 38.9179 44.3808 36.1951 46.1917C33.4724 48.0027 31.2002 50.4127 29.5526 53.2373C27.905 56.0619 26.9257 59.2261 26.6897 62.4876C26.4537 65.749 26.9673 69.0213 28.191 72.0536C29.4148 75.086 31.3163 77.7981 33.75 79.9821L10.7143 123.214V0H0V139.286C0 142.127 1.12882 144.853 3.13814 146.862C5.14746 148.871 7.87268 150 10.7143 150H150V139.286H14.3036L43.1786 85.0714ZM128.571 32.1429C130.691 32.1429 132.762 32.7712 134.524 33.9485C136.286 35.1258 137.659 36.7992 138.47 38.757C139.281 40.7147 139.493 42.869 139.08 44.9474C138.666 47.0258 137.646 48.9349 136.148 50.4333C134.649 51.9317 132.74 52.9521 130.662 53.3656C128.583 53.779 126.429 53.5668 124.471 52.7559C122.513 51.9449 120.84 50.5716 119.663 48.8097C118.486 47.0477 117.857 44.9762 117.857 42.8571C117.857 40.0155 118.986 37.2903 120.995 35.281C123.005 33.2717 125.73 32.1429 128.571 32.1429ZM107.143 107.143C107.143 109.262 106.514 111.333 105.337 113.095C104.16 114.857 102.487 116.231 100.529 117.042C98.571 117.853 96.4167 118.065 94.3383 117.651C92.2599 117.238 90.3509 116.217 88.8524 114.719C87.354 113.221 86.3336 111.311 85.9202 109.233C85.5067 107.155 85.7189 105 86.5299 103.043C87.3408 101.085 88.7141 99.4116 90.476 98.2343C92.238 97.057 94.3095 96.4286 96.4286 96.4286C99.2702 96.4286 101.995 97.5574 104.005 99.5667C106.014 101.576 107.143 104.301 107.143 107.143ZM48.2143 53.5714C50.3334 53.5714 52.4049 54.1998 54.1668 55.3771C55.9288 56.5544 57.3021 58.2278 58.113 60.1855C58.9239 62.1433 59.1361 64.2976 58.7227 66.376C58.3093 68.4543 57.2888 70.3634 55.7904 71.8619C54.292 73.3603 52.3829 74.3807 50.3045 74.7941C48.2262 75.2075 46.0719 74.9954 44.1141 74.1844C42.1563 73.3735 40.483 72.0002 39.3057 70.2383C38.1284 68.4763 37.5 66.4048 37.5 64.2857C37.5 61.4441 38.6288 58.7189 40.6381 56.7096C42.6475 54.7003 45.3727 53.5714 48.2143 53.5714Z"
                fill={color}
            />
        </svg>
    )
})``

IconServiceStatistics.defaultProps = {
    variant: 'color',
}
IconServiceStatistics.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}