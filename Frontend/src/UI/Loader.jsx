const Loader = () => {
  return (
    <div className="w-12 aspect-square grid relative">
      {/* Before and After pseudo-elements */}
      <div className="absolute inset-0 animate-l11 bg-[linear-gradient(90deg,_#0000_calc(100%/3),_#046D8B_0_calc(2*100%/3),_#0000_0)] bg-[linear-gradient(0deg,_#0000_calc(100%/3),_#046D8B_0_calc(2*100%/3),_#0000_0)] bg-[300%_4px,_4px_300%] bg-no-repeat"></div>
      <div className="absolute inset-0 animate-l11 bg-[linear-gradient(90deg,_#0000_calc(100%/3),_#046D8B_0_calc(2*100%/3),_#0000_0)] bg-[linear-gradient(0deg,_#0000_calc(100%/3),_#046D8B_0_calc(2*100%/3),_#0000_0)] bg-[300%_4px,_4px_300%] bg-no-repeat transform scale-x-[-1] animation-delay-[-.25s]"></div>
    </div>
  );
};

export default Loader;
