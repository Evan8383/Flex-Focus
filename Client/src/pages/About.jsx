import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='bg-zinc-900 w-full m-auto pt-40 h-full'>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-6xl text-center underline underline-offset-8 decoration-orange-500 decoration-6 ">About Us</h1>
        <p className="text-white text-xl text-center pt-10 pb-4 w-3/4">
          Welcome to our fitness haven! Meet the dynamic duo behind the scenes -
          Evan and Dakota, the passionate minds driving our mission to transform
          lives through fitness. With a shared commitment to health and wellness,
          we embarked on a journey to create an app that goes beyond the ordinary,
          guiding you towards a fitter, healthier, and more vibrant version of yourself.
        </p>

        <p className="text-white text-xl text-center p-4 w-3/4">
          Evan, a fitness enthusiast with a background in software development,
          brings a blend of technical expertise and a deep understanding of the
          fitness landscape. His innovative approach ensures that our app is not
          just functional but also enjoyable, making your fitness journey a seamless
          and rewarding experience.
        </p>
        <p className="text-white text-xl text-center p-4 w-3/4">
          Dakota, also a fitness enthusiast with a background in software development,
          combines technical expertise with a passion for wellness.
          His dedication to empowering individuals to reach their fitness goals shines
          through in every aspect of the app, offering personalized guidance that evolves
          with your unique needs.
        </p>
        <p className="text-white text-xl text-center p-4 w-3/4">
          Together, we've crafted a fitness app that is more than just sets and reps.
          It's a holistic approach to well-being, encompassing tailored workout plans,
          nutritional insights, and a supportive community that keeps you motivated.
          Whether you're a seasoned fitness enthusiast or just starting your journey,
          our app is designed to meet you where you are and propel you towards success.
          Join us as we redefine fitness, one workout at a time. Evan and Dakota are
          here to inspire, guide, and celebrate your victories - because your journey
          is our passion.
        </p>

        <p className="text-white text-xl text-center p-4 w-3/4">
          Let's sweat, smile, and conquer fitness together!
        </p>
        <div className="flex justify-center mt-auto p-8">
          <Link to="/signup" className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Lets get started</Link>
        </div>
      </div>
    </div>
  )
}

export default About