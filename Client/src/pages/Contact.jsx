import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      message: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await console.log(JSON.stringify(formData));
      setFormData({
        username: '',
        email: '',
        message: ''
      });
      window.location.reload();
    };

  return (
    <div className='bg-zinc-900 w-full pt-40 h-screen'>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-6xl text-center underline underline-offset-8 decoration-orange-500 decoration-6 ">Contact</h1>
        <form className='text-white w-96 max-sm:w-auto flex flex-col text-center justify-center pb-8 pt-8' onSubmit={handleSubmit}>
          <div className='flex w-full bg-gray-500 rounded mb-4'>
            <svg className="w-6 h-6 m-auto ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none"
              placeholder='Username'
              type="text"
              name="username"
              id="username"
              onChange={handleInputChange}/>
          </div>
          <div className='flex w-full bg-gray-500 rounded mb-4'>
            <svg className="w-6 h-6 m-auto ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none"
              placeholder='Email'
              type="text"
              name="email"
              id="email"
              onChange={handleInputChange}/>
          </div>
          <div className='flex w-full bg-gray-500 rounded mb-4'>
            <svg className="w-6 h-6 mt-1 ml-1" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.056"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#ffffff" strokeWidth="1.968" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            <textarea className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none"
              placeholder='Message'
              type="text"
              name="message"
              id="message"
              rows="8"
              style={{ resize: "none" }}
              onChange={handleInputChange}/>
          </div>
          <div className=" flex flex-wrap justify-center w-full p-2">
            <button className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact