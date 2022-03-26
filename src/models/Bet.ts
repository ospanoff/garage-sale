/* eslint-disable no-useless-constructor */
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

class Bet {
  constructor(
    readonly email: string,
    readonly amount: number,
    readonly avatarUrl?: string
  ) {}
}

export default Bet;

export const betConverter = {
  toFirestore(): DocumentData {
    throw new Error("Not implemented");
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Bet {
    const data = snapshot.data(options);
    return new Bet(snapshot.id, data.amount, data.avatarUrl);
  },
};
