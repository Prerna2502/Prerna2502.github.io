import { useEffect, useState, useContext } from "react";
import {FirebaseContext} from '../context/firebase';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export default function useContent(target) {
    const [content, setContent] = useState([]);
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getDocuments = async () => {
            const db = getFirestore(firebase);
        
            const q = query(collection(db, target));
        
            await getDocs(q).then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id,
                }));
                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
          getDocuments()
    },[]);

    return { [target]: content};
}