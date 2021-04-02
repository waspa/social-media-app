import {firebase, FieldValue} from '../lib/Firebase'

// All the collections are inside the firestore database

export async function doesUsernameExist(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()


    return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// Get user from the firestore where userId === userId (passed from the auth )
export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user
}   

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get()
    return result.docs
    .map((user) => ({ ...user.data(), docId: user.id}))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (ernesto's profile)
    profileId, // the user that ernesto requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
  ) {
    return firebase
      .firestore()
      .collection('users')
      .doc(loggedInUserDocId)
      .update({
        following: isFollowingProfile
          ? FieldValue.arrayRemove(profileId)
          : FieldValue.arrayUnion(profileId)
      });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (ernesto's profile)
    loggedInUserDocId, // the user that ernesto requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
  ) {
    return firebase
      .firestore()
      .collection('users')
      .doc(profileDocId)
      .update({
        followers: isFollowingProfile
        //fieldvalue is used with arrayremove and arrayunion
          ? FieldValue.arrayRemove(loggedInUserDocId)
          : FieldValue.arrayUnion(loggedInUserDocId)
      });
  }

  export async function getPhotos(userId, following) {
    // [5,4,2] => following. in this case I am following 2 so mikey
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)  //my userId is in following 
      .get();
  
    const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
  
    
    const photosWithUserDetails = await Promise.all(
      /* Promise.all([Promise1, Promise2, Promise3])
 .then(result) => {
   console.log(result)
 })
 .catch(error => console.log(`Error in promises ${error}`)) */

 //As you can see, we are passing an array to Promise.all. And when all three promises get resolved, Promise.all resolves and the output is consoled.


      userFollowedPhotos.map(async (photo) => { 
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) { //my userId
          userLikedPhoto = true;
        }
        // photo.userId = 2
        const user = await getUserByUserId(photo.userId);
        // mikey
        const { username } = user[0]; //user comes as an array. 
        return { username, ...photo, userLikedPhoto /* boolean */ }; //{...photo} spread all the data from photo
      })
    );
  
    return photosWithUserDetails;
  }

  export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', user.userId)
      .get();
  
    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
  }
 
  export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', loggedInUserUsername) // ernesto (active logged in user)
      .where('following', 'array-contains', profileUserId)
      .get();
  
    const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
  
    return response.userId;
  }
  
  export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
    // 1st param: ernesto's doc id
    // 2nd param: mikey's user id
    // 3rd param: is the user following this profile? e.g. does ernesto follow mikey? (true/false)
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  
    // 1st param: ernesto's user id
    // 2nd param: mikey's doc id
    // 3rd param: is the user following this profile? e.g. does ernesto follow mikey? (true/false)
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
  }