import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!credentials.password || credentials.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!captchaVerified) {
      setError("Please verify that you are not a robot.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
      callbackUrl: "/",
      rememberMe,
    });

    setLoading(false);

    if (!result.error) {
      router.push("/");
    } else {
      setError(result.error || "Invalid email or password.");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError(null);

    const result = await signIn(provider, { callbackUrl: "/" });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg w-[90%] sm:w-3/4 md:w-2/5 lg:w-96 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="w-full mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full mb-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-600">
            Remember Me
          </label>
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
          className="mb-2"
          size="compact"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded mb-4 transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          href="/forgot-password"
          className="text-blue-500 hover:text-blue-600 text-sm mb-4"
        >
          Forgot Password?
        </Link>

        <p className="text-gray-600 my-2">
          {`Don't have an account? `}
          <Link
            href="/admin/register"
            className="text-blue-500 hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>

        <hr className="my-2 border w-full" />

        <div className="w-full flex items-center gap-2 justify-center">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="p-2 border rounded-full flex items-center justify-center h-14 w-14 hover:bg-gray-100 transition-all relative group"
          >
            <FcGoogle size={18} />
            <span className="absolute -top-8 left-0  bg-gray-800 text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
              Google
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="p-2 border rounded-full flex items-center justify-center h-14 w-14 hover:bg-gray-100 transition-all relative group"
          >
            <FaGithub size={18} />
            <span className="absolute -top-8 left-0 inline-block bg-gray-800 text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
              GitHub
            </span>
          </button>
          {/* 
          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="p-2 border rounded-full flex items-center justify-center h-14 w-14 hover:bg-gray-100 transition-all relative group"
          >
            <FaFacebook size={18} color="blue" />
            <span className="absolute -top-8 left-0  bg-gray-800 text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
              Facebook
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("twitter")}
            className="p-2 border rounded-full flex items-center justify-center h-14 w-14 hover:bg-gray-100 transition-all relative group"
          >
            <FaTwitter size={18} color="#1DA1F2" />
            <span className="absolute -top-8 left-0 inline-block bg-gray-800 text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
              Twitter
            </span>
          </button>
          */}
        </div>
      </form>
    </div>
  );
}
