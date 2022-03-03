import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { FaqsContainer } from "../containers/faqs";
import { FooterContainer } from "../containers/footer";
import { JumbotronContainer } from "../containers/jumbotron";
import {HeaderContainer} from "../containers/header";
import { Feature, OptForm } from "../compoments";
import * as ROUTES from '../constants/routes';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('guest@guest.com');
    const [password, setPassword] = useState('guestuser');
    const [error, setError] = useState('');

    const handleSignInAsAGuest = (event) =>{
        event.preventDefault();
        //firebase work here
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, emailAddress, password)
        .then(() => {
            history.push(ROUTES.BROWSE);
        })
        .catch((error) => {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        });
    }

    return (
        <>
            <HeaderContainer>
                <Feature>
                    <Feature.Title>
                        Unlimited films, TV programmes and more.
                    </Feature.Title>
                    <Feature.SubTitle>
                        Watch anywhere. Cancle at any time.
                    </Feature.SubTitle>
                    <OptForm>
                        {/* <OptForm.Input placeholder = "Email address" /> */}
                        <OptForm.Button onClick={handleSignInAsAGuest}>Try as a Guest</OptForm.Button>
                        <OptForm.Break />
                        <OptForm.Text>
                            Ready to watch? Enter your email to create or restart your membership
                        </OptForm.Text>
                    </OptForm>
                </Feature>
            </HeaderContainer>
            <JumbotronContainer/>
            <FaqsContainer/>
            <FooterContainer/>
        </>
    )
}