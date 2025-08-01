import {createSupabaseServerClient} from "@/lib/supabaseServerClient";
import {NextResponse} from "next/server";

export async function POST(req) {
    const formData = await req.formData();
    const name = formData.get('name') || 'Anonymous';
    const content = formData.get('content');
    const postId = formData.get('post_id');
    console.log("sini")

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('comments').insert([
        {
            name,
            content,
            post_id: postId,
            source_app: "ssr-optimized",
        }
    ]);

    if (error) {
        console.error(error);
        return NextResponse.redirect(`${req.headers.get('referer')}?error=true`)
    };

    return NextResponse.redirect(`${req.headers.get('referer')}?success=true`)
}