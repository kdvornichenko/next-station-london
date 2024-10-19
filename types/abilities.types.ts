import { User } from "@supabase/supabase-js"

export interface AbilityData {
    ability: string
    color: string
    isUsed: boolean
    player?: {
        id?: User['id']
        email?: User['email']
        name?: User['user_metadata']['full_name']
    }
}