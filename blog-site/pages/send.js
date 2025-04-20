import { useState } from "react";

export default function Send() {
  const [state, setState] = useState({
    message: "",
    phone: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(state);
    // You can add your API call here
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: state.phone,
        message: state.message,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-16 px-4 flex justify-center">
      <form
        onSubmit={handleForm}
        className="space-y-4 text-center bg-white shadow-xl rounded-lg p-6 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-blue-700">Send Message</h1>

        <div className="text-left">
          <label
            htmlFor="phone"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            placeholder="e.g. +1 9874568235"
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="message"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={state.message}
            onChange={handleChange}
            placeholder="Type your message..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 ring-2 hover:bg-blue-700 text-white rounded-md w-full py-2 font-medium transition shadow-md focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
