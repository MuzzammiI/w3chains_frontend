import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PhotoIcon, TagIcon, ListBulletIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const PostPreview = ({ formData, previewImage }) => (
  <div className="lg:w-1/2 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
      <PencilSquareIcon className="h-7 w-7 mr-3 text-indigo-600" /> Post Preview
    </h2>
    <div className="space-y-6">
      {previewImage ? (
        <img
          src={previewImage}
          alt="Thumbnail Preview"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500 font-medium">Upload a Thumbnail</span>
        </div>
      )}
      <h3 className="text-3xl font-extrabold text-gray-900">{formData.title || 'Your Post Title'}</h3>
      <p className="text-gray-600 text-sm font-medium">
        {formData.categories || 'No Categories'} • {formData.tags || 'No Tags'}
      </p>
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: formData.description || 'Write your post description here...' }}
      />
    </div>
  </div>
);

PostPreview.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.string,
    tags: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  previewImage: PropTypes.string,
};

const PostForm = ({ formData, setFormData, setPreviewImage, onSave, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  return (
    <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Your Post</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <PhotoIcon className="h-5 w-5 mr-2 text-indigo-600" /> Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2.5 file:px-5
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-100 file:text-indigo-700
              hover:file:bg-indigo-200 transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Enter your post title"
          />
        </div>

        <div>
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <ListBulletIcon className="h-5 w-5 mr-2 text-indigo-600" /> Categories
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Enter categories (e.g., Tech, Lifestyle)"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <TagIcon className="h-5 w-5 mr-2 text-indigo-600" /> Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Enter tags (e.g., #blog, #tips)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={quillModules}
            className="bg-white text-black rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200"
            onClick={() => onSave(formData)}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  previewImage: PropTypes.string,
  setPreviewImage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const WritePostPage = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    categories: '',
    tags: '',
    description: ''
  });
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
        Write a New Post
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <PostForm
          formData={formData}
          setFormData={setFormData}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          onSave={onSave}
          onCancel={onCancel}
        />
        <PostPreview formData={formData} previewImage={previewImage} />
      </div>
    </div>
  );
};

WritePostPage.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default WritePostPage;
