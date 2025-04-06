import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="my-6 text-center text-gray-500 dark:text-gray-400">
        No comments yet. Be the first to join the conversation!
      </div>
    );
  }

  const renderComment = (comment) => {
    const publishedDate = new Date(comment.createdAt);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    return (
      <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {comment.author.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo}
          </span>
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none mb-2">
          <p className="text-gray-700 dark:text-gray-300">
            {comment.content}
          </p>
        </div>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {comment.replies.map(reply => (
              <div key={reply._id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {reply.author.name}
                  </h5>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};

export default CommentList;
