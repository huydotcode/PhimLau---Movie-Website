import React from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthProvider";
import { deleteComment, likeComment } from "../services/commentService";
import { convertTime } from "../utils/convertTime";
import Avatar from "./Avatar";
import Icons from "./Icons";
import Button from "./ui/Button";
import { useQueryClient } from "@tanstack/react-query";

const CommentItem = ({ comment }) => {
  const { user } = useAuth();
  const isOwner = user && user?.uid == comment.user_id;
  const isLiked = user && comment.likedby?.includes(user?.uid);
  const queryClient = useQueryClient();

  const handleLikeComment = async () => {
    if (!user) {
      toast("Vui lòng đăng nhập để thích bình luận này!");
      return;
    }

    if (isLiked) {
      toast("Bạn đã thích bình luận này rồi!");
      return;
    }

    try {
      await likeComment(user?.uid, comment.id);
      toast("Thích bình luận thành công!");
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.movieId],
      });
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Thích bình luận thất bại!");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id);
      toast("Xóa bình luận thành công!");
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.movieId],
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Xóa bình luận thất bại!");
    }
  };

  return (
    <div className="flex justify-between items-center p-2" key={comment.id}>
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
                return <Icons.Star key={index} className="text-yellow-600" />;
              })}

              {new Array(5 - comment.rating).fill(0).map((_, index) => {
                return <Icons.RegStar key={index} />;
              })}
            </div>
          </div>

          <p className="text-sm">{comment.content}</p>

          <div className="flex items-center gap-4">
            {isOwner && (
              <div className="flex items-center gap-1 text-sm">
                <Icons.Like className="text-primary" />
                <p>{comment.like_count}</p>
              </div>
            )}

            {!isOwner && (
              <Button
                className="flex items-center gap-1 text-sm"
                onClick={handleLikeComment}
              >
                <Icons.Like className="text-primary w-5 h-5" />
                <p>{comment.like_count}</p>
              </Button>
            )}

            <p className="text-xs text-gray-500">
              {convertTime(comment.created_at.toDate())}
            </p>

            {isOwner && (
              <Button
                className="text-sm text-primary hover:opacity-50"
                onClick={handleDeleteComment}
              >
                <Icons.Delete className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
