import { MdOutlineWhatshot } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BiCommentDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import ReviewCard from "./Cards/ReviewCard.jsx";
import { getReviews } from "../utils/api.js";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../state/review/reviewSlice.js";
import { FiFilter, FiSearch } from "react-icons/fi";

const override = {
  display: "block",
  margin: "10px auto",
  borderColor: "blue",
};

const ReviewList = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState({
    key: "",
    value: "",
  });
  const dispatch = useDispatch();

  const { reviews } = useSelector((state) => state.review);
  const { currentUser } = useSelector((state) => state.user);

  const getReviewsAsync = async (query) => {
    setLoading(true);
    try {
      const res = await getReviews(query);

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        dispatch(setReviews(data.data));
      } else {
        setLoading(false);
        console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getReviewsAsync();
  }, []);

  useEffect(() => {
    getReviewsAsync(filterQuery);
  }, [filterQuery]);

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
          <div className="flex  md:flex-row justify-between items-center p-5 border rounded">
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
            <div className="flex items-center gap-4">
              <div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <FiFilter />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem
                        onClick={() => setFilterQuery({ key: "", value: "" })}
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          None
                        </span>
                      </MenuItem>
                      <hr />
                      <MenuItem
                        onClick={() =>
                          setFilterQuery({ key: "rating", value: "asc" })
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          Rate: Lowest to highest
                        </span>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          setFilterQuery({ key: "rating", value: "desc" })
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          Rate: Highest to Lowest
                        </span>
                      </MenuItem>
                      <hr />
                      <MenuItem
                        onClick={() =>
                          setFilterQuery({ key: "createdAt", value: "desc" })
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          Date created: Newest to oldest
                        </span>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          setFilterQuery({ key: "createdAt", value: "asc" })
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          Date created: Oldest to newest
                        </span>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
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
          </div>

          {loading && (
            <div className="w-full h-40 flex items-center justify-center">
              <ClipLoader
                color={"indigo"}
                loading={loading}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}

          {!loading &&
            selectedTab === "all" &&
            reviews &&
            reviews.map((review) => {
              return <ReviewCard key={review._id} review={review} />;
            })}

          {!loading &&
            selectedTab === "my-reviews" &&
            reviews &&
            reviews
              .filter((review) => review.userId === currentUser._id)
              .map((review) => {
                return <ReviewCard key={review._id} review={review} />;
              })}
        </div>
      </div>

      {/* Modal pop up */}
    </div>
  );
};

export default ReviewList;
