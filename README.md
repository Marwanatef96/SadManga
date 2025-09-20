<!-- @format -->

# 📚 SAD MANGA - Modern Manga Reading Platform

A sophisticated, responsive React-based manga reading application that provides an immersive and user-friendly experience for manga enthusiasts. Built with modern web technologies and featuring a beautiful, customizable interface.

## 🌟 Project Overview

**SAD MANGA** is a full-stack manga reading platform that allows users to browse, search, and read manga with advanced features like bookmarking, reading history, and responsive design. The application integrates with the MangaDex API to provide access to a vast library of manga content.

### Key Features

-   🔍 **Advanced Search & Filtering** - Search by title, tags, status, and more
-   📖 **Immersive Reading Experience** - Multiple zoom modes and keyboard navigation
-   📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
-   🌙 **Dark/Light Theme** - Customizable themes with smooth transitions
-   📚 **Personal Library** - Bookmark favorite manga and track reading history
-   ⚡ **Performance Optimized** - Infinite scrolling, lazy loading, and caching
-   🎨 **Modern UI/UX** - Beautiful animations and intuitive interface

### Target Users

-   Manga enthusiasts and readers
-   Web developers interested in React applications
-   Users seeking a modern, feature-rich reading platform

## 🛠️ Tech Stack

### Frontend Technologies

-   **React 18.3.1** - Modern React with hooks and functional components
-   **Material-UI (MUI) 7.3.1** - Comprehensive UI component library
-   **React Router DOM 7.8.2** - Client-side routing and navigation
-   **TanStack React Query 5.87.4** - Data fetching, caching, and state management
-   **Zustand 5.0.8** - Lightweight state management for client-side data
-   **Framer Motion 12.23.12** - Advanced animations and transitions
-   **Axios 1.11.0** - HTTP client for API requests

### UI/UX Libraries

-   **Swiper 11.2.10** - Touch slider for manga galleries
-   **React Infinite Scroll Component 6.1.0** - Infinite scrolling for large lists
-   **React Hook Form 7.62.0** - Form handling and validation
-   **React Select 5.10.2** - Advanced select components
-   **React Window 1.8.11** - Virtualization for performance
-   **React Intersection Observer 9.16.0** - Intersection observer hooks

### Development Tools

-   **React Scripts 5.0.1** - Build tooling and development server
-   **ESLint** - Code linting and quality assurance
-   **Node.js** - Runtime environment
-   **NPM** - Package management

### Backend & API

-   **Express.js** - Backend server framework
-   **CORS** - Cross-origin resource sharing
-   **MangaDex API** - Primary data source for manga content
-   **Railway** - Deployment platform

## 🚀 Setup Instructions

### Prerequisites

-   Node.js (v16 or higher)
-   NPM or Yarn package manager
-   Git

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd main-project
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Install backend dependencies**

    ```bash
    cd backend
    npm install
    cd ..
    ```

4. **Start the development servers**

    **Option 1: Start both frontend and backend**

    ```bash
    npm run start
    ```

    **Option 2: Start separately**

    ```bash
    # Terminal 1 - Backend
    cd backend
    npm start

    # Terminal 2 - Frontend
    npm start
    ```

