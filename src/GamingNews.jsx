import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Moon, Sun, Search, Gamepad, Newspaper, User, ArrowLeft } from "lucide-react";

export default function GamingNews() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=gaming&apiKey=61e373da738b45fc9b3c7ed066a7805d")
      .then((res) => res.json())
      .then((data) => {
        const formattedArticles = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description,
          content: article.content,
          image: article.urlToImage || "https://source.unsplash.com/400x250/?gaming",
          url: article.url,
        }));
        setArticles(formattedArticles);
      });
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <header className="p-5 flex justify-between items-center shadow-lg bg-blue-600 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Gamepad /> Techno Player News
        </h1>
        <div className="flex gap-4">
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          <Button>
            <Youtube className="mr-2" /> YouTube Channel
          </Button>
        </div>
      </header>

      <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
        <div className="flex gap-4">
          <Button variant="outline">
            <Newspaper className="mr-2" /> Latest News
          </Button>
          <Button variant="outline">
            <Gamepad className="mr-2" /> Reviews
          </Button>
          <Button variant="outline">
            <User className="mr-2" /> Community
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button variant="outline">
            <Search className="mr-2" /> Search
          </Button>
        </div>
      </nav>

      <main className="p-5">
        {selectedArticle ? (
          <div>
            <Button onClick={() => setSelectedArticle(null)} className="mb-4">
              <ArrowLeft className="mr-2" /> Back to News
            </Button>
            <img src={selectedArticle.image} alt="News" className="w-full h-60 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{selectedArticle.title}</h2>
            <p className="text-lg mt-2">{selectedArticle.content}</p>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read Full Article</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Card key={article.id} className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={article.image}
                    alt="News Thumbnail"
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <p className="text-sm mt-2">{article.description}</p>
                    <Button className="mt-3 w-full" onClick={() => setSelectedArticle(article)}>
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No news found.</p>
            )}
          </div>
        )}
      </main>

      <footer className="p-4 text-center bg-gray-300 dark:bg-gray-700 mt-5">
        © 2025 Techno Player News - All Rights Reserved
      </footer>
    </div>
  );
}
