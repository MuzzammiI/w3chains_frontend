





import { useState, useEffect,useContext } from "react";
// import PropTypes from "prop-types";
import { AuthContext } from '../../context/AuthContext.jsx';
import Sidebar from "./Sidebar";
import UserProfilePage from "./UserProfilePage";
import ShowPostPage from "./ShowPostPage";
import PostDetailsPage from "./PostDetailsPage";
import DashboardPage from "./Dashboard";
import ActivityPage from "./ActivityPage";
import WritePostPage from "./WritePostPage";
import NotFoundPage from "../../components/NotFoundPage";
import postData from "./userTestData.js";

function User() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPartiallyHidden, setIsPartiallyHidden] = useState(false);
  const [posts, setPosts] = useState(postData);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return; // Skip path parsing if not authenticated
    const path = window.location.pathname.slice(1) || "dashboard";
    if (path.startsWith("post-details/")) {
      const postId = path.split("/")[2];
      const post = postData.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
        setCurrentPage("postDetails");
      } else {
        setCurrentPage("dashboard");
      }
    } else {
      const validPages = ["dashboard", "show-posts", "write-post", "my-activity", "performance", "settings", "user-profile"];
      setCurrentPage(validPages.includes(path) ? path : "dashboard");
    }
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) setIsPartiallyHidden(false);
  };

  const navigateTo = (page, postId = null) => {
    if (!isAuthenticated) {
      window.history.pushState({}, "", "/not-found");
      return;
    }
    setCurrentPage(page);
    if (postId) {
      window.history.pushState({}, "", `/user_dashboard/post-details/${postId}`);
    } else {
      window.history.pushState({}, "", `/user_dashboard/${page === "dashboard" ? "" : page}`);
    }
  };

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    navigateTo("postDetails", post.id);
  };

  const handleBackToShowPosts = () => {
    setSelectedPost(null);
    navigateTo("show-posts");
  };

  const sidebarNavigation = [
    {
      id: "nav-dashboard",
      name: "Dashboard",
      href: "/user_dashboard",
      icon: "HomeIcon",
      action: () => navigateTo("dashboard"),
    },
    {
      id: "nav-posts-action",
      name: "Posts Action",
      icon: "PencilSquareIcon",
      children: [
        {
          id: "nav-write-post",
          name: "Write Post or Something",
          href: "/user_dashboard/write-post",
          icon: "PencilSquareIcon",
          action: () => navigateTo("write-post"),
        },
        {
          id: "nav-show-posts",
          name: "Show Posts",
          href: "/user_dashboard/show-posts",
          icon: "EyeIcon",
          action: () => navigateTo("show-posts"),
        },
        {
          id: "page-not-found",
          name: "Page Not Found",
          href: "/not-found",
          icon: "ExclamationCircleIcon",
          action: () => window.history.pushState({}, "", "/not-found"),
        },
      ],
    },
    {
      id: "nav-my-activity",
      name: "My Activity",
      href: "/user_dashboard/my-activity",
      icon: "BoltIcon",
      action: () => navigateTo("my-activity"),
    },
    {
      id: "nav-performance",
      name: "Performance",
      href: "/user_dashboard/performance",
      icon: "ChartBarIcon",
      action: () => navigateTo("performance"),
    },
    {
      id: "nav-settings",
      name: "Settings",
      href: "/user_dashboard/settings",
      icon: "Cog6ToothIcon",
      action: () => navigateTo("settings"),
    },
    {
      id: "nav-user-profile",
      name: "User Profile",
      href: "/user_dashboard/user-profile",
      icon: "UserCircleIcon",
      action: () => navigateTo("user-profile"),
    },
  ];

  const renderPage = () => {
    if (!isAuthenticated) {
      return <NotFoundPage />;
    }

    switch (currentPage) {
      case "dashboard":
        return <DashboardPage navigateTo={navigateTo} />;
      case "show-posts":
        return <ShowPostPage posts={posts} onPostSelect={handlePostSelect} />;
      case "postDetails":
        return <PostDetailsPage post={selectedPost} onBack={handleBackToShowPosts} />;
      case "user-profile":
        return <UserProfilePage />;
      case "write-post":
        return (
          <WritePostPage
            onSave={(newPostContent) => {
              const newId = (posts.length > 0 ? Math.max(...posts.map(p => parseInt(p.id))) + 1 : 1).toString();
              const newPost = {
                id: newId,
                title: newPostContent.title || "Untitled Post",
                status: "Draft",
                description: newPostContent.content.substring(0, Math.min(newPostContent.content.length, 100)) + (newPostContent.content.length > 100 ? "..." : ""),
                deadline: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
                issues: 0,
                assignees: [],
                content: newPostContent.content,
              };
              setPosts(prevPosts => [newPost, ...prevPosts]);
              navigateTo("show-posts");
            }}
            onCancel={() => navigateTo("show-posts")}
          />
        );
      case "my-activity":
        return <ActivityPage navigateTo={navigateTo} />;
      case "performance":
        return <div className="p-8 text-2xl">Performance Page Content Area</div>;
      case "settings":
        return <div className="p-8 text-2xl">Settings Page Content Area</div>;
      default:
        return <NotFoundPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen mt-10 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        isPartiallyHidden={isPartiallyHidden}
        toggleSidebar={toggleSidebar}
        setPartiallyHidden={setIsPartiallyHidden}
        navigationItems={sidebarNavigation}
        currentPage={`/${currentPage}`}
        navigateTo={navigateTo}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

User.propTypes = {
  // No props are passed to User component, but defining for completeness
};

export default User;



