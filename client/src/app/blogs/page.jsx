"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import blogPosts from "@/sampleData/blogData";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <div className="border-b border-border">
        <div className="w-full sm:w-4/5 mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">
            Story shared by happy riders!
          </h1>
          <p className="text-muted-foreground text-center sm:text-left">
            Discover amazing motorcycle adventures across India
          </p>
        </div>
      </div>

      <div className="w-full sm:w-4/5 mx-auto px-4 py-8">
        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col sm:flex-row gap-6 group cursor-pointer border-b border-border pb-6"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-full sm:w-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 sm:h-40 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Badge className={`mb-3 text-xs ${post.categoryColor}`}>
                  {post.category}
                </Badge>

                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <span>By {post.author}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
