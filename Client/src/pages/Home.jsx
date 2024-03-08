import { Link } from 'react-router-dom'
import BuffDude from '/images/buff-dude.png'


const Home = () => {
  return (
    <div className="bg-zinc-900 w-full h-full">
      <div className="relative w-full">
        <div className="flex justify-center items-center flex-col h-96">
          <div className="flex flex-wrap justify-center items-center m-4">
            <h1 className="text-orange-500 text-7xl mt-0">FLEX</h1>
            <h1 className="text-white text-7xl mt-0">FOCUS</h1>
          </div>
          <p className="flex text-white text-xl text-center">The best fitness app around</p>
        </div>
        <div className="flex justify-around bg-zinc-600 w-full h-full p-16 max-md:p-8 overflow-hidden">
          <div className="max-md:hidden absolute bottom-0">
            <img
              className="md:w-2/5 md:ml-16 lg:w-1/4 lg:ml-32"
              src={BuffDude}
              alt="buff-dude"
            />
          </div>
          <div id="about-us-content" className="flex z-40 max-md: items-center">
            <div className="flex flex-col w-1/3 ml-auto lg:mr-48 max-md:mx-auto md:mr-12 max-md:w-full max-md:items-center">
              <h2 className="text-white text-3xl mb-4">About Us</h2>
              <p className="text-white">Welcome to FlexFocus! Meet the dynamic duo behind the scenes -
                Evan and Dakota, the passionate minds driving our mission to transform lives
                through fitness. With a shared commitment to health and wellness, we embarked
                on a journey to create an app that goes beyond the ordinary, guiding you towards
                a fitter, healthier, and more vibrant version of yourself.</p>
              <Link to="/about" className="text-white bg-orange-500 mr-auto max-md:mr-0 mt-4 p-2 rounded-lg outline outline-1 hover:text-gray-300">Read More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 w-full">
        <h2 className="text-white text-3xl text-center pt-8">Our Services</h2>
        <div className="flex flex-wrap max-sm:flex-col max-sm:items-center">
          <div className="flex flex-col w-1/2 p-8 max-sm:w-full">
            <div className="flex flex-col items-center border border-orange-500 rounded-md p-6">
              <h2 className="text-white text-2xl mb-2">Exercises</h2>
              <p className="text-white">Embark on a fitness journey with our diverse range of exercises. 
              We believe in the continuous pursuit of health, providing you with the guidance, resources, 
              and support needed to achieve your fitness goals. Your success is our commitment, inspiring 
              you to live your best and healthiest life.</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-8 max-sm:w-full">
            <div className="flex flex-col items-center border border-orange-500 rounded-md p-6">
              <h2 className="text-white text-2xl mb-2">Custom Workouts</h2>
              <p className="text-white">Tailor your fitness journey with your own custom workouts. 
              Join a community of like-minded individuals passionate about health and fitness. 
              Together, we strive for success, supporting each other to reach new heights and 
              accomplish our shared goals. Your dedication inspires the collective effort.</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-8 max-sm:w-full">
            <div className="flex flex-col items-center border border-orange-500 rounded-md p-6">
              <h2 className="text-white text-2xl mb-2">Progress Tracking</h2>
              <p className="text-white">Track your progress with our dedicated tools. 
              We empower you to take control of your health and fitness, providing resources and support for your success. 
              Our commitment is to inspire you to live your best life, achieving your goals, big or small, every step of the way.</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-8 max-sm:w-full">
            <div className="flex flex-col items-center border border-orange-500 rounded-md p-6">
              <h2 className="text-white text-2xl mb-2">Goal Setting</h2>
              <p className="text-white">Set and conquer your fitness goals with ease. 
              We are dedicated to helping each other succeed. The collective effort of 
              like-minded individuals inspires each member to reach new heights and accomplish 
              personal fitness milestones. Your goals are our shared journey.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-auto pb-8">
          <Link to="/signup" className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Join Now</Link>
        </div>
      </div>

    </div>
  );
};

export default Home;


