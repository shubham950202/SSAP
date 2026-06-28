import RNFS from 'react-native-fs';

const DB_PATH =
  `${RNFS.DocumentDirectoryPath}/localdb.json`;

const initialDB = {
  users: [],
  products: [],
  orders: [],
  sessions: [],
};

export const getDB = async () => {
  const exists = await RNFS.exists(DB_PATH);

  if (!exists) {
    await RNFS.writeFile(
      DB_PATH,
      JSON.stringify(initialDB, null, 2),
      'utf8',
    );

    return initialDB;
  }

  const content = await RNFS.readFile(
    DB_PATH,
    'utf8',
  );

  return JSON.parse(content);
};

export const saveDB = async (db: any) => {
  await RNFS.writeFile(
    DB_PATH,
    JSON.stringify(db, null, 2),
    'utf8',
  );
};
