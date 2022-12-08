import React, { useState } from "react";
import { FeedbackRegistration } from "../helper/backend_helpers";
import { useQuery } from "../helper/hook/useQuery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";


const Feedbackpage = () => {
  const initialFormValues = {
    category: "",
    from: "",
    to: "",
    area: "",
    propertytype: "",
    comment: "",
    phonenumber:""
  };
  const { query } = useQuery;
  const [feedback, setFeedback] = useState(initialFormValues);
  const [feedbackSuccess, setFeedbackSuccess] = useState(initialFormValues);
  const [feedbackError, setFeedbackError] = useState(initialFormValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((pre) => {
      return { ...pre, [name]: value };
    });
  };
  console.log("payload", feedback);
  const handleSubmit = async () => {
    const payload=feedback
    const res = await FeedbackRegistration(payload );

    if (res.success) {
      setFeedback(res.initialFormValues);
      toastr.success(`Feedback Sent Sucessfully`, "Success");

      setFeedbackSuccess(res.msg)
    } else {
      setFeedbackError(res.msg);
    }
  };
  return (
    <div className="grid justify-items-center py-5  px-2 font-serif">
      <div className=" text-2xl">Your Feedback</div>
      <form
        className="w-full max-w-lg mt-5 "
        onSubmit={() => {
      
          handleSubmit();
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2">
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="category"
                id="grid-state"
                value={feedback.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="residential">Residential</option>
                <option value="comercial">Commercial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mt-4">
          BUDGET
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
              type="number"
            >
              From
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="from"
              id="grid"
              type="number"
              placeholder=""
              value={feedback.from}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2"
              type="number"
            >
              To
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="to"
              type="number"
              placeholder=""
              value={feedback.to}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2">
              Area
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              name="area"
              type="text"
              placeholder="Enter The Area"
              value={feedback.area}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2">
              Phone Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              name="phonenumber"
              type="number"
              required
              placeholder="Enter The phonenumber"
              value={feedback.phonenumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2">
              Property Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="propertytype"
                value={feedback.propertytype}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="residential">Residential site</option>
                <option value="commercial">Commercial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-semibold mb-2">
              Comment
            </label>
            <textarea
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              name="comment"
              id="message"
              value={feedback.comment}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-blue-600 hover:bg-teal-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Feedbackpage;
