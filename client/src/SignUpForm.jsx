import axios from 'axios';
import { useState } from 'react';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
    full_name: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler function
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData); // Send form data to backend or perform further actions
    const data = {
      ...formData,
      profile_picture: null,
      cover_photo: null,
      bio: null,
      date_of_birth: null,
      location: null,
      last_login_timestamp: null,
      account_status: 'active',
      security_tokens: {
        verification_token: null,
        password_reset_token: null,
      },
      social_links: {
        twitter: null,
        instagram: null,
      },
      friends_list: null,
      post_history: null,
    };
    axios
      .post('https://ystoria-api.vercel.app/user/signup', data)
      .then(() => {
        setIsLoading(false);

        console.log('Successful user creation.');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password_hash" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Sign Up
          </button>
        </div>
      </form>
      {isLoading && <p>Loading</p>}
    </div>
  );
};

export default SignUpForm;
