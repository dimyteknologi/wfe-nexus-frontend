const Hero = () => {
  return (
    <div className="h-10/12 mx-24 flex justify-between items-center">
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-col gap-4 ">
          <p className="text-4xl">WFE NEXUS</p>
          <p className="text-6xl">DECISION SUPPORT SYSTEM TOOLS</p>
          <p className="text-2xl">
            Transforming WEF Nexus thinking into actionable insights and
            policies.
          </p>
        </div>

        <div className="flex items-center gap-8 h-1/4">
          <button className="text-xl border-2 rounded-xl border-green-800 text-green-800 py-2 px-10">
            Sign up
          </button>
          <button className="text-xl border-2 rounded-xl bg-green-800 text-white py-2 px-10">
            Discover more
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 w-1/2">
        <div className="w-96">
          <img src={"./assets/image-demo-1.svg"} alt="image-1" />
        </div>
        <div className="w-96">
          <img src={"./assets/image-demo-2.svg"} alt="image-2" />
        </div>
      </div>
    </div>
  );
};
export default Hero;
