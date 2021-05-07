import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { logOut } from "../../helpers/firebase";
import { UserContext } from '../../providers/UserProvider';
import './User.scss';

const User = () => {
    const history = useHistory();
    const user = useContext(UserContext);
	const [displayName, setDisplayName] = useState("anon");
	const [displayEmail, setDisplayEmail] = useState("");
	const [photoURL, setPhotoURL] = useState("https://img.icons8.com/ios/30/000000/user-male-circle.png");

    useEffect(() => {
        console.log(`USER\n is user === null? ${user === null}\n user: ${JSON.stringify(user)}\n`);
        if (user === null) {
            console.log(`USER\n loggedOut true. Now send to /login.\n user: ${JSON.stringify(user)}\n`);
            history.push('/');
        }
        else {
            console.log(`INTRO\n loggedOut true. Now send to /login.\n user: ${JSON.stringify(user)}\n`);
            if(!user.isAnonymous){
                setDisplayName(user.displayName);
                setDisplayEmail(user.email);
                setPhotoURL(user.photoURL);
            }
        }
    }, [user]);

    return (
        <div className="user_wrapper">
            <div className="user">
                <div className="user_head">
                    <img className="user_img" src={photoURL} alt="myFace"/>
                    <h2 className="user_name" >{displayName}</h2>
                    {displayEmail !== null && <h3 className="user_email" >{displayEmail}</h3>}
                    <button className="user_logout_button" onClick={logOut}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default User;