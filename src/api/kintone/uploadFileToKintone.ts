import {KintoneClient} from './config';


export const uploadFileToKintone = async (documents :
{
  fileBase64: string,
  filename: string,
}[]) => {
  const uploadPromises = documents.map(async (d) => {
    const {fileBase64, filename} = d;
    const data = Buffer.from(fileBase64, 'base64');
    const {fileKey} = await KintoneClient.file.uploadFile({
      file: {
        name: filename + '.pdf',
        data,
      },
    });
    return fileKey;
  });

  return await Promise.all(uploadPromises);
};
