import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
    try {
        // Handle file upload (if file is an object and has a URI)
        if (post.file && typeof post.file === 'object') {
            let isImage = post?.file?.type == 'image';
            let folderName = isImage ? 'postImages' : 'postVideos';
            let fileResult = await uploadFile(folderName, post.file.uri, isImage);

            if (fileResult.success) {
                post.file = fileResult.data;  // Update the file path in the post object
            } else {
                return fileResult;  // Return early if file upload fails
            }
        }

        // Upsert post (insert or update)
        const { data, error } = await supabase
            .from('posts')
            .upsert(post)
            .select()
            .single();

        if (error) {
            console.error('createOrUpdatePost error', error);
            return { success: false, msg: 'Could not create or update your post' };
        }

        return { success: true, data };

    } catch (error) {
        console.error('createOrUpdatePost error', error);
        return { success: false, msg: 'Could not create or update your post' };
    }
};

export const fetchPosts = async (limit = 10) => {
    try {
        const {data, error} = await supabase
        .from('posts')
        .select(`
            *,
            user: users (id, name, image),
            postLikes (*),
            comments (count)
        `)
        .order('created_at', {ascending: false})
        .limit(limit);

        if (error) {
            console.error('fetchPosts error', error);
            return { success: false, msg: 'Could not fetch the posts' };
        }

        return {success: true, data: data};

    } catch (error) {
        console.error('fetchPosts error', error);
        return { success: false, msg: 'Could not fetch the posts' };
    }
};

export const fetchPostDetails = async (postId) => {
    try {
        const {data, error} = await supabase
        .from('posts')
        .select(`
            *,
            user: users (id, name, image),
            postLikes (*),
            comments (*, user: users(id, name, image))
        `)
        .eq('id', postId)
        .order('created_at', {ascending:false, foreignTable: 'comments'})
        .single()

        if (error) {
            console.error('fetchPostDetails error', error);
            return { success: false, msg: 'Could not fetch the post' };
        }

        return {success: true, data: data};

    } catch (error) {
        console.error('fetchPostDetails error', error);
        return { success: false, msg: 'Could not fetch the post' };
    }
};

export const createPostLike = async (postLike) => {
    try {
        
        const {data, error} = await supabase
        .from('postLikes')
        .insert(postLike)
        .select()
        .single()

        if (error) {
            console.error('postLike error', error);
            return { success: false, msg: 'Could not like the post' };
        }

        return {success: true, data: data};

    } catch (error) {
        console.error('postLike error', error);
        return { success: false, msg: 'Could not like the post' };
    }
};

export const removePostLike = async (postId, userId) => {
    try {
        
        const {error} = await supabase
        .from('postLikes')
        .delete()
        .eq('userId', userId)
        .eq('postId', postId)

        if (error) {
            console.error('postLike error', error);
            return { success: false, msg: 'Could not remove the post like' };
        }

        return {success: true};

    } catch (error) {
        console.error('postLike error', error);
        return { success: false, msg: 'Could not remove the post like' };
    }
};

export const createComment = async (comment) => {
    try {
        
        const {data, error} = await supabase
        .from('comments')
        .insert(comment)
        .select()
        .single();

        if (error) {
            console.error('comment error', error);
            return { success: false, msg: 'Could not create your comment' };
        }

        return {success: true, data: data};

    } catch (error) {
        console.error('comment error', error);
        return { success: false, msg: 'Could not create your comment' };
    }
};