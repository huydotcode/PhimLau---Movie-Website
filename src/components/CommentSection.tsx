import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthProvider";
import { useCommentByMovieId } from "../hooks/useComment";
import { addComment } from "../services/commentService";
import { convertTime } from "../utils/convertTime";
import Avatar from "./Avatar";
import Icons from "./Icons";
import Loading from "./Loading";
import Button from "./ui/Button";

const CommentSection = ({ movieId }) => {
  const { data: comments, isLoading } = useCommentByMovieId({ movieId });
  const { user } = useAuth();

  // Kiểm tra nếu người dùng đã bình luạn rồi thì không cho bình luận nữa
  const isCommented = !!comments.find((cmt) => cmt.user_id === user.uid);

  return (
    <div className="gap-2 flex flex-col">
      <h2 className="flex items-center text-xl font-semibold">
        <Icons.Comment className={"mr-2"} />
        Bình luận
      </h2>

      <CommentForm movieId={movieId} isCommented={isCommented} />

      <div className="flex flex-col">
        {!isLoading &&
          comments.map((comment) => {
            return (
              <div className="p-2" key={comment.id}>
                <div className="flex items-center gap-2">
                  {comment.avatar ? (
                    <Avatar imgSrc={comment.avatar} />
                  ) : (
                    <Icons.User className="w-6 h-6" />
                  )}

                  <div className="flex flex-col p-2 gap-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-sm font-semibold">{comment.name}</h3>

                      <div className="flex items-center gap-1 text-sm">
                        {new Array(comment.rating).fill(0).map((_, index) => {
                          return (
                            <Icons.Star
                              key={index}
                              className="text-yellow-400"
                            />
                          );
                        })}

                        {new Array(5 - comment.rating)
                          .fill(0)
                          .map((_, index) => {
                            return <Icons.RegStar key={index} />;
                          })}
                      </div>
                    </div>

                    <p className="text-sm">{comment.content}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Icons.Like className="text-primary" />
                        <p>{comment.like_count}</p>
                      </div>

                      <p className="text-xs text-secondary">
                        {convertTime(comment.created_at.toDate())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <Loading isLoading={isLoading} />
      </div>
    </div>
  );
};

export const CommentForm = ({ movieId, isCommented = false }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCommented) {
      toast("Bạn đã bình luận rồi!");
      return;
    }

    if (!user) {
      toast("Vui lòng đăng nhập để thực hiện bình luận!");
      return;
    }

    if (comment.trim().length === 0) {
      toast("Vui lòng nhập bình luận của bạn!");
      return;
    }
    if (rating === 0) {
      toast("Vui lòng chọn đánh giá của bạn!");
      return;
    }

    await addComment({
      avatar: user.photoURL,
      content: comment,
      rating: rating,
      movieId,
      name: user.displayName,
      userId: user.uid,
    });

    queryClient.invalidateQueries({
      queryKey: ["comments", movieId],
    });

    toast("Bình luận của bạn đã được gửi thành công!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nhập bình luận của bạn..."
        className="p-4 border rounded-md text-sm border-secondary focus:outline-none resize-y"
      ></textarea>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Đánh giá:</span>
          {new Array(5).fill(0).map((_, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                className={`${
                  index < rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                <Icons.Star />
              </button>
            );
          })}
        </div>

        <Button
          type="submit"
          className="px-4 py-1 bg-secondary text-white rounded-md"
        >
          <Icons.Send /> Gửi
        </Button>
      </div>
    </form>
  );
};

export default CommentSection;
