import { doc, onSnapshot } from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';
import { db } from '../../firebase.config';

export const onSnapshotDataID = async ({
  nameCollect,
  setData,
  id,
}: {
  nameCollect: string;
  setData: SetStateAction<any>;
  id: string;
}) => {
  await onSnapshot(doc(db, nameCollect, id), docSnap => {
    if (docSnap.exists()) {
      setData({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log('Document does not exist!');
    }
  });
};
