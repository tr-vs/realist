
const MenuBar = ({rotationAngle, onClick}) => {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: 'transform 0.3s ease', transform: `rotate(${rotationAngle}deg)` }}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="Menu / Menu_Duo_LG">
                    <path id="Vector" d="M3 15H21M3 9H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </g>
        </svg>
    )
}

export default MenuBar