5. **Access the application**
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:8080`

### Production Build

1. **Build the frontend**

    ```bash
    npm run build
    ```

2. **The build files will be in the `build/` directory**

3. **Deploy the backend with the build files**
    ```bash
    cd backend
    # The backend serves the frontend build files
    npm start
    ```

## 📁 Folder Structure

```
main-project/
├── public/                     # Static assets
│   ├── index.html             # Main HTML template
│   ├── favicon.ico            # Site icon
│   └── manifest.json          # PWA manifest
├── src/                       # Source code
│   ├── api/                   # API layer
│   │   ├── client.js          # Axios configuration
│   │   └── mangaApi.js        # Manga API functions
│   ├── common/                # Shared components
│   │   ├── AppNavBar/         # Navigation components
│   │   │   ├── AppNavBar.js   # Main navigation
│   │   │   ├── SearchBar/     # Search functionality
│   │   │   └── SideBar/       # Sidebar components
│   │   ├── Appfooter/         # Footer components
│   │   ├── ScrollToTop.js     # Scroll utilities
│   │   └── Tooltip.js         # Custom tooltip component
│   ├── hooks/                 # Custom React hooks
│   │   └── useManga.js        # Manga data hooks
│   ├── Pages/                 # Page components
│   │   ├── MainPage/          # Home page components
│   │   │   ├── HomePage.js    # Main landing page
│   │   │   ├── latest/        # Latest manga section
│   │   │   └── Popular/       # Popular manga section
│   │   ├── InfoPage/          # Manga details page
│   │   ├── ReaderPage/        # Manga reading page
│   │   ├── AdvancedSearch/    # Search and filter page
│   │   └── NotFoundPage.js    # 404 error page
│   ├── Store/                 # State management
│   │   ├── BookmarkStore.js   # Bookmark state
│   │   ├── ReadStore.js       # Reading history state
│   │   ├── SearchStore.js     # Search history state
│   │   └── ThemeStore.js      # Theme state
│   ├── theme/                 # Theme configuration
│   │   └── theme.js           # MUI theme setup
│   ├── logos/                 # Logo assets
│   ├── App.js                 # Main app component
│   ├── index.js               # App entry point
│   └── index.css              # Global styles
├── backend/                   # Backend server
│   ├── server.js              # Express server
│   └── package.json           # Backend dependencies
├── build/                     # Production build files
├── package.json               # Frontend dependencies
└── README.md                  # This file
```

## 🎯 Features & Functionality

### 🔍 Search & Discovery

-   **Live Search**: Real-time search with debounced input
-   **Advanced Filtering**: Filter by tags, status, and sort options
-   **Search History**: Track and manage previous searches
-   **Infinite Scroll**: Seamless loading of search results

### 📖 Reading Experience

-   **Multiple Zoom Modes**: Fit width, fit height, and original size
-   **Keyboard Navigation**: Arrow keys for chapter navigation
-   **Page Controls**: Previous/next chapter buttons
-   **Reading Progress**: Visual indicators and progress tracking
-   **Responsive Images**: Optimized image loading with different sizes

### 📚 Personal Library

-   **Bookmarking System**: Save favorite manga for quick access
-   **Reading History**: Track read chapters with timestamps
-   **Searchable Library**: Find bookmarked manga quickly
-   **Persistent Storage**: Data saved in browser localStorage

### 🎨 User Interface

-   **Dark/Light Themes**: Toggle between themes with smooth transitions
-   **Responsive Design**: Optimized for all screen sizes
-   **Modern Animations**: Smooth transitions and micro-interactions
-   **Accessibility**: ARIA labels and keyboard navigation support

### 📱 Mobile Features

-   **Touch Gestures**: Swipe navigation for mobile devices
-   **Responsive Sidebars**: Collapsible navigation for small screens
-   **Mobile-Optimized UI**: Touch-friendly buttons and controls
-   **Progressive Web App**: Installable on mobile devices

## 🎮 Usage Instructions

### Navigation

1. **Home Page**: Browse popular and latest manga
2. **Search**: Use the search bar for quick title searches
3. **Advanced Search**: Access `/tags` for detailed filtering
4. **Library**: Click the library button to access bookmarks
5. **History**: View reading history in the sidebar

### Reading Manga

1. **Select Manga**: Click on any manga card to view details
2. **Choose Chapter**: Select a chapter from the chapter list
3. **Reading Controls**:
    - Use arrow keys or buttons to navigate chapters
    - Adjust zoom mode from the dropdown
    - Use scroll to navigate pages
4. **Bookmark**: Click the bookmark icon to save manga

### Mobile Usage

1. **Touch Navigation**: Swipe left/right to navigate chapters
2. **Sidebar Access**: Tap the menu icon for navigation options
3. **Search**: Use the mobile-optimized search interface
4. **Reading**: Pinch to zoom or use zoom controls

### Customization

1. **Theme Toggle**: Click the theme button in the navigation
2. **Zoom Preferences**: Choose your preferred reading zoom mode
3. **Search Filters**: Customize search results with advanced filters

## ⚙️ Customization Options

### Theme Customization

The application supports extensive theme customization through the `src/theme/theme.js` file:

-   **Color Schemes**: Modify primary, secondary, and accent colors
-   **Typography**: Customize fonts and text styles
-   **Component Styling**: Override MUI component styles
-   **Dark/Light Modes**: Separate configurations for each theme

### Layout Options

-   **Sidebar Behavior**: Configure sidebar width and behavior
-   **Navigation Layout**: Customize navigation bar appearance
-   **Grid Layouts**: Adjust manga card grid configurations
-   **Responsive Breakpoints**: Modify responsive behavior

### Reading Preferences

-   **Default Zoom Mode**: Set initial zoom preference
-   **Page Loading**: Configure image loading strategies
-   **Keyboard Shortcuts**: Customize keyboard navigation
-   **Animation Settings**: Adjust transition speeds and effects

## 🐛 Known Issues & TODOs

### Current Limitations

-   **API Rate Limiting**: MangaDex API has rate limits that may affect performance
-   **Image Caching**: Limited image caching may cause slower loading
-   **Offline Support**: No offline reading capability
-   **User Accounts**: No user authentication system

### Planned Improvements

-   [ ] **PWA Features**: Add offline support and push notifications
-   [ ] **User Authentication**: Implement user accounts and cloud sync
-   [ ] **Advanced Caching**: Implement service worker for better caching
-   [ ] **Reading Modes**: Add more reading modes (vertical scroll, etc.)
-   [ ] **Social Features**: Add comments and ratings system
-   [ ] **Performance**: Optimize bundle size and loading times
-   [ ] **Accessibility**: Improve screen reader support
-   [ ] **Internationalization**: Add multi-language support

### Technical Debt

-   [ ] **Error Handling**: Improve error boundaries and user feedback
-   [ ] **Testing**: Add comprehensive test coverage
-   [ ] **Documentation**: Add JSDoc comments for better code documentation
-   [ ] **TypeScript**: Consider migrating to TypeScript for better type safety

## 🤝 Contributing

We welcome contributions to improve SAD MANGA! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines

-   **Code Style**: Follow the existing code style and ESLint rules
-   **Testing**: Test your changes on multiple devices and browsers
-   **Documentation**: Update documentation for new features
-   **Performance**: Ensure changes don't negatively impact performance
-   **Accessibility**: Maintain accessibility standards

### Areas for Contribution

-   **Bug Fixes**: Report and fix bugs
-   **New Features**: Add new functionality
-   **UI/UX Improvements**: Enhance the user experience
-   **Performance**: Optimize loading and rendering
-   **Documentation**: Improve code and user documentation
-   **Testing**: Add tests for better reliability

## 📄 License & Credits

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Credits

-   **MangaDex API**: For providing the manga data and content
-   **Material-UI**: For the comprehensive UI component library
-   **React Community**: For the amazing React ecosystem
-   **Open Source Contributors**: For the various libraries and tools used

### Acknowledgments

-   Special thanks to the MangaDex team for providing free access to their API
-   Thanks to all the open-source contributors whose work made this project possible
-   Appreciation to the React and Material-UI communities for excellent documentation and support

### Creator

**Marwan Atef** - Front-end Developer

-   GitHub: [@Marwanatef96](https://github.com/Marwanatef96)
-   LinkedIn: [Marwan Atef](https://www.linkedin.com/in/marwan-atef-dev/)
-   Twitter: [@MarwanAtef10](https://x.com/MarwanAtef10)
-   Email: marwanatef54@gmail.com

---

**Made with ❤️ to showcase modern web development skills and create an amazing manga reading experience.**
