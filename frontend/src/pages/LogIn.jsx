import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signIn } from '../service/authService';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await signIn(values);
        dispatch(authActions.login(data));
        dispatch(authActions.changeRole(data.role));
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('role', data.role);
        navigate('/profile');
      } catch (error) {
        console.error('Login error:', error); // Log error for debugging
        alert(error.response?.data?.message || 'Login failed.'); // Handle error gracefully
      }
    },
  });

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-4">Log In</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500">{formik.errors.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={formik.isSubmitting} // Disable button if submitting
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
