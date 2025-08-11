# Axia HR Advisory

A modern, responsive website for Axia HR Advisory - Tanzania's leading HR consulting firm.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Comprehensive Services**: Showcase of all HR services offered
- **Multi-Portal System**: Separate portals for candidates, employers, and admins
- **Job Platform**: Integrated job search and posting functionality
- **Performance Optimized**: Fast loading with Vite and React
- **SEO Ready**: Optimized for search engines

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd axioweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Vercel
   - Vercel will automatically detect the Vite configuration

2. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - Configure build settings if required

3. **Deploy**
   - Vercel will automatically build and deploy on every push to main branch

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin portal components
│   ├── candidate/      # Candidate portal components
│   └── employer/       # Employer portal components
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── candidate/      # Candidate pages
│   ├── employer/       # Employer pages
│   └── services/       # Service pages
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Colors
The project uses a custom color scheme defined in `tailwind.config.js`:
- Primary: `#114373` (Dark Blue)
- Secondary: `#4ebf9e` (Teal)
- Accent: `#21446e` (Navy Blue)

### Styling
- All styling is done with Tailwind CSS
- Custom components are in the `components/` directory
- Global styles are in `src/index.css`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌍 Environment Variables

Create a `.env` file in the root directory for any environment variables:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Axia HR Advisory
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, email info@axiahr.com or visit our website.

---

**Axia HR Advisory** - Transforming HR Excellence in Tanzania
