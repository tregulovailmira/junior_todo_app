import * as path from 'path';

export const editFileName = (req, file, callback) => {
  const {
    params: { todoId },
  } = req;
  const fileExtName = path.extname(file.originalname);
  callback(null, `todo${todoId}-${Date.now()}${fileExtName}`);
};
