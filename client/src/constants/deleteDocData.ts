import { deleteDoc, doc } from "@react-native-firebase/firestore";
import { db } from "../../firebase.config";

export const deleteDocData = async ({
    nameCollect,
    id
}: {
    nameCollect: string,
    id: string
}) => await deleteDoc(doc(db, nameCollect, id))