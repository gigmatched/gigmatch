export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="mb-8">The page you're looking for doesn't exist.</p>
          <a 
            href="/blog" 
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Return to Blog
          </a>
        </div>
      </div>
    );
  }