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
      listing_status: {
        Row: {
          created_at: string
          property_id: string
          status: string
        }
        Insert: {
          created_at?: string
          property_id: string
          status: string
        }
        Update: {
          created_at?: string
          property_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_status_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "property"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
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
      property: {
        Row: {
          city: string
          created_at: string
          full_address: string
          id: string
          latitude: number
          locality: string
          longitude: number
          postcode: string
          region: string
          street: string
          street_number: string
        }
        Insert: {
          city: string
          created_at?: string
          full_address: string
          id?: string
          latitude: number
          locality: string
          longitude: number
          postcode: string
          region: string
          street: string
          street_number: string
        }
        Update: {
          city?: string
          created_at?: string
          full_address?: string
          id?: string
          latitude?: number
          locality?: string
          longitude?: number
          postcode?: string
          region?: string
          street?: string
          street_number?: string
        }
        Relationships: []
      }
      property_claim: {
        Row: {
          created_at: string
          id: string
          owner_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          owner_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_claim_id_fkey"
            columns: ["id"]
            referencedRelation: "property"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_claim_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      property_features: {
        Row: {
          baths: number | null
          beds: number | null
          created_at: string
          floor_sqm: number | null
          garage: boolean | null
          id: string
          land_sqm: number | null
          living_areas: number | null
          needs_renovation: boolean | null
          new_build: boolean | null
          ownership_type: string | null
          parking: number | null
          property_type: string | null
        }
        Insert: {
          baths?: number | null
          beds?: number | null
          created_at?: string
          floor_sqm?: number | null
          garage?: boolean | null
          id: string
          land_sqm?: number | null
          living_areas?: number | null
          needs_renovation?: boolean | null
          new_build?: boolean | null
          ownership_type?: string | null
          parking?: number | null
          property_type?: string | null
        }
        Update: {
          baths?: number | null
          beds?: number | null
          created_at?: string
          floor_sqm?: number | null
          garage?: boolean | null
          id?: string
          land_sqm?: number | null
          living_areas?: number | null
          needs_renovation?: boolean | null
          new_build?: boolean | null
          ownership_type?: string | null
          parking?: number | null
          property_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_features_id_fkey"
            columns: ["id"]
            referencedRelation: "property"
            referencedColumns: ["id"]
          }
        ]
      }
      property_pricing: {
        Row: {
          asking_price: number | null
          id: string
          lower_range: number
          upper_range: number
        }
        Insert: {
          asking_price?: number | null
          id: string
          lower_range: number
          upper_range: number
        }
        Update: {
          asking_price?: number | null
          id?: string
          lower_range?: number
          upper_range?: number
        }
        Relationships: [
          {
            foreignKeyName: "property_pricing_id_fkey"
            columns: ["id"]
            referencedRelation: "property"
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
