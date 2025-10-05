import { addDoc, collection } from "@react-native-firebase/firestore";
import { db } from "../../firebase.config";

export const addDocData = async ({
    nameCollect,
    value
}: {
    nameCollect: string,
    value: any
}) =>
    await addDoc(collection(db, nameCollect), value)
