import fs, { Utf8Stream } from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {
  static getTestDataFromJSON(filePath:string)
  {
    //using try-catch block to catch error if no file found
    try{
       const data= fs.readFileSync(filePath, 'utf8');
       return JSON.parse(data);
    } catch(error) {
      throw new Error(`Error reading or parsing JSON file: ${filePath}` + error);
    }
  }

  static getTestDataFromCSV(filePath:string)
  {
    try{
      const data= fs.readFileSync(filePath, 'utf8');
      const content=parse(data, {columns:true, skip_empty_lines:true});
      return content;
    } catch(error){
      throw new Error(`Error reading or parsing CSV file: ${filePath}` + error)
    };
  }
  }


