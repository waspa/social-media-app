import { firebase } from '../lib/Firebase'

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map((user) => user.data().length > 0)
}

export const getUserById = async (userId) => await firebase.firestore()
    .collection('users')
    .doc(userId)
    .get();

export const deletePost = async (docId) => await firebase.firestore()
    .collection('posts')
    .doc(docId)
    .delete();


export const updatePost = async (post) => await firebase.firestore()
    .collection('posts')
    .doc(post.id)
    .set(post)




export const createPost = async (post) => await firebase.firestore()
    .collection('posts')
    .add({
        ...post,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        comments: [],
        likes: [],
        hearts: [],

    })

export const getPost = async (postId) => await firebase.firestore()
    .collection('posts')
    .where("uid", "==", postId)
    .get();

export const getPosts = async () => await firebase.firestore().collection('posts')
    .get();

export const streamPosts = async (observer) => await firebase.firestore().collection('posts')
    .onSnapshot(observer)

export const streamUserPosts = async (userId, observer) => await firebase.firestore().collection('posts')
    .where("userId", "==", userId)
    .onSnapshot(observer)

