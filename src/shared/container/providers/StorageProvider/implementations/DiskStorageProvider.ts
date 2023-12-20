import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'

import { IStorageProvider, SaveFileTypes } from '../models/IStorageProvider'

class DiscStoreProvider implements IStorageProvider {
  public async saveFile ({ file, folder = 'uploads' }: SaveFileTypes): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, folder , file)
    )

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error){
      console.log(error)
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export default DiscStoreProvider
