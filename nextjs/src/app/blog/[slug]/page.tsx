import { notFound } from 'next/navigation';
import { BlogPost } from '@/types';

// Mock function - replace with actual API
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts: BlogPost[] = [
    {
      id: '1',
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js',
      content: `Next.js is a powerful React framework that enables you to build fast, user-friendly web applications. It provides features like server-side rendering, static site generation, and API routes out of the box.

## Why Next.js?

Next.js simplifies the development process by providing a structured framework with built-in optimizations. You get automatic code splitting, image optimization, and a file-based routing system that makes building applications intuitive and efficient.

## Getting Started

To create a new Next.js app, simply run: npx create-next-app@latest

This will set up everything you need to start building your application.`,
      author: 'John Doe',
      published_date: '2025-01-15',
    },
    {
      id: '2',
      slug: 'understanding-ssg-and-isr',
      title: 'Understanding SSG and ISR',
      content: `Static Site Generation (SSG) and Incremental Static Regeneration (ISR) are powerful features in Next.js that help you build fast, scalable websites.

## Static Site Generation (SSG)

SSG generates HTML at build time. This means your pages are pre-rendered and served as static files, resulting in incredibly fast page loads.

## Incremental Static Regeneration (ISR)

ISR allows you to update static content after deployment without rebuilding the entire site. You can set a revalidation time, and Next.js will regenerate pages in the background.`,
      author: 'Jane Smith',
      published_date: '2025-01-20',
    },
  ];

  return posts.find(p => p.slug === slug) || null;
}

export async function generateStaticParams() {
  return [
    { slug: 'getting-started-with-nextjs' },
    { slug: 'understanding-ssg-and-isr' },
  ];
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>By {post.author}</span>
          <span>•</span>
          <time>{new Date(post.published_date!).toLocaleDateString()}</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-lg shadow-md p-8">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }

            return (
              <p key={idx} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This page uses Incremental Static Regeneration (ISR) and revalidates every 60 seconds.
        </p>
      </div>
    </article>
  );
}