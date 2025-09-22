import { supabase } from "@/integrations/supabase/client";

/**
 * Secure profile utility functions that respect privacy settings
 * and only expose appropriate information based on the relationship
 * between users
 */

// Type for safe public profile information
export interface PublicProfileInfo {
  id: string;
  user_id: string;
  full_name: string;
  business_name: string | null;
  role: 'farmer' | 'retailer' | 'admin';
  location: string | null;
}

// Type for complete profile (only for own profile)
export interface CompleteProfileInfo extends PublicProfileInfo {
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Get the current user's complete profile
 * Returns all profile fields including sensitive information
 */
export const getCurrentUserProfile = async (): Promise<CompleteProfileInfo | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("Error fetching current user profile:", error);
      }
      return null;
    }

    return data as CompleteProfileInfo;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

/**
 * Get public profile information for other users
 * Only returns non-sensitive business information
 */
export const getPublicProfile = async (userId: string): Promise<PublicProfileInfo | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, business_name, role, location")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("Error fetching public profile:", error);
      }
      return null;
    }

    return data as PublicProfileInfo;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

/**
 * Get multiple public profiles for display in lists
 * Only returns non-sensitive business information
 */
export const getPublicProfiles = async (userIds: string[]): Promise<PublicProfileInfo[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, business_name, role, location")
      .in("user_id", userIds);

    if (error) {
      console.error("Error fetching public profiles:", error);
      return [];
    }

    return data as PublicProfileInfo[];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

/**
 * Get profiles by role (for marketplace discovery)
 * Only returns non-sensitive business information
 */
export const getProfilesByRole = async (role: 'farmer' | 'retailer' | 'admin'): Promise<PublicProfileInfo[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, business_name, role, location")
      .eq("role", role);

    if (error) {
      console.error("Error fetching profiles by role:", error);
      return [];
    }

    return data as PublicProfileInfo[];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};