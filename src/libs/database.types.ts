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
          description: string | null
          id: string
          place: string
          rating: number
          user_find: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          place: string
          rating: number
          user_find: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          place?: string
          rating?: number
          user_find?: string
        }
        Relationships: [
          {
            foreignKeyName: "finds_place_fkey"
            columns: ["place"]
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finds_user_find_fkey"
            columns: ["user_find"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      places: {
        Row: {
          created_at: string
          id: string
          lat: string
          lng: string
          name: string
          neighborhood: string
        }
        Insert: {
          created_at?: string
          id: string
          lat: string
          lng: string
          name: string
          neighborhood: string
        }
        Update: {
          created_at?: string
          id?: string
          lat?: string
          lng?: string
          name?: string
          neighborhood?: string
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
