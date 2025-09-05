// components/PostCard.js
// import React from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'; // Example icon
import PropTypes from 'prop-types';
const PostCard = ({ post, onPostSelect }) => {
  const MAX_ASSIGNEES_DISPLAY = 3;

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col justify-between h-full border border-gray-200"
      onClick={() => onPostSelect(post)}
    >
      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
              post.status === 'Completed'
                ? 'bg-green-100 text-green-700'
                : post.status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {post.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>
      </div>
      <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-red-500 text-xs font-medium mb-3">
          Deadline : {post.deadline}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center -space-x-2">
            {post.assignees.slice(0, MAX_ASSIGNEES_DISPLAY).map(assignee => (
              <img
                key={assignee.id}
                src={assignee.avatar}
                alt={`Assignee ${assignee.id}`}
                title={`Assignee ${assignee.id}`} // Tooltip for avatar
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
            {post.assignees.length > MAX_ASSIGNEES_DISPLAY && (
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold border-2 border-white">
                +{post.assignees.length - MAX_ASSIGNEES_DISPLAY}
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <ChatBubbleLeftEllipsisIcon className="h-4 w-4 mr-1.5 text-gray-400" />
            {post.issues} issues
          </div>
        </div>
      </div>
    </div>
  );
};


PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        issues: PropTypes.number.isRequired,
        assignees: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            avatar: PropTypes.string.isRequired,
        })
        ).isRequired,
    }).isRequired,
    onPostSelect: PropTypes.func.isRequired,
    };

export default PostCard;
