/* eslint-disable react/prop-types */
import { FaRegCommentDots } from "react-icons/fa";
import RatingStart from "../RatingStart";
import Modal from "../Modal";
import { useState } from "react";

const ReviewCard = ({ review }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteEditModalOpen] = useState(false);
  return (
    <div className="flex flex-col p-4 my-4 border rounded">
      <div className="flex items-center gap-4 flex-1">
        <div className="p-4 bg-indigo-100 rounded-full">
          <FaRegCommentDots className="text-indigo-500" size={24} />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-xl">{review.title}</h1>
            <p className="text-sm">{review.dateAdded}</p>
          </div>
          <p className="text-sm">By {review.author}</p>
          <RatingStart rating={review.rating} />
          <p className="line-clamp-3">{review.reviewText}</p>
          <div className="flex gap-4 text-sm justify-end">
            <button
              className="text-indigo-500 font-medium"
              onClick={() => setEditModalOpen(true)}
            >
              Edit
            </button>
            <button className="text-red-500 font-medium" onClick={() => setDeleteEditModalOpen(true)}>Delete</button>
          </div>
        </div>
      </div>

      {/* Edit popup */}
      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
      ></Modal>

      {/* Delete popup */}
      <Modal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteEditModalOpen(false);
        }}
      ></Modal>
    </div>
  );
};

export default ReviewCard;
