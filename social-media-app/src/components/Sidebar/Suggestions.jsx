import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../services/firebase'
import SuggestedProfiles from './SuggestedProfiles'
import {Col} from 'react-bootstrap'

export default function Suggestions({userId, following, loggedInUserDocId}) {

    const [profiles, setProfiles] = useState(null)
    

    // goa ahead and get the suggested profiles 
    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response)
            
     
        }
      
        if (userId) {
            suggestedProfiles();
        }
        
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    // hint: use the firebase service
    /// getSuggestedProfiles
    // cal the async funtion ^^^^ within useEffect
    // store it in state
    // go ahead and render (wait on the profiles as in 'Skeleton')

    return !profiles ? (
        <Skeleton count={1} height={150} classname="mt-5"/> 
    ) : profiles.length > 0 ? (
        <Col className="rounded d-grid col justify-content-center">
        <div className="">
            <p classnam="">Suggested friends</p>
        </div>
        <div className="mt-5">
            {profiles.map((profile) => (
                <SuggestedProfiles 
                    key={profile.docId}
                    profileDocId={profile.docId}
                    username={profile.username}
                    profileId={profile.userId}
                    userId={userId}
                    loggedInUserDocId={loggedInUserDocId}
                />
            ))}
        </div>
        </Col>
    ) : null;
    
}
Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
    
  }; 