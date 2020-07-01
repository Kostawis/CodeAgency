import Realm from 'realm';
export const ALL_DATA_SCHEMA = 'all_data';

export const AllData = {
  name: ALL_DATA_SCHEMA,
  primaryId: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    creationDate: 'date',
    type: {type: 'int', default: 1},
    size: {type: 'int', default: 1},
    color: {type: 'int', default: 1},
    private: {type: 'bool', default: false},
    allowShare: {type: 'bool', default: false},
    description: {type: 'string', default: 'Brak opisu...'},
  },
};

const databaseOptions = {
  path: 'form.realm',
  schema: [AllData],
  schemaVersion: 5,
};

export const insertNew = newFormObject =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(ALL_DATA_SCHEMA, newFormObject);
          resolve(newFormObject);
        });
      })
      .catch(err => reject(err));
  });

export const queryById = itemId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        const [currentItem] = [...realm.objects(ALL_DATA_SCHEMA)].filter(
          item => item.id === itemId,
        );
        resolve(currentItem);
      })
      .catch(err => reject(err));
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        resolve([...realm.objects(ALL_DATA_SCHEMA)]);
      })
      .catch(err => reject(err));
  });

export const deleteById = itemId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const [currentItem] = [...realm.objects(ALL_DATA_SCHEMA)].filter(
            item => item.id === itemId,
          );
          realm.delete(currentItem);
          resolve();
        });
      })
      .catch(err => reject(err));
  });

export const deleteAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let all = realm.objects(ALL_DATA_SCHEMA);
          realm.delete(all);
          resolve(console.log(all));
        });
      })
      .catch(err => reject(err));
  });

export default new Realm(databaseOptions);
