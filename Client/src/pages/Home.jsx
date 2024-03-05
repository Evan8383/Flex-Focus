

const Home = () => {
  return (
    <div className="bg-zinc-900 w-full h-screen">
      <div className="relative w-full">
        <div className="flex justify-center items-center flex-col h-96">
          <div className="flex flex-wrap justify-center items-center m-4">
            <h1 className="text-orange-500 text-7xl mt-0">FLEX</h1>
            <h1 className="text-white text-7xl mt-0">FOCUS</h1>
          </div>
          <p className="flex text-white text-xl text-center">The best fitness app around</p>
        </div>
        <div className="flex justify-around bg-zinc-600 w-full h-full p-4 overflow-hidden">
          <div className="max-md:hidden absolute bottom-0">
            <img
              className="md:w-2/5 md:ml-16 lg:w-1/4 lg:ml-32"
              src="../images/buff-dude.png"
              alt="buff-dude"
            />
          </div>
          <div id="about-us-content" className="flex z-50 max-md: items-center">
            <div className="flex flex-col w-1/3 ml-auto lg:mr-48 max-md:mx-auto md:mr-12 max-md:w-full max-md:items-center">
              <h2 className="text-white text-xl mb-4">About Us</h2>
              <p className="text-white">Welcome to FlexFocus! Meet the dynamic duo behind the scenes -
                Evan and Dakota, the passionate minds driving our mission to transform lives
                through fitness. With a shared commitment to health and wellness, we embarked
                on a journey to create an app that goes beyond the ordinary, guiding you towards
                a fitter, healthier, and more vibrant version of yourself.</p>
              <button className="text-white bg-orange-500 mr-auto max-md:mr-0 mt-4 p-2 rounded-lg outline outline-1">Read More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-zinc-900 w-full items-center h-screen">
        <h1 className="text-white">Next section</h1>
      </div>
    </div>
  );
};

export default Home;


