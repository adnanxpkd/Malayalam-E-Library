# Malayalam E-Library 📚

A modern digital library platform dedicated to Malayalam literature and educational resources. Built with Next.js and Firebase to provide seamless access to Malayalam books, documents, and cultural content.

## 🌟 Features

- **Digital Book Collection**: Browse and read Malayalam books online
- **Advanced Search**: Find books by title, author, genre, or keywords
- **User Authentication**: Secure login and personalized reading experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Categories & Genres**: Organized content for easy discovery
- **Reading Interface**: User-friendly reader with customizable settings
- **Bookmarks & Notes**: Save your progress and add personal notes
- **Download Support**: Offline reading capabilities for supported formats

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adnanxpkd/Malayalam-E-Library.git
   cd Malayalam-E-Library
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore Database, and Storage
   - Copy your Firebase configuration

4. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Malayalam-E-Library/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── BookCard.tsx      # Book display component
│   │   ├── SearchBar.tsx     # Search functionality
│   │   └── Navigation.tsx    # Navigation component
│   ├── lib/
│   │   ├── firebase.ts       # Firebase configuration
│   │   └── utils.ts          # Utility functions
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── public/
│   ├── images/               # Static images
│   └── icons/                # App icons
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## 📖 Usage

### For Readers
1. **Browse Books**: Explore the collection by categories or use the search feature
2. **Create Account**: Sign up for personalized features and reading history
3. **Read Online**: Click on any book to start reading in the browser
4. **Bookmark Progress**: Your reading position is automatically saved
5. **Add to Favorites**: Save books you want to read later

### For Administrators
1. **Add Books**: Upload new Malayalam books and documents
2. **Manage Categories**: Organize content by genres and topics
3. **User Management**: Monitor user activity and manage accounts
4. **Content Moderation**: Review and approve user-submitted content

## 🤝 Contributing

We welcome contributions from the Malayalam community! Here's how you can help:

### Content Contributions
- **Books**: Submit Malayalam books (ensure proper copyright permissions)
- **Metadata**: Help improve book descriptions, author information, and categorization
- **Translations**: Assist with interface translations

### Code Contributions
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add appropriate comments for complex logic
- Test your changes before submitting
- Update documentation if needed
- Respect copyright laws when adding content

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Malayalam literary community for their support
- Open source contributors
- Firebase for providing excellent backend services
- Next.js team for the amazing framework

## 📞 Contact & Support

- **Developer**: Adnan
- **GitHub**: [@adnanxpkd](https://github.com/adnanxpkd)
- **Issues**: [Report bugs or request features](https://github.com/adnanxpkd/Malayalam-E-Library/issues)

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced search filters
- [ ] Audio book support
- [ ] Multi-language interface
- [ ] Community features (reviews, ratings)
- [ ] Integration with local libraries
- [ ] Offline reading improvements
- [ ] AI-powered content recommendations

## 🔧 Troubleshooting

### Common Issues

**Build fails with Firebase errors**
- Ensure all environment variables are correctly set
- Check Firebase project configuration
- Verify your Firebase project has the required services enabled

**Books not loading**
- Check your internet connection
- Verify Firebase Storage rules
- Ensure book files are properly uploaded

**Authentication issues**
- Check Firebase Authentication configuration
- Verify allowed domains in Firebase console

For more help, please [open an issue](https://github.com/adnanxpkd/Malayalam-E-Library/issues) or check existing issues for solutions.

---

Made with ❤️ for the Malayalam community
