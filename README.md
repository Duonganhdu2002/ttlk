# WYD ANHDU - Portfolio & Products

Portfolio website với TikTok product showcase được xây dựng với Next.js 14 và Supabase.

## Features

- 🚀 Next.js 14 với App Router
- 💎 TypeScript cho type safety
- 🎨 Tailwind CSS và animations
- 🛍️ TikTok product showcase với database realtime
- 📱 Responsive design
- 🎬 GSAP animations và smooth scrolling
- 🗄️ Supabase integration
- 🔧 Clean architecture

## Project Structure

```
public/
├── public/              # Static files (images, icons)
├── src/                 # Source code
│   ├── app/             # App Router pages
│   ├── components/      # UI components
│   ├── data/            # Static data & configurations
│   ├── lib/             # Supabase config
│   ├── services/        # API services
│   ├── styles/          # CSS và animations
│   └── types/           # TypeScript types
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-nextjs-app.git
   cd my-nextjs-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Pages & Routes

- `/` - Trang chủ với Hero section và animations
- `/works` - Showcase sản phẩm TikTok từ database
- `/about` - Trang giới thiệu cá nhân
- `/project/[project-name]` - Chi tiết project (optional)

## Deployment to Vercel

### 1. Chuẩn bị project
```bash
# Đảm bảo project build thành công
npm run build

# Commit tất cả changes
git add .
git commit -m "Setup public site for deployment"
git push origin main
```

### 2. Deploy lên Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub account
3. Click "New Project"
4. Import repository này
5. Chọn folder `public/` làm root directory
6. Thêm Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

### 3. Environment Variables cần thiết
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Manual CLI Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Production deployment:
   ```bash
   vercel --prod
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
