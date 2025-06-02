// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { PATHS } from "../../route/route";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Implement registration logic
//     console.log("Registration data:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-[#151515] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-[#1c1c1c] p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-white">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link
//               to={PATHS.AUTH.LOGIN}
//               className="font-medium text-blue-500 hover:text-blue-400"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="sr-only">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   required
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="sr-only">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   required
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Last Name"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Username"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-[#2a2a2a] placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
