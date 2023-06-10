import connection from './connection'
import { Companies } from "../../models/companies"


export function getCompanies(db = connection) {
    return db<Companies>('companies')
      .select()
      .then((companies) => {
        console.log('Companies:', companies);
        return companies;
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        throw error;
      });
  }
  


// add new widget 

// export async function addNewWidget(widget: Widget, db = connection) {
//   return db('widgets').insert(widget).returning('*')
// }