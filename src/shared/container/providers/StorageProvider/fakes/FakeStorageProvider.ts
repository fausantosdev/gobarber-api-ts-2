import { IStorageProvider, SaveFileTypes } from '../models/IStorageProvider'

class FakeStoreProvider implements IStorageProvider {
  private storage: SaveFileTypes[] = []

  public async saveFile ({ file, folder }: SaveFileTypes): Promise<string> {
    this.storage.push({ file, folder })

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    const findIndex = this.storage.findIndex(storageFile => storageFile.file === file)

    this.storage.splice(findIndex, 1)
  }
}

export default FakeStoreProvider
