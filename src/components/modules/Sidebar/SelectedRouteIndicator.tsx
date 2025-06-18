function SelectedRouteIndicator() {
  return (
    <div className="absolute left-0 right-0 bg-green-400 -z-1 ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 35" fill="">
        <path fill="url(#paint0_linear)" d="M 0 0 , h" />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="50"
            x2="50"
            y1="0"
            y2="56.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F472B6" />
            <stop offset="1" stopColor="#C084FC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
export default SelectedRouteIndicator;
