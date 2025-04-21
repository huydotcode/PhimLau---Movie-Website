import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Icons from "./Icons";
import Avatar from "./Avatar";
import { convertTime } from "../utils/convertTime";
import Loading from "./Loading";
import Button from "./ui/Button";
import { toast } from "sonner";

/*
{
    "id": 7,
    "name": "Nguyễn Văn G",
    "avatar": "",
    "content": "Phim này có nhiều cảnh quay đẹp, mình rất thích",
    "rating": 5,
    "like_count": 4,
    "created_at": "2025-04-09T11:25:48.000Z"
  },
*/

const CommentSection = ({ movieId }) => {
  const {
    data: comments,
    setData: setComments,
    loading,
    error,
  } = useFetch({
    fetchDataFn: () =>
      fetch("/json/comments.json").then(res =>
        res.json().then(data => data.slice(0, 5)),
      ),
  });

  // Sort theo like_count
  const sortComments =
    comments &&
    comments.sort((a, b) => {
      // Nếu id == "myid" thì cho lên đầu
      if (a.user_id === "myid") return -1;

      return b.like_count - a.like_count;
    });

  return (
    <div className="gap-2 flex flex-col">
      <h2 className="flex items-center text-xl font-semibold">
        <Icons.Comment className={"mr-2"} />
        Bình luận
      </h2>

      <CommentForm setComments={setComments} />

      <div className="flex flex-col">
        {!loading &&
          sortComments.map(comment => {
            return (
              <div className="p-2" key={comment.id}>
                <div className="flex items-center gap-2">
                  <Avatar imgSrc={comment.avatar} />

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
                        {convertTime(comment.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <Loading isLoading={loading} />
      </div>
    </div>
  );
};

export const CommentForm = ({ setComments }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();

    if (comment.trim() === "") {
      toast.error("Vui lòng nhập bình luận của bạn!");
      return;
    }
    if (rating === 0) {
      toast.error("Vui lòng chọn đánh giá cho bình luận của bạn!");
      return;
    }

    // Submit comment
    const newComment = {
      id: new Date().getTime(),
      user_id: "myid",
      name: "Nguyễn Văn A",
      avatar: "/images/avatar_mau_2.jpg",
      content: comment,
      rating: rating,
      like_count: 0,
      created_at: new Date().toISOString(),
    };

    setComments(prev => [newComment, ...prev]);

    toast.success("Bình luận của bạn đã được gửi thành công!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
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
