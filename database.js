import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);',
                [],
                () => {
                    console.log('Table created successfully');
                    resolve();
                },
                (error) => {
                    console.log('Error creating table:', error);
                    reject(error);
                }
            );
        });
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menuitems', [], (_, { rows }) => {
                if (rows._array) {
                    resolve(rows._array);
                } else {
                    resolve([]);
                };
            });
        });
    });
}

export function saveMenuItems(menuItems) {
  db.transaction(
    (tx) => {
      menuItems.forEach((item) => {
        const { name, price, description, image, category } = item;
        const query = 'INSERT INTO menuitems (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)';
        const values = [name, price, description, image, category];

        tx.executeSql(
          query,
          values,
          (_, { rowsAffected }) => {
            console.log('Menu item saved successfully');
          },
          (_, error) => {
            console.log('Error inserting menu item:', error);
          }
        );
      });
    },
    (error) => {
      console.log('Transaction error:', error);
    }
  );
}


