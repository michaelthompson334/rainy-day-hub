import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAiChat } from "@/hooks/useAiChat";
import { useFavorites } from "@/hooks/useFavorites";
import type { ExternalLink as ExternalLinkType, TabCategory } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  BookOpen,
  Bot,
  Camera,
  ExternalLink,
  Globe,
  Loader2,
  LogIn,
  Music,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const LINKS: ExternalLinkType[] = [
  {
    id: "1",
    title: "Rainy Day Reads: A Curated Book List",
    description:
      "Explore the beauty and solace of rainy days through carefully selected fiction, poetry, and memoir.",
    url: "https://www.goodreads.com/list/show/20.Best_Books_to_Read_on_a_Rainy_Day",
    category: "articles",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Books", "Cozy"],
  },
  {
    id: "2",
    title: "The Science of Petrichor",
    description:
      "Why rain smells so good — the fascinating chemistry behind that earthy, calming scent after rainfall.",
    url: "https://www.nationalgeographic.com/science/article/petrichor",
    category: "articles",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Science", "Nature"],
  },
  {
    id: "3",
    title: "Cozy Film Recommendations for Indoor Days",
    description:
      "The ultimate watchlist for curling up with a blanket when the rain won't stop.",
    url: "https://letterboxd.com/film/lists/",
    category: "articles",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Film", "Indoor"],
  },
  {
    id: "4",
    title: "Monochrome Moods: Rainy Day Photography",
    description:
      "A stunning collection of fine art photography capturing the quiet drama of rain and overcast skies.",
    url: "https://unsplash.com/s/photos/rain",
    category: "photography",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Fine Art", "Monochrome"],
  },
  {
    id: "5",
    title: "Rain Through Glass — Street Photography",
    description:
      "Blurred cityscapes and bokeh streetlights seen through rain-streaked windows by photographers worldwide.",
    url: "https://500px.com/search?q=rain&type=photos",
    category: "photography",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Street", "Urban"],
  },
  {
    id: "6",
    title: "Ambient Soundscapes: Thunder & Rain Mix",
    description:
      "Binaural rain, distant thunder, and café ambient noise — perfect for focus or falling asleep.",
    url: "https://mynoise.net/NoiseMachines/rainNoise.php",
    category: "sounds",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Ambient", "Focus"],
  },
  {
    id: "7",
    title: "Rainy Jazz: 3-Hour Coffee Shop Playlist",
    description:
      "Smooth jazz piano and soft bass — the definitive soundtrack for a rainy afternoon indoors.",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
    category: "sounds",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Jazz", "Playlist"],
  },
  {
    id: "8",
    title: "Rain World — Atmospheric Indie Game",
    description:
      "An award-winning survival game set in a beautifully bleak, rain-soaked ecosystem. Hauntingly atmospheric.",
    url: "https://store.steampowered.com/app/312520/Rain_World/",
    category: "resources",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Gaming", "Indie"],
  },
  {
    id: "9",
    title: "Rainy Day Recipes: Soups & Stews",
    description:
      "Warm your soul with 20 hearty recipes crafted for cold, grey afternoons — from classic ramen to Tuscan soup.",
    url: "https://www.seriouseats.com/soul-warming-soups",
    category: "resources",
    imageUrl: "/assets/generated/rainy-window-hero.dim_1400x700.jpg",
    tags: ["Recipes", "Comfort Food"],
  },
];

type ExtendedTab = TabCategory | "favorites";

const TAB_CONFIG: {
  value: TabCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "articles",
    label: "Articles",
    icon: <BookOpen className="w-3.5 h-3.5" />,
  },
  {
    value: "photography",
    label: "Photography",
    icon: <Camera className="w-3.5 h-3.5" />,
  },
  { value: "sounds", label: "Sounds", icon: <Music className="w-3.5 h-3.5" /> },
  {
    value: "resources",
    label: "Resources",
    icon: <Globe className="w-3.5 h-3.5" />,
  },
];

interface LinkCardProps {
  link: ExternalLinkType;
  index: number;
  isFavorited: boolean;
  isAuthenticated: boolean;
  onStarClick: () => void;
}

