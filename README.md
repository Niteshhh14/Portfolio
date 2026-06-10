# Nitesh Reddy – Developer Portfolio

A modern, high-performance personal portfolio website built to showcase systems exploration, robotics automation, machine learning research, and full-stack development. The UI utilizes dark aesthetics, interactive 3D elements, and glassmorphic designs to create a polished user experience.

---

## ✨ Features

- **Immersive Animations:** Butter-smooth scroll transitions, interactive hovering, and micro-animations powered by Framer Motion.
- **3D Background:** Lightweight, hardware-accelerated WebGL ambient backgrounds using Three.js.
- **Swipeable Project Cards:** A custom-built, gesture-based card stack component for browsing technical projects smoothly.
- **Retro Tetris Preloader:** A nostalgic, interactive Tetris game loop that runs during the initial avatar loading state.
- **Serverless Contact Form:** Fully integrated with EmailJS for seamless, backend-free communication straight to your inbox.
- **Performance Optimized:** Built with Next.js App Router for high-speed page generation and asset optimization.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Library:** React
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **3D/Graphics:** Three.js
- **Deployment:** Vercel

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Niteshhh14/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory. Use the included `.env.example` as a blueprint and add your EmailJS configuration:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new).
Simply import the GitHub repository, add your environment variables during the setup phase, and hit deploy!

---
*Built by [Nitesh Reddy](https://github.com/Niteshhh14).*
