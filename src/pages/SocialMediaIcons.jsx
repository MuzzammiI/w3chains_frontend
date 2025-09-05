// import React from 'react';
import { 
  FaTwitter, 
  FaFacebook, 
  FaWhatsapp, 
  FaLinkedin, 
  FaReddit, 
  FaTelegram,
  FaShareAlt 
} from 'react-icons/fa';

const SocialMediaIcons = () => {
  // Sample URL to share - you can make this dynamic
  const shareUrl = window.location.href;
  const shareTitle = document.title || 'Check this out!';

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-[#1877F2]'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
      color: 'hover:text-[#25D366]'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-[#0A66C2]'
    },
    {
      name: 'Reddit',
      icon: <FaReddit />,
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-[#FF4500]'
    },
    {
      name: 'Telegram',
      icon: <FaTelegram />,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: 'hover:text-[#0088cc]'
    },
    {
      name: 'Share',
      icon: <FaShareAlt />,
      url: '#', // This could trigger a custom share function
      color: 'hover:text-gray-600'
    }
  ];

  return (
    <div className="flex space-x-4 justify-center items-center p-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 ${social.color} transition-colors duration-200 transform hover:scale-110`}
          title={`Share on ${social.name}`}
        >
          <span className="text-2xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;