// components/PostDetailsPage.js
// import React from 'react';
import { ArrowLeftIcon, CalendarIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostDetailsPage = ({ posts, onBack }) => {
  const { postId } = useParams();
  const post = posts.find(p => p.id === Number(postId));
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-600">
        <p className="text-xl mb-4">No post selected or post data is unavailable.</p>
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform duration-150 ease-in-out group-hover:-translate-x-1" />
        Back to Posts
      </button>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            {post.title}
            </h1>
            <span
                className={`px-3 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap ${
                post.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : post.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
            >
                {post.status}
            </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1.5 text-red-500" />
                Deadline: <span className="font-medium text-red-600 ml-1">{post.deadline}</span>
            </div>
            <div className="flex items-center">
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-1.5 text-gray-400" />
                {post.issues} issues
            </div>
        </div>
      </div>


      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed prose max-w-none">
          {post.description}
        </p>
      </div>

      {post.content && (
         <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Full Details</h2>
            <p className="text-gray-700 leading-relaxed prose max-w-none">
            {post.content}
            </p>
        </div>
      )}


      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Assignees</h2>
        <div className="flex flex-wrap gap-3">
          {post.assignees.map(assignee => (
            <div key={assignee.id} className="flex items-center bg-gray-100 p-2 rounded-lg">
              <img
                src={assignee.avatar}
                alt={`Assignee ${assignee.id}`}
                className="w-8 h-8 rounded-full mr-2 border-2 border-white object-cover"
              />
              <span className="text-sm text-gray-700">Assignee {assignee.id}</span>
            </div>
          ))}
           {post.assignees.length === 0 && (
            <p className="text-sm text-gray-500">No assignees for this post.</p>
           )}
        </div>
      </div>

      {/* You can add more sections like comments, attachments, etc. here */}
    </div>
  );
};

PostDetailsPage.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        issues: PropTypes.number.isRequired,
        assignees: PropTypes.arrayOf(
            PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
            })
        ).isRequired,
        content: PropTypes.string
        })
    ).isRequired,
    onBack: PropTypes.func.isRequired
    };


export default PostDetailsPage;
