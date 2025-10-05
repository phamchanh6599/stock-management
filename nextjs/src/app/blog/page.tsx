import Link from 'next/link';
import { BlogPost } from '@/types';

async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      id: '1',
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js',
      content: 'Full content here...',
      author: 'John Doe',
      published_date: '2025-01-15',
    },
    {
      id: '2',
      slug: 'understanding-ssg-and-isr',
      title: 'Understanding SSG and ISR',
      content: 'Full content here...',
      author: 'Jane Smith',
      published_date: '2025-01-20',
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.published_date!).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}