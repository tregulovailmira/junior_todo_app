import * as fs from 'fs';
import { promisify } from 'util';

export const deleteFileFromTemp = async (filePath) => {
  const unlinkPromisify = promisify(fs.unlink);
  await unlinkPromisify(filePath);
};
