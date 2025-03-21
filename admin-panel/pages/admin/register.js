import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }
    if (!captchaVerified)
      newErrors.captcha = "Please verify that you're not a robot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg w-[90%] sm:w-3/4 md:w-2/5 lg:w-96 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {errors.captcha && (
          <p className="text-red-500 text-sm mb-2">{errors.captcha}</p>
        )}

        <div className="w-full mb-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full mb-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full mb-4">
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={() => setCaptchaVerified(true)}
          className="mb-4"
          size="compact"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-600 my-2">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-blue-500">
            Sign In
          </Link>
        </p>

        <hr className="my-2 border w-full" />

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => signIn("google")}
            className="p-2 h-14 w-14 border rounded-full flex items-center justify-center"
          >
            <FcGoogle size={18} />
          </button>
          <button
            onClick={() => signIn("github")}
            className="p-2 h-14 w-14 border rounded-full flex items-center justify-center"
          >
            <FaGithub size={18} />
          </button>
          {/*<button
            onClick={() => signIn("twitter")}
            className="p-2 border rounded-full"
          >
            <FaTwitter size={18} color="#1DA1F2" />
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="p-2 border rounded-full"
          >
            <FaFacebook size={18} color="blue" />
          </button>*/}
        </div>
      </form>
    </div>
  );
}
