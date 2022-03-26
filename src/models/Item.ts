/* eslint-disable no-useless-constructor */
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

class Item {
  constructor(
    readonly id: string,
    readonly imageUrls: string[],
    readonly name: string,
    readonly description: string,
    readonly price: number
  ) {}
}

export default Item;

export const itemConverter = {
  toFirestore(item: WithFieldValue<Item>): DocumentData {
    return {
      imageUrls: item.imageUrls,
      name: item.name,
      description: item.description,
      price: item.price,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Item {
    const data = snapshot.data(options);
    return new Item(
      snapshot.id,
      data.imageUrls,
      data.name,
      data.description,
      data.price
    );
  },
};
