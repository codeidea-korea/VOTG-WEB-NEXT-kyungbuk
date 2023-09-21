import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const IconSurveyChoice = styled((props) => {
    const { variant, customColor, ...other } = props
    const color = variant === 'light' ? '#fff' : '#FF5353'

    if (customColor != undefined) {
        color = customColor
    }

    return (
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...other}
        >
            <path
                d="M5.9196 9.183C5.65906 9.183 5.44083 9.09689 5.26489 8.92467C5.08834 8.75305 5.00006 8.54017 5.00006 8.28603C5.00006 8.03189 5.08834 7.8187 5.26489 7.64649C5.44083 7.47486 5.65906 7.38905 5.9196 7.38905H12.3564C12.6169 7.38905 12.8355 7.47486 13.012 7.64649C13.188 7.8187 13.2759 8.03189 13.2759 8.28603C13.2759 8.54017 13.188 8.75305 13.012 8.92467C12.8355 9.09689 12.6169 9.183 12.3564 9.183H5.9196ZM5.9196 15.5648C5.65906 15.5648 5.44083 15.4787 5.26489 15.3065C5.08834 15.1349 5.00006 14.922 5.00006 14.6679C5.00006 14.4137 5.08834 14.2005 5.26489 14.0283C5.44083 13.8567 5.65906 13.7709 5.9196 13.7709H12.3564C12.6169 13.7709 12.8355 13.8567 13.012 14.0283C13.188 14.2005 13.2759 14.4137 13.2759 14.6679C13.2759 14.922 13.188 15.1349 13.012 15.3065C12.8355 15.4787 12.6169 15.5648 12.3564 15.5648H5.9196ZM17.5748 10.3491L15.5978 8.42057C15.4292 8.25613 15.3449 8.04683 15.3449 7.79269C15.3449 7.53855 15.4292 7.32926 15.5978 7.16481C15.7663 7.00037 15.9809 6.91814 16.2414 6.91814C16.502 6.91814 16.7165 7.00037 16.8851 7.16481L18.1955 8.443L21.4598 5.25874C21.6437 5.07935 21.8583 4.99324 22.1035 5.00041C22.3487 5.00819 22.5633 5.10177 22.7472 5.28117C22.9158 5.46056 23.0001 5.66986 23.0001 5.90905C23.0001 6.14824 22.9158 6.35754 22.7472 6.53693L18.8621 10.3491C18.6782 10.5285 18.4637 10.6182 18.2185 10.6182C17.9732 10.6182 17.7587 10.5285 17.5748 10.3491ZM17.5748 16.7309L15.5978 14.8024C15.4292 14.638 15.3449 14.4287 15.3449 14.1745C15.3449 13.9204 15.4292 13.7111 15.5978 13.5467C15.7663 13.3822 15.9809 13.3 16.2414 13.3C16.502 13.3 16.7165 13.3822 16.8851 13.5467L18.1955 14.8248L21.4598 11.6406C21.6437 11.4612 21.8583 11.3751 22.1035 11.3823C22.3487 11.39 22.5633 11.4836 22.7472 11.663C22.9158 11.8424 23.0001 12.0517 23.0001 12.2909C23.0001 12.5301 22.9158 12.7394 22.7472 12.9188L18.8621 16.7309C18.6782 16.9103 18.4637 17 18.2185 17C17.9732 17 17.7587 16.9103 17.5748 16.7309Z"
                fill={color}
            />
            <path
                d="M5.91954 21.6826C5.659 21.6826 5.44077 21.5965 5.26483 21.4243C5.08828 21.2526 5 21.0398 5 20.7856C5 20.5315 5.08828 20.3183 5.26483 20.1461C5.44077 19.9744 5.659 19.8886 5.91954 19.8886H12.3563C12.6169 19.8886 12.8354 19.9744 13.012 20.1461C13.1879 20.3183 13.2759 20.5315 13.2759 20.7856C13.2759 21.0398 13.1879 21.2526 13.012 21.4243C12.8354 21.5965 12.6169 21.6826 12.3563 21.6826H5.91954ZM17.5747 22.8487L15.5977 20.9202C15.4291 20.7557 15.3448 20.5464 15.3448 20.2923C15.3448 20.0381 15.4291 19.8288 15.5977 19.6644C15.7663 19.5 15.9808 19.4177 16.2414 19.4177C16.5019 19.4177 16.7165 19.5 16.8851 19.6644L18.1954 20.9426L21.4598 17.7583C21.6437 17.5789 21.8582 17.4928 22.1034 17.5C22.3487 17.5078 22.5632 17.6014 22.7471 17.7808C22.9157 17.9601 23 18.1694 23 18.4086C23 18.6478 22.9157 18.8571 22.7471 19.0365L18.8621 22.8487C18.6782 23.028 18.4636 23.1177 18.2184 23.1177C17.9732 23.1177 17.7586 23.028 17.5747 22.8487Z"
                fill={color}
            />
            <path
                d="M3.22222 29C2.33611 29 1.57728 28.6848 0.945722 28.0543C0.315241 27.4227 0 26.6639 0 25.7778V3.22222C0 2.33611 0.315241 1.57728 0.945722 0.945722C1.57728 0.315241 2.33611 0 3.22222 0H25.7778C26.6639 0 27.4227 0.315241 28.0543 0.945722C28.6848 1.57728 29 2.33611 29 3.22222V25.7778C29 26.6639 28.6848 27.4227 28.0543 28.0543C27.4227 28.6848 26.6639 29 25.7778 29H3.22222ZM3.22222 25.7778H25.7778V3.22222H3.22222V25.7778Z"
                fill={color}
            />
        </svg>
    )
})``

IconSurveyChoice.defaultProps = {
    variant: 'color',
}
IconSurveyChoice.propTypes = {
    variant: PropTypes.oneOf(['light', 'color']),
}
