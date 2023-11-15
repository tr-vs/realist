
const CancelButton = ({onClick, rotationAngle}) => {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: '15' }}
            onClick={onClick}
        >
            <path
                d="M4.929 4.929L19.071 19.071M4.929 19.071L19.071 4.929"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

    );
};

export default CancelButton 