import { MdOutlineWhatshot } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { sampleData } from "../data.js";
import { useEffect, useState } from "react";
import ReviewCard from "./Cards/ReviewCard.jsx";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  const getReviews = async () => {
    const reviews = sampleData;
    setReviews(reviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <div className="pb-5 px-5">
        <div className="md:max-w-5xl mx-auto">
          <div className="mb-4 w-full d-block md:hidden">
            <div className="flex gap-2">
              <input
                type="text"
                className="border rounded px-4 w-full"
                placeholder="Book Title, Author..."
              />
              <button className="py-3 px-6 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all">
                <FiSearch />
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center p-5 border rounded">
            <div className="flex self-start md:self-auto gap-5">
              <button
                className={
                  selectedTab === "all"
                    ? `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-indigo-100 border-b-4 border-indigo-500  text-gray rounded transition-all`
                    : `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 border-b-4 border-gray-100  text-gray rounded transition-all`
                }
                onClick={() => {
                  setSelectedTab("all");
                }}
              >
                <MdOutlineWhatshot />
                All ({reviews.length})
              </button>
              {/* <button
                className={
                  selectedTab === "latest"
                    ? `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-indigo-100 border-b-4 border-indigo-500  text-gray rounded transition-all`
                    : `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 border-b-4 border-gray-100  text-gray rounded transition-all`
                }
                onClick={() => {
                  setSelectedTab("latest");
                }}
              >
                <MdOutlineWhatshot />
                Latest
              </button> */}
              <button
                className={
                  selectedTab === "my-reviews"
                    ? `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-indigo-100 border-b-4 border-indigo-500  text-gray rounded transition-all`
                    : `py-3 px-6 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 border-b-4 border-gray-100  text-gray rounded transition-all`
                }
                onClick={() => {
                  setSelectedTab("my-reviews");
                }}
              >
                <BiCommentDetail />
                My Reviews
              </button>
            </div>

            <div className="hidden md:flex gap-2">
              <input
                type="text"
                className="border rounded px-4"
                placeholder="Book Title, Author..."
              />
              <button className="py-3 px-6 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all">
                <FiSearch />
                Search
              </button>
            </div>
          </div>
          {reviews &&
            reviews.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })}
        </div>
      </div>

      {/* Modal pop up */}
    </div>
  );
};

export default ReviewList;
