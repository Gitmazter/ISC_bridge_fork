
const Ellipse = ({ filled }) => {
  return (
    filled ?
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18.5" fill="url(#paint0_linear_988_1744)" stroke="url(#paint1_linear_988_1744)" stroke-width="3"/>
      <defs>
        <linearGradient id="paint0_linear_988_1744" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
          <stop stop-color="#86A2FF"/>
          <stop offset="1" stopColor="#2DD7FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_988_1744" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
          <stop stop-color="#86A2FF"/>
          <stop offset="1" stopColor="#2CD8FF"/>
        </linearGradient>
      </defs>
    </svg>
    :
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18.5" stroke="#51565C" stroke-width="3"/>
    </svg>
  )
}


export default Ellipse