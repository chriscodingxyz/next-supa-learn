import { createAdmin } from "@/utils/supabase/server";
import "server-only";

// export async function getServerAuthUser() {
//   const supabase = createAdmin();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return user
// }

export async function getServerAuthUser() {
  const supabaseAdmin = createAdmin();
  
  try {
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser();
    
    return user;
  } catch (error) {
    // Optional: Handle specific error cases
    console.error('Auth error:', error);
    return null;
  }
}

