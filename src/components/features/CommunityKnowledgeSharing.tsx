import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Heart, Users, TrendingUp, AlertTriangle, Info, Sprout } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  title_bn?: string;
  content: string;
  content_bn?: string;
  category: "tips" | "news" | "pest_alert" | "market_info" | "general";
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: {
    full_name: string;
    business_name?: string;
    role: string;
  };
}

const categoryIcons = {
  tips: Sprout,
  news: Info,
  pest_alert: AlertTriangle,
  market_info: TrendingUp,
  general: MessageSquare,
};

const categoryColors = {
  tips: "bg-success text-success-foreground",
  news: "bg-primary text-primary-foreground", 
  pest_alert: "bg-destructive text-destructive-foreground",
  market_info: "bg-warning text-warning-foreground",
  general: "bg-secondary text-secondary-foreground",
};

export const CommunityKnowledgeSharing = () => {
  const { t, language } = useLanguage();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    title_bn: "",
    content: "",
    content_bn: "",
    category: "general" as const,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles!community_posts_author_id_fkey (full_name, business_name, role)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts((data || []) as CommunityPost[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!user || !newPost.title || !newPost.content) {
      toast({
        title: t("Missing Information", "তথ্য অনুপস্থিত"),
        description: t("Please fill in all required fields", "অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন"),
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          author_id: user.id,
          title: newPost.title,
          title_bn: newPost.title_bn || null,
          content: newPost.content,
          content_bn: newPost.content_bn || null,
          category: newPost.category,
        });

      if (error) {
        throw error;
      }

      toast({
        title: t("Post Created!", "পোস্ট তৈরি হয়েছে!"),
        description: t("Your knowledge has been shared with the community", "আপনার জ্ঞান কমিউনিটির সাথে শেয়ার করা হয়েছে"),
      });

      setNewPost({
        title: "",
        title_bn: "",
        content: "",
        content_bn: "",
        category: "general",
      });
      setShowCreateForm(false);
      fetchPosts(); // Refresh posts
    } catch (error: any) {
      toast({
        title: t("Error", "ত্রুটি"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      tips: { en: "Farming Tips", bn: "কৃষি টিপস" },
      news: { en: "News", bn: "সংবাদ" },
      pest_alert: { en: "Pest Alert", bn: "পোকামাকড় সতর্কতা" },
      market_info: { en: "Market Info", bn: "বাজার তথ্য" },
      general: { en: "General", bn: "সাধারণ" },
    };
    return labels[category as keyof typeof labels]?.[language] || category;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            {t("Community Knowledge Sharing", "কমিউনিটি জ্ঞান শেয়ারিং")}
          </h2>
        </div>
        {user && (
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant={showCreateForm ? "outline" : "default"}
          >
            {showCreateForm 
              ? t("Cancel", "বাতিল") 
              : t("Share Knowledge", "জ্ঞান শেয়ার করুন")
            }
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("Share Your Knowledge", "আপনার জ্ঞান শেয়ার করুন")}
            </CardTitle>
            <CardDescription>
              {t("Help other farmers with your experience and insights", "আপনার অভিজ্ঞতা এবং অন্তর্দৃষ্টি দিয়ে অন্য কৃষকদের সাহায্য করুন")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">{t("Title (English)", "শিরোনাম (ইংরেজি)")}</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder={t("Enter title in English", "ইংরেজিতে শিরোনাম লিখুন")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title_bn">{t("Title (Bangla)", "শিরোনাম (বাংলা)")}</Label>
                <Input
                  id="title_bn"
                  value={newPost.title_bn}
                  onChange={(e) => setNewPost({ ...newPost, title_bn: e.target.value })}
                  placeholder={t("Enter title in Bangla", "বাংলায় শিরোনাম লিখুন")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t("Category", "বিভাগ")}</Label>
              <Select value={newPost.category} onValueChange={(value: any) => setNewPost({ ...newPost, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tips">{getCategoryLabel("tips")}</SelectItem>
                  <SelectItem value="news">{getCategoryLabel("news")}</SelectItem>
                  <SelectItem value="pest_alert">{getCategoryLabel("pest_alert")}</SelectItem>
                  <SelectItem value="market_info">{getCategoryLabel("market_info")}</SelectItem>
                  <SelectItem value="general">{getCategoryLabel("general")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content">{t("Content (English)", "বিষয়বস্তু (ইংরেজি)")}</Label>
                <Textarea
                  id="content"
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder={t("Share your knowledge in English", "ইংরেজিতে আপনার জ্ঞান শেয়ার করুন")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_bn">{t("Content (Bangla)", "বিষয়বস্তু (বাংলা)")}</Label>
                <Textarea
                  id="content_bn"
                  rows={4}
                  value={newPost.content_bn}
                  onChange={(e) => setNewPost({ ...newPost, content_bn: e.target.value })}
                  placeholder={t("Share your knowledge in Bangla", "বাংলায় আপনার জ্ঞান শেয়ার করুন")}
                />
              </div>
            </div>

            <Button onClick={createPost} className="w-full">
              {t("Share with Community", "কমিউনিটির সাথে শেয়ার করুন")}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="text-center p-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t("No Posts Yet", "এখনো কোন পোস্ট নেই")}
            </h3>
            <p className="text-muted-foreground">
              {t("Be the first to share your farming knowledge!", "আপনার কৃষি জ্ঞান শেয়ার করার প্রথম ব্যক্তি হন!")}
            </p>
          </Card>
        ) : (
          posts.map((post) => {
            const CategoryIcon = categoryIcons[post.category];
            const title = language === "bn" && post.title_bn ? post.title_bn : post.title;
            const content = language === "bn" && post.content_bn ? post.content_bn : post.content;

            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={categoryColors[post.category]}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {getCategoryLabel(post.category)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {title}
                      </CardTitle>
                      <CardDescription>
                        {t("By", "দ্বারা")} {post.profiles.business_name || post.profiles.full_name} •{" "}
                        <span className="capitalize">
                          {t(
                            post.profiles.role === "farmer" ? "Farmer" : "Retailer",
                            post.profiles.role === "farmer" ? "কৃষক" : "খুচরা বিক্রেতা"
                          )}
                        </span> •{" "}
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    {content}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};