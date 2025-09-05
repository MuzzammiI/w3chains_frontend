import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Tag, LayoutDashboard, PencilLine, Plus, X, ListPlus, Image as ImageIcon } from 'lucide-react';
// import 'tailwindcss/tailwind.css'; // Tailwind CSS is assumed to be available

// ===============================================
// Component 1: Live Preview Card
// Renders a live preview of the post as it's being edited.
// ===============================================
const LivePreviewCard = ({ post }) => {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  
  // Placeholder image for when a main image is not provided or is invalid
  const placeholderImageUrl = "https://placehold.co/600x400/e2e8f0/64748b?text=Main+Image";

  return (
    <motion.div
      key={post.headline} // Key for animation re-render
      className="bg-white rounded-xl shadow-xl overflow-hidden"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={post.main_image || placeholderImageUrl}
          alt="Post main visual"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.src = placeholderImageUrl; }} // Fallback for broken images
        />
        {post.main_image && (
          <div className="absolute top-0 right-0 m-2 p-1 bg-white rounded-full shadow-md">
            <ImageIcon className="w-5 h-5 text-indigo-500"/>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{post.headline || "Untitled Post"}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary || "Summary will appear here..."}</p>

        <div className="flex items-center text-gray-500 text-xs mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.reading_time_minutes} min read</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(post.tags || []).map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

LivePreviewCard.propTypes = {
  post: PropTypes.shape({
    headline: PropTypes.string,
    main_image: PropTypes.string,
    summary: PropTypes.string,
    reading_time_minutes: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

// ===============================================
// Component 2: Dynamic Tag Input
// Handles adding and removing tags, keywords, and entities.
// ===============================================
const DynamicTagInput = ({ label, tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      // Add tag if it doesn't already exist and is not empty
      if (!tags.includes(inputValue.trim()) && inputValue.trim() !== '') {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-semibold mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-100 border border-gray-300 rounded-lg">
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.div
              key={tag}
              className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
          placeholder={`Press Enter to add ${label.toLowerCase()}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={() => {
            if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
              setTags([...tags, inputValue.trim()]);
              setInputValue('');
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

DynamicTagInput.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

// ===============================================
// Component 3: Update Sidebar
// Displays recent updates or a log.
// ===============================================
const UpdateSidebar = ({ post }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <ListPlus className="w-6 h-6 mr-2 text-indigo-500" />
        Current Updates
      </h3>
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-3 bg-white rounded-lg shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-700">Last Edited:</p>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-3 bg-white rounded-lg shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-700">Post Status:</p>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {post.status}
          </span>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="p-3 bg-white rounded-lg shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-700">Content Type:</p>
          <span className="text-sm text-gray-500">{post.content_type || 'None'}</span>
        </motion.div>
      </div>
    </div>
  );
};

UpdateSidebar.propTypes = {
  post: PropTypes.shape({
    status: PropTypes.string,
    content_type: PropTypes.string,
  }).isRequired,
};

// ===============================================
// Main App Component: The Content Editor
// Combines all components into a full-page editor.
// ===============================================
const EditorDashboard = () => {
  const initialPostState = {
    _id: { "$oid": "6890aafa51f1fdd469d90032" },
    reading_time_minutes: 4,
    headline: "Alleged DDoS Attack Disrupts Potential Monero 51% Takeover via Qubic Mining Pool",
    article: "As of Monday, August 4, 2025, the cryptocurrency world is abuzz with unconfirmed reports suggesting a potential 51% attack on the privacy-focused Monero (XMR) blockchain was narrowly averted...",
    summary: "As of Monday, August 4, 2025, the cryptocurrency world is abuzz with unconfirmed reports suggesting a potential 51% attack on the privacy-focused Monero (XMR) blockchain was narrowly averted, thank...",
    slug: "2025-08-04T12:26:04.000Z",
    keywords: ["crypto", "bitcoin", "defi", "blockchain", "market"],
    entities: ["Bitcoin", "defi"],
    financial: null,
    created_at: "2025-08-04T12:43:36.602Z",
    status: "draft",
    content_type: "crypto_news",
    tags: ["crypto", "defi", "lending", "world-id", "blockchain"],
    main_image: "https://images.unsplash.com/photo-1629819811419-158a12530c80?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Added main image
    additional_images: [] // Added for optional images
  };

  const [postData, setPostData] = useState(initialPostState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: Number(value) || 0,
    }));
  };
  
  
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData(prevData => ({
          ...prevData,
          main_image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Handle error or reset
      setPostData(prevData => ({
        ...prevData,
        main_image: null,
      }));
    }
  };
  
  const handleAdditionalImages = (e, index) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...postData.additional_images];
        newImages[index] = reader.result;
        setPostData(prevData => ({
          ...prevData,
          additional_images: newImages,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addAdditionalImage = () => {
    setPostData(prevData => ({
      ...prevData,
      additional_images: [...prevData.additional_images, null],
    }));
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...postData.additional_images];
    newImages.splice(index, 1);
    setPostData(prevData => ({
      ...prevData,
      additional_images: newImages,
    }));
  };

  // Pre-defined options for select inputs
  const contentTypes = ['crypto_news', 'defi_update', 'financial_news', 'tech_report'];
  const statuses = ['draft', 'published', 'archived'];

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 md:p-8">
      <header className="mb-8 p-4 bg-white rounded-xl shadow-lg">
        <div className="flex items-center text-4xl font-extrabold text-gray-800">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
          >
            <LayoutDashboard className="w-12 h-12 mr-4 text-indigo-600" />
          </motion.div>
          Content Editor
        </div>
        <p className="text-gray-500 text-lg mt-2">
          Create and manage new posts with a live preview.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Form */}
        <motion.div
          className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center">
            <PencilLine className="w-8 h-8 mr-3 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-800">Edit Post Details</h2>
          </div>

          <form className="space-y-6">
            {/* Headline */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="headline">Headline</label>
              <input
                type="text"
                id="headline"
                name="headline"
                value={postData.headline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={postData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="reading_time_minutes">Reading Time (minutes)</label>
              <input
                type="number"
                id="reading_time_minutes"
                name="reading_time_minutes"
                value={postData.reading_time_minutes}
                onChange={handleNumberChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={postData.summary}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
              ></textarea>
            </div>
            
            {/* Main Image File Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="main_image">Main Image (JPG, PNG, WEBP)</label>
              <input
                type="file"
                id="main_image"
                name="main_image"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleMainImageChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {/* Additional Images (Optional) */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Additional Images (Optional)</label>
              {postData.additional_images.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={(e) => handleAdditionalImages(e, index)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="ml-2 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAdditionalImage}
                className="mt-2 w-full py-2 px-4 bg-indigo-100 text-indigo-800 font-semibold rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                Add Image
              </button>
            </div>

            {/* Article */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="article">Article Content</label>
              <textarea
                id="article"
                name="article"
                value={postData.article}
                onChange={handleChange}
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800 placeholder-gray-400"
              ></textarea>
            </div>

            {/* Dynamic Tag Inputs */}
            <DynamicTagInput
              label="Keywords"
              tags={postData.keywords}
              setTags={(newTags) => setPostData({ ...postData, keywords: newTags })}
            />

            <DynamicTagInput
              label="Tags"
              tags={postData.tags}
              setTags={(newTags) => setPostData({ ...postData, tags: newTags })}
            />
            
            <DynamicTagInput
              label="Entities"
              tags={postData.entities}
              setTags={(newTags) => setPostData({ ...postData, entities: newTags })}
            />

            {/* Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-semibold mb-2" htmlFor="content_type">Content Type</label>
                <select
                  id="content_type"
                  name="content_type"
                  value={postData.content_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800"
                >
                  {contentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-800 font-semibold mb-2" htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={postData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-800"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Financial Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="financial"
                name="financial"
                checked={!!postData.financial}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 text-gray-800 font-semibold" htmlFor="financial">Financial Post</label>
            </div>
            
            <button
              type="submit"
              className="mt-6 w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Save Post
            </button>
          </form>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Live Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-white rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Preview</h2>
            <LivePreviewCard post={postData} />
          </motion.div>

          {/* Current Updates Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <UpdateSidebar post={postData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorDashboard;
