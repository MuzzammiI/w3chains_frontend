const postData = [
  {
    id: 1,
    title: "Adoddle Project Alpha",
    status: "Completed",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    deadline: "05 APRIL 2023",
    issues: 14,
    assignees: [
      {
        id: "a1",
        avatar: "https://via.placeholder.com/30/FFAF00/FFFFFF?Text=U1",
      },
      {
        id: "a2",
        avatar: "https://via.placeholder.com/30/FF70AB/FFFFFF?Text=U2",
      },
      {
        id: "a3",
        avatar: "https://via.placeholder.com/30/9B2C6F/FFFFFF?Text=U3",
      },
    ],
    content:
      "Detailed content for Adoddle Project Alpha. This project involved several key milestones and collaboration across multiple teams. The primary objective was to deliver a scalable solution for task management. Challenges included integrating legacy systems and ensuring data consistency. The team successfully navigated these hurdles, delivering the project on time and within budget. Key learnings will be applied to future endeavors.",
  },
  {
    id: 2,
    title: "Web3 Integration Beta",
    status: "In Progress",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    deadline: "15 MAY 2023",
    issues: 8,
    assignees: [
      {
        id: "b1",
        avatar: "https://via.placeholder.com/30/00C4A3/FFFFFF?Text=U4",
      },
      {
        id: "b2",
        avatar: "https://via.placeholder.com/30/6A0DAD/FFFFFF?Text=U5",
      },
    ],
    content:
      "The Web3 Integration Beta phase is focusing on smart contract deployment and testing. We are exploring various blockchain platforms to identify the most suitable one for our needs. Security audits are paramount and will be conducted rigorously. User feedback from the alpha phase has been incorporated to refine the user interface and experience. We anticipate a successful beta launch next month.",
  },
  {
    id: 3,
    title: "Marketing Campaign Q2",
    status: "Completed",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    deadline: "30 MARCH 2023",
    issues: 5,
    assignees: [
      {
        id: "c1",
        avatar: "https://via.placeholder.com/30/FF0000/FFFFFF?Text=U6",
      },
      {
        id: "c2",
        avatar: "https://via.placeholder.com/30/00FF00/000000?Text=U7",
      },
      {
        id: "c3",
        avatar: "https://via.placeholder.com/30/0000FF/FFFFFF?Text=U8",
      },
      {
        id: "c4",
        avatar: "https://via.placeholder.com/30/FFFF00/000000?Text=U9",
      },
    ],
    content:
      "The Q2 Marketing Campaign exceeded all its targets, achieving a 25% increase in lead generation and a 15% growth in social media engagement. The campaign focused on targeted digital advertising and influencer collaborations. A detailed post-campaign analysis is available, highlighting key successes and areas for future improvement. The team's innovative approach was a significant factor in this success.",
  },
  {
    id: 4,
    title: "UI/UX Redesign Initiative",
    status: "Planning",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    deadline: "10 JUNE 2023",
    issues: 22,
    assignees: [
      {
        id: "d1",
        avatar: "https://via.placeholder.com/30/4A5568/FFFFFF?Text=U10",
      },
    ],
    content:
      "The UI/UX Redesign Initiative is currently in the planning and research phase. We are conducting user interviews and competitive analysis to inform our design decisions. The goal is to create a more intuitive, accessible, and visually appealing user experience across all our platforms. Wireframes and mockups will be developed in the coming weeks for stakeholder review.",
  },
  {
    id: 5,
    title: "Backend Optimization Project",
    status: "Completed",
    description:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    deadline: "01 FEBRUARY 2023",
    issues: 3,
    assignees: [
      {
        id: "e1",
        avatar: "https://via.placeholder.com/30/7B341E/FFFFFF?Text=U11",
      },
      {
        id: "e2",
        avatar: "https://via.placeholder.com/30/D69E2E/FFFFFF?Text=U12",
      },
    ],
    content:
      "The Backend Optimization Project successfully reduced server response times by an average of 40% and improved database query efficiency. This was achieved through code refactoring, infrastructure upgrades, and implementing new caching strategies. The improvements have led to a noticeable enhancement in overall application performance and stability.",
  },
  {
    id: 6,
    title: "New Feature Rollout: Analytics Dashboard",
    status: "In Progress",
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    deadline: "25 MAY 2023",
    issues: 12,
    assignees: [
      {
        id: "f1",
        avatar: "https://via.placeholder.com/30/38A169/FFFFFF?Text=U13",
      },
      {
        id: "f2",
        avatar: "https://via.placeholder.com/30/3182CE/FFFFFF?Text=U14",
      },
      {
        id: "f3",
        avatar: "https://via.placeholder.com/30/805AD5/FFFFFF?Text=U15",
      },
    ],
    content:
      "Development of the new Analytics Dashboard is progressing well. Key features include real-time data visualization, customizable reports, and integration with existing data sources. User testing is scheduled for next week, and we are on track for the planned rollout. This dashboard will provide valuable insights for our users to make data-driven decisions.",
  },
];



export default postData;
