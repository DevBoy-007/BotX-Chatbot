import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const Signpage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // ✅ Yup Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .matches(/^[a-zA-Z ]+$/, "Only letters and spaces allowed")
      .required("Username is required"),
    useremail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    userpassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[!@#$%^&*]/, "Must include at least one special character")
      .required("Password is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      useremail: "",
      userpassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const sign = await axios.post("http://localhost:3000/usersign/signup", values);
        if(sign.data.response){
          toast.success(sign.data.response);
          resetForm();
         }
        if(sign.data.error){
          toast.error(sign.data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="flex bg-black justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-10">
    <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        data-aos="zoom-in"
        className="flex flex-col items-center gap-6 bg-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10"
      >
        <input
          name="username"
          type="text"
          placeholder="Enter Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="w-full border-b border-white text-white bg-black text-center py-2 focus:outline-none focus:border-red-500 transition duration-300"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-400 text-sm">{formik.errors.username}</div>
        )}

        <input
          name="useremail"
          type="email"
          placeholder="Enter Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.useremail}
          className="w-full border-b border-white text-white bg-black text-center py-2 focus:outline-none focus:border-red-500 transition duration-300"
        />
        {formik.touched.useremail && formik.errors.useremail && (
          <div className="text-red-400 text-sm">{formik.errors.useremail}</div>
        )}

        <input
          name="userpassword"
          type="password"
          placeholder="Enter Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userpassword}
          className="w-full border-b border-white text-white bg-black text-center py-2 focus:outline-none focus:border-red-500 transition duration-300"
        />
        {formik.touched.userpassword && formik.errors.userpassword && (
          <div className="text-red-400 text-sm">{formik.errors.userpassword}</div>
        )}

        <div className="flex flex-col gap-2 w-full text-center mt-4">
          <Link to={"/"}>
            <label className="text-white">
              You have an account?
              <span className="text-blue-400 cursor-pointer">Login!</span>
            </label>
          </Link>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-red-700 text-white font-semibold rounded-full w-32 h-10 mx-auto transition duration-300"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signpage;
