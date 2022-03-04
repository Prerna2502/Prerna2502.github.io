import React, { useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { getAuth } from "firebase/auth";
import {Loading, Header, Card, Player} from '../compoments';
import {FooterContainer} from './footer';
import * as ROUTES from '../constants/routes';
import logo from "../logo.png";


export function BrowseContainer({slides}){
    const [category, setCategory] = useState('series');
    const [ searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const {firebase} = useContext(FirebaseContext);
    const user = getAuth(firebase).currentUser || {};
    const [slideRows, setSlideRows] = useState([]);
    const [videolink, setVideoLink] = useState("https://www.youtube.com/");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    useEffect(() => {
        setSlideRows(slides[category]);
    },[slides, category]);

    useEffect(() => {
        const fuse = new Fuse(slideRows, {keys: ['data.description', 'data.title' , 'data.genre']});
        const results = fuse.search(searchTerm).map(({item}) => item);

        if(slideRows.length > 0 && searchTerm.length > 3 && results.length > 0){
            setSlideRows(results);
        } else{
            setSlideRows(slides[category]);
        }
    }, [searchTerm]);

    return profile.displayName ? (

        <>
        {loading ? (
            <Loading src={user.email=="guest@guest.com"?"1":user.photoURL} />
            ) : (
                <Loading.ReleaseBody/>
            )}
            <Header src="puspa">
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="IndianMovies" />
                    </Header.Group>
                    <Header.Group>
                        <Header.TextLink active={category === 'series' ? 'true': 'false'} onClick={() => setCategory('series')}>Series</Header.TextLink>
                        <Header.TextLink active={category === 'films' ? 'true': 'false'} onClick={() => setCategory('films')}>Films</Header.TextLink>
                        <Header.TextLink active={category === 'HindiMovies' ? 'true': 'false'} onClick={() => setCategory('HindiMovies')}>Hindi Movies</Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                        <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <Header.Profile>
                            <Header.Picture src={user.email=="guest@guest.com"?"1":user.photoURL}/>
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.email=="guest@guest.com"?"1":user.photoURL}/>
                                    <Header.TextLink>{user.email=="guest@guest.com"?"Guest":user.displayName}</Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.TextLink onClick = {() => getAuth(firebase).signOut()}>Sign out</Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                <Header.FeatureCallOut>Watch Puspa Now</Header.FeatureCallOut>
                <Header.Text>
                Story of Pushpa Raj, a lorry driver in Seshachalam forests of South India, set in the backdrop
                of red sandalwood smuggling. Red Sandalwood is endemic to South-Eastern Ghats (mountain range) of India.
                    </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>
            <Card.Group>
                {slideRows.map((slideItem) => (
                    <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                        <Card.Title>{slideItem.title}</Card.Title>
                        <Card.Entities>
                            {slideItem.data.map((item) => (
                                <Card.Item key={item.docId} item={item} setVideoLink={setVideoLink}>
                                    <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                                    <Card.Meta>
                                        <Card.SubTitle>{item.title}</Card.SubTitle>
                                        <Card.Text>{item.description}</Card.Text>
                                        {item.trailer
                                            ? <Card.Link source={item.trailer} target="_blank" rel="noreferrer noopener">Trailer</Card.Link>
                                            : null
                                        }
                                    </Card.Meta>
                                </Card.Item>
                            ))}
                        </Card.Entities>
                        <Card.Feature category={category}>
                            <Player>
                                <Player.ButtonLink source= {videolink} target="_blank" rel="noreferrer noopener"/>
                                <Player.Video src="/videos/bunny.mp4" />
                            </Player>
                        </Card.Feature>
                    </Card>
                ))}
            </Card.Group>
            <FooterContainer/>
            </>
    ) : user.email == "guest@guest.com"? setProfile({ displayName: "Guest", photoURL: "1" })
        :(
            <SelectProfileContainer user={user} setProfile={setProfile}/>
        );
    }