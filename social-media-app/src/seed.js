/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'kVfSE0EagUZw1D2H7kDujanVCvv1',
        username: 'ernesto',
        fullName: 'Ernesto Neyra',
        emailAddress: 'vastermalm89@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'mikey',
        fullName: 'Mikey Hughes',
        emailAddress: 'mikey@hughes.com',
        following: [],
        followers: ['kVfSE0EagUZw1D2H7kDujanVCvv1'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'jane',
        fullName: 'Jane Doe',
        emailAddress: 'jane@doe.com',
        following: [],
        followers: ['kVfSE0EagUZw1D2H7kDujanVCvv1'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'huskey',
        fullName: 'Huskey Range',
        emailAddress: 'huskey@range.com',
        following: [],
        followers: ['kVfSE0EagUZw1D2H7kDujanVCvv1'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/mikey/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'jane',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'huskey',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    // eslint-disable-next-line prefer-const
    /* for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '4',
          photoSrc: `/videos/users/jane/${i}.mp4`,
          caption: 'Carbonated Water',
          likes: [],
          comments: [
            {
              displayName: 'mikey',
              comment: 'Looks really tasty!'
            },
            {
              displayName: 'huskey',
              comment: 'Would you mind if I drink this?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    } */
  }
  