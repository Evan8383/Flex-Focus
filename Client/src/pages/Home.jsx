

const Home = () => {
  return (
    <div className="bg-zinc-900 w-full h-screen">
      <div className="relative w-full">
        <div className="flex justify-center items-center flex-col h-96">
          <div className="flex flex-wrap justify-center align-center m-4">
            <h1 className="text-orange-500 text-7xl mt-0">FLEX</h1>
            <h1 className="text-white text-7xl mt-0">FOCUS</h1>
          </div>
          <p className="flex text-white text-xl">The best fitness app around</p>
        </div>
        <div className="flex justify-around bg-zinc-600 w-full h-96 overflow-hidden">
          <div className="max-md:hidden absolute bottom-0">
            <img
              className="md:w-2/5 ml-12 lg:w-1/4"
              src="../images/buff-dude.png"
              alt="buff-dude"
            />
          </div>
          <div id="about-us-content" className="flex justify-center align-center">
            <h2 className="text-white text-xl pt-12 ml-96">About Us</h2>
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


