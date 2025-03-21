import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    setLoading(false);

    if (!result.error) router.push("/");
    else setError(result.error);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg w-96 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className={`w-full text-white p-2 rounded mb-4 ${
            loading ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-600 my-2">
          {`Don't have an account?`}{" "}
          <Link href={"/admin/register"} className="mt-2 hover:text-blue-600">
            SignUp
          </Link>
        </p>
        <hr className="my-2 border w-full" />
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="p-4 border rounded-full flex items-center"
        >
          <FcGoogle className="mr-2" />
          Login with Google
        </button>
      </form>
    </div>
  );
}
