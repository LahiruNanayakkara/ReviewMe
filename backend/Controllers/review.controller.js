import { errorHandler } from "../lib/error.js";
import Review from "../Modals/review.modal.js";

export const createReview = async (req, res, next) => {
  const { title, author, rating, reviewText } = req.body;

  try {
    if (!title || !author || !rating || !reviewText) {
      return next(errorHandler(400, "All fields are required"));
    }

    const slug = title
      .toLowerCase()
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newReview = new Review({
      title,
      author,
      rating,
      reviewText,
      slug,
      userId: req.user.userId,
    });

    const savedReview = await newReview.save();
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: savedReview,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const sortDirection = req.query.sortDirection || "desc";

    const reviews = await Review.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.author && { author: req.query.author }),
      ...(req.query.r_id && { _id: req.query.r_id }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { author: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(pageSize);

    const totalReviews = await Review.countDocuments({
      ...(req.query.userId && { userId: req.query.userId }),
    });

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      totalReviews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to delete this review"));
  }
  try {
    await Review.findByIdAndDelete(req.params.r_id);
    res.status(200).json("Review deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to update this review"));
  }

  const { title, author, rating, reviewText } = req.body;

  if (!title || !author || !rating || !reviewText) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.r_id,
      {
        $set: {
          title,
          author,
          rating,
          reviewText,
          slug: req.body.title
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, ""),
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};
