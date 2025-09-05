import { useState } from "react";
import PropTypes from "prop-types";
import {
  HomeIcon,
  PencilSquareIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BoltIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"

// Map icon names to their components for dynamic rendering
const iconsMap = {
  HomeIcon,
  PencilSquareIcon,
  EyeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BoltIcon,
  UserCircleIcon,
};

const Sidebar = ({ isOpen, isPartiallyHidden, setPartiallyHidden, navigationItems, currentPage, navigateTo }) => {
  // State to manage which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState("");
  // State to manage hover effect when sidebar is partially hidden
  const [isHovered, setIsHovered] = useState(false);

  // Toggles the dropdown menu for navigation items with children
  const handleToggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? "" : itemName);
  };

  // Handles navigation clicks, either by executing an action or navigating to a page
  const handleNavigationClick = (action, itemName) => {
    if (action) {
      action();
    } else {
      navigateTo(itemName.toLowerCase().replace(/\s+/g, ""));
    }
  };

  // Sets isHovered to true when mouse enters the sidebar,
  // allowing the partially hidden sidebar to expand on hover.
  const handleMouseEnter = () => {
    if (isPartiallyHidden) {
      setIsHovered(true);
    }
  };

  // Sets isHovered to false when mouse leaves the sidebar,
  // collapsing it back to partially hidden state.
  const handleMouseLeave = () => {
    if (isPartiallyHidden) {
      setIsHovered(false);
    }
  };

  // Toggles the partially hidden state of the sidebar (collapse/expand)
  const handleCollapseToggle = () => {
    setPartiallyHidden(!isPartiallyHidden);
  };

  return (
    <div
      // Main sidebar container styling
      // 'relative' is crucial for positioning the absolute toggle button
      // 'h-screen' ensures it takes full viewport height
      // Responsive widths: 'w-16' when collapsed, 'w-64' when expanded (default and on md screens)
      // Transitions for smooth collapse/expand
      // 'fixed inset-y-0 left-0 z-10' for mobile overlay behavior
      // 'md:static md:translate-x-0' for desktop static positioning
      className={`relative flex flex-col h-screen bg-white shadow-lg md:shadow-none print:hidden
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                  ${isPartiallyHidden && !isHovered ? "w-16" : "w-64"}
                  md:w-${isPartiallyHidden ? "16" : "64"}
                  fixed inset-y-0 left-0 z-10 md:static`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Collapse/Expand button - positioned absolutely at the top right */}
      <div className="absolute top-2 right-4 z-20">
        <button
          onClick={handleCollapseToggle}
          className="text-gray-600 hover:text-indigo-600 focus:outline-none"
          aria-label={isPartiallyHidden ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {/* Icon changes based on sidebar state */}
          {isPartiallyHidden ? (
            <CircleArrowLeft className="h-8 w-8 cursor-pointer" /> // Icon when collapsed (pointing right)
          ) : (
            <CircleArrowRight className="h-8 w-8 cursor-pointer" /> // Icon when expanded (pointing left)
          )}
        </button>
      </div>

      {/* Profile Section - Adjusted top margin to accommodate absolute buttons */}
      <div className={`flex items-center px-4 mb-4 mt-12 ${isPartiallyHidden && !isHovered ? "justify-center" : "justify-between"}`}>
        <div className={`flex items-center space-x-2 ${isPartiallyHidden && !isHovered ? "justify-center w-full" : ""}`}>
          <UserCircleIcon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
          <span
            // Text is hidden when partially hidden and not hovered
            className={`text-2xl font-bold text-indigo-600 ${
              isPartiallyHidden && !isHovered ? "hidden" : "block"
            }`}
          >
            Profile
          </span>
        </div>
      </div>

      {/* Navigation section - flex-grow to take available space, overflow-y-auto for scrolling */}
      <nav className="flex-grow overflow-y-auto px-2">
        {navigationItems.map((item) => {
          const IconComponent = iconsMap[item.icon];
          const isActive =
            currentPage === `/${item.name.toLowerCase().replace(/\s+/g, "")}` ||
            (item.children &&
              item.children.some(
                (child) =>
                  currentPage === `/${child.name.toLowerCase().replace(/\s+/g, "")}`
              ));

          return item.children ? (
            // Render a dropdown item if it has children
            <div key={item.id}>
              <button
                onClick={() => handleToggleDropdown(item.name)}
                className={`w-full cursor-pointer flex items-center justify-between space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                } ${isPartiallyHidden && !isHovered ? "justify-center px-2" : ""}`}
              >
                <div
                  className={`flex items-center space-x-3 ${
                    isPartiallyHidden && !isHovered ? "justify-center" : ""
                  }`}
                >
                  {IconComponent && (
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  )}
                  <span
                    // Text is hidden when partially hidden and not hovered
                    className={`font-medium ${
                      isPartiallyHidden && !isHovered ? "hidden" : "block"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {/* Dropdown arrow icon, hidden when collapsed and not hovered */}
                {(!isPartiallyHidden || isHovered) && (
                  <>
                    {openDropdown === item.name ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6" />
                    )}
                  </>
                )}
              </button>
              {/* Render children only if dropdown is open. Text will be hidden if collapsed and not hovered. */}
              {openDropdown === item.name && (
                <div className={`mt-1 space-y-1 ${isPartiallyHidden && !isHovered ? "ml-0 pl-0 border-none" : "ml-4 pl-4 border-l border-gray-200"}`}>
                  {item.children.map((child) => {
                    const ChildIconComponent = iconsMap[child.icon];
                    const isChildActive =
                      currentPage === `/${child.name.toLowerCase().replace(/\s+/g, "")}`;
                    return (
                      <button
                        key={child.id}
                        onClick={() =>
                          handleNavigationClick(child.action, child.name)
                        }
                        className={`w-full cursor-pointer flex items-center py-2 rounded-lg transition-colors duration-150 text-sm ${
                          isChildActive
                            ? "bg-indigo-100 text-indigo-700 font-medium"
                            : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                        } ${isPartiallyHidden && !isHovered ? "justify-center px-2" : "text-left space-x-3 px-3"}`}
                      >
                        {ChildIconComponent && (
                          <ChildIconComponent
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          // Text is hidden when partially hidden and not hovered
                          className={isPartiallyHidden && !isHovered ? "hidden" : "block"}
                        >
                          {child.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            // Render a single navigation item
            <button
              key={item.id}
              onClick={() => handleNavigationClick(item.action, item.name)}
              className={`w-full cursor-pointer text-left flex items-center px-2 space-x-1 py-4 rounded-lg transition-colors duration-150 ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              } ${isPartiallyHidden && !isHovered ? "justify-center px-2" : ""}`}
            >
              {IconComponent && (
                <IconComponent className="h-6 w-6" aria-hidden="true" />
              )}
              <span
                // Text is hidden when partially hidden and not hovered
                className={`font-medium ${
                  isPartiallyHidden && !isHovered ? "hidden" : "block"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPartiallyHidden: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  setPartiallyHidden: PropTypes.func.isRequired,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      href: PropTypes.string, // href can be optional if action is present
      icon: PropTypes.string.isRequired,
      action: PropTypes.func,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          href: PropTypes.string, // href can be optional if action is present
          icon: PropTypes.string.isRequired,
          action: PropTypes.func,
        })
      ),
    })
  ).isRequired,
  currentPage: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default Sidebar;
