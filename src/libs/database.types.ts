export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      finds: {
        Row: {
          created_at: string
          id: string
          place: string
          rating: number
          review: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          place: string
          rating: number
          review: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          place?: string
          rating?: number
          review?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finds_place_fkey"
            columns: ["place"]
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finds_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      places: {
        Row: {
          country: string | null
          created_at: string
          full_address: string
          hashed_mapbox_id: string
          id: string
          lat: number
          lng: number
          locality: string | null
          name: string
          postcode: string | null
          region: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          full_address: string
          hashed_mapbox_id: string
          id?: string
          lat: number
          lng: number
          locality?: string | null
          name: string
          postcode?: string | null
          region?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          full_address?: string
          hashed_mapbox_id?: string
          id?: string
          lat?: number
          lng?: number
          locality?: string | null
          name?: string
          postcode?: string | null
          region?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string
          description: string | null
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          username: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
