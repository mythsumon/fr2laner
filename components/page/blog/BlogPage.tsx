"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  status: "published" | "draft";
  content?: string;
  image?: string;
}

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Load blog posts from localStorage (set by Admin CMS)
    if (typeof window !== "undefined") {
      const storedPosts = localStorage.getItem("cms_blog_posts");
      if (storedPosts) {
        try {
          const parsedPosts = JSON.parse(storedPosts);
          // Only show published posts
          const publishedPosts = parsedPosts.filter((p: BlogPost) => p.status === "published");
          setPosts(publishedPosts);
        } catch (e) {
          console.warn("Failed to parse blog posts from localStorage", e);
          setPosts([]);
        }
      } else {
        // Default posts
        setPosts([
          {
            id: 1,
            title: "프리랜서를 위한 마케팅 가이드",
            category: "마케팅",
            date: "2024-03-15",
            status: "published",
          },
        ]);
      }
    }
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">블로그</h1>
          <p className="mt-2 text-lg text-[#64748B]">유용한 팁과 최신 소식을 확인하세요</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#2E5E99] text-white"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
            >
              {category === "all" ? "전체" : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center">
            <p className="text-[#64748B]">게시된 글이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-[#2E5E99]"
              >
                {post.image ? (
                  <div className="relative h-48 w-full overflow-hidden bg-[#F8FAFC]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-[#E9EEF8] to-[#F0F7FF] flex items-center justify-center">
                    <Tag className="size-12 text-[#2E5E99] opacity-50" />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="rounded-full bg-[#E9EEF8] px-2 py-1 font-medium text-[#2E5E99]">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#2E5E99] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#2E5E99]">
                    <span>자세히 보기</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