function LinkCard({
  link,
  index,
  isFavorited,
  isAuthenticated,
  onStarClick,
}: LinkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card
        className="group overflow-hidden border-border bg-card hover:border-accent/40 transition-smooth cursor-pointer"
        data-ocid={`links.item.${index + 1}`}
      >
        <CardContent className="p-0">
          <div className="flex gap-0">
            <div className="w-24 h-24 shrink-0 overflow-hidden">
              <img
                src={link.imageUrl || "/assets/images/placeholder.svg"}
                alt={link.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
              <div className="flex items-start gap-2 min-w-0">
                <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-200 flex-1 min-w-0">
                  {link.title}
                </h3>
                <button
                  type="button"
                  onClick={onStarClick}
                  aria-label={
                    isAuthenticated
                      ? isFavorited
                        ? "Remove from favorites"
                        : "Add to favorites"
                      : "Log in to save favorites"
                  }
                  data-ocid={`links.favorite_button.${index + 1}`}
                  className={`shrink-0 transition-colors duration-200 mt-0.5 ${
                    isFavorited
                      ? "text-accent"
                      : "text-muted-foreground/40 hover:text-accent/60"
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${isFavorited ? "fill-accent" : ""}`}
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 font-body leading-relaxed">
                {link.description}
              </p>
              <div className="flex items-center justify-between mt-auto gap-2">
                <div className="flex gap-1 flex-wrap">
                  {link.tags?.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-1.5 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  data-ocid={`links.visit_button.${index + 1}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 gap-1 border-accent/30 text-accent hover:bg-accent/10"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ChatPanel() {
  const { messages, sendMessage, isLoading, clearHistory, isAuthenticated } =
    useAiChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasHistory = messages.filter((m) => m.id !== "welcome").length > 0;

  // Scroll to bottom when new messages arrive
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-accent" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm font-body leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm border border-border"
              }`}
              data-ocid={`chat.message.${msg.role}`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div
            className="flex gap-2 justify-start"
            data-ocid="chat.loading_state"
          >
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="bg-muted border border-border rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" />
              <span className="text-xs text-muted-foreground">
                Rain-Bot is thinking…
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Clear history button — only when logged in and history exists */}
      {isAuthenticated && hasHistory && (
        <div className="px-3 pb-1 flex justify-end">
          <button
            type="button"
            onClick={clearHistory}
            data-ocid="chat.clear_history_button"
            className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-destructive transition-colors duration-200"
            aria-label="Clear chat history"
          >
            <Trash2 className="w-3 h-3" />
            Clear history
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border bg-card/50 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Rain-Bot anything…"
          aria-label="Chat with Rain-Bot"
          className="flex-1 text-sm bg-background border-input focus-visible:ring-accent/50"
          data-ocid="chat.message_input"
          disabled={isLoading}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
          data-ocid="chat.send_button"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<ExtendedTab>("articles");
  const { isAuthenticated, login } = useInternetIdentity();
  const { favorites, isFavorited, toggleFavorite } = useFavorites();

  // Reset to a real tab if user logs out while on Favorites
  useEffect(() => {
    if (!isAuthenticated && activeTab === "favorites") {
      setActiveTab("articles");
    }
  }, [isAuthenticated, activeTab]);

  const filteredLinks =
    activeTab === "favorites"
      ? LINKS.filter((l) => favorites.includes(l.id))
      : LINKS.filter((l) => l.category === activeTab);

  // Show favorites tab when authenticated OR when user has favorites
  const showFavoritesTab = isAuthenticated || favorites.length > 0;

  const handleStarClick = (linkId: string) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    toggleFavorite(linkId);
  };

  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden min-h-[480px] flex items-end"
        data-ocid="hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/generated/rainy-window-hero.dim_1400x700.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-accent border-accent/30 bg-accent/10"
            >
              🌧️ Your rainy day companion
            </Badge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-4">
              The Quiet Rhythm of{" "}
              <span className="text-gradient-accent">Falling Rain.</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Explore curated content, ambient sounds, photography, and
              resources — everything you need to make the most of a cozy rainy
              day.
            </p>
            <Button
              onClick={() => {
                document
                  .getElementById("content")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-display font-semibold px-6"
              data-ocid="hero.explore_button"
            >
              Explore Content
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content + Chat */}
      <section id="content" className="bg-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Tabs + Links */}
            <div className="flex-1 min-w-0">
              <div id="articles" />
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as ExtendedTab)}
                data-ocid="content.tabs"
              >
                <TabsList
                  className={`mb-6 bg-muted/60 border border-border w-full sm:w-auto grid sm:flex ${showFavoritesTab ? "grid-cols-5" : "grid-cols-4"}`}
                >
                  {TAB_CONFIG.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent"
                      data-ocid={`content.${tab.value}_tab`}
                      id={tab.value}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}

                  {/* Favorites tab */}
                  {showFavoritesTab && (
                    <TabsTrigger
                      value="favorites"
                      className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent"
                      data-ocid="content.favorites_tab"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Favorites</span>
                      {favorites.length > 0 && (
                        <span className="hidden sm:inline text-xs bg-accent/20 text-accent rounded-full px-1.5 min-w-[1.25rem] text-center leading-5">
                          {favorites.length}
                        </span>
                      )}
                    </TabsTrigger>
                  )}
                </TabsList>

                {TAB_CONFIG.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="mt-0"
                  >
                    {filteredLinks.length === 0 ? (
                      <div
                        className="text-center py-16 text-muted-foreground"
                        data-ocid="links.empty_state"
                      >
                        <p className="font-body">
                          No content here yet — check back soon!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredLinks.map((link, i) => (
                          <LinkCard
                            key={link.id}
                            link={link}
                            index={i}
                            isFavorited={isFavorited(link.id)}
                            isAuthenticated={isAuthenticated}
                            onStarClick={() => handleStarClick(link.id)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}

                {/* Favorites tab content */}
                {showFavoritesTab && (
                  <TabsContent value="favorites" className="mt-0">
                    {filteredLinks.length === 0 ? (
                      <div
                        className="text-center py-16"
                        data-ocid="favorites.empty_state"
                      >
                        {isAuthenticated ? (
                          <>
                            <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="font-body text-muted-foreground mb-1">
                              No favorites yet
                            </p>
                            <p className="text-sm text-muted-foreground/60">
                              Click the ☆ star on any link to save it here.
                            </p>
                          </>
                        ) : (
                          <>
                            <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="font-body text-muted-foreground mb-3">
                              Log in to save and see your favorites
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={login}
                              data-ocid="favorites.login_button"
                              className="gap-2 border-accent/30 text-accent hover:bg-accent/10"
                            >
                              <LogIn className="w-4 h-4" />
                              Log in
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredLinks.map((link, i) => (
                          <LinkCard
                            key={link.id}
                            link={link}
                            index={i}
                            isFavorited={isFavorited(link.id)}
                            isAuthenticated={isAuthenticated}
                            onStarClick={() => handleStarClick(link.id)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* AI Chat Panel */}
            <aside
              id="chat"
              className="w-full lg:w-80 xl:w-96 shrink-0 sticky top-20"
              data-ocid="chat.panel"
            >
              <Card className="border-border bg-card shadow-elevated overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-card flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-display font-semibold text-sm text-foreground">
                    Ask Rain-Bot
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs text-accent border-accent/30 bg-accent/10"
                  >
                    AI
                  </Badge>
                </div>
                <div className="h-80 flex flex-col">
                  <ChatPanel />
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* Photography section anchor */}
      <div id="photography" />
      <div id="sounds" />
      <div id="resources" />

      {/* About section */}
      <section className="bg-muted/30 border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
              Made for Rainy Days
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base max-w-2xl mx-auto">
              Rainy Day Hub is your one-stop destination for everything cozy.
              Browse curated articles, discover stunning photography, find
              ambient sounds, and chat with Rain-Bot — our AI companion that
              knows everything about making the most of grey skies.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
