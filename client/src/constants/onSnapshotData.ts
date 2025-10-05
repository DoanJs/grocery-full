import {
  collection,
  onSnapshot,
  query,
} from '@react-native-firebase/firestore';
import { SetStateAction } from 'react';
import { db } from '../../firebase.config';

export const onSnapshotData = async ({
  nameCollect,
  conditions,
  setData,
}: {
  nameCollect: string;
  setData: SetStateAction<any>;
  conditions?: any;
}) => {
  const q = conditions
    ? query(collection(db, nameCollect), ...conditions)
    : query(collection(db, nameCollect));

  await onSnapshot(q, doc => {
    if (doc.empty) {
      setData([]);
    } else {
      const items: any = [];

      doc.forEach((item: any) => {
        items.push({
          id: item.id,
          ...item.data(),
        });
      });

      setData(items);
    }
  }, error => console.log('onSnapshot error: ', error));
};
