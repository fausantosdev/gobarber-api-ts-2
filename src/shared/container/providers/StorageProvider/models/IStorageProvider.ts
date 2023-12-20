export type SaveFileTypes = {
  file: string
  folder?: string
}

export interface IStorageProvider {
  saveFile({}: SaveFileTypes): Promise<string>
  deleteFile(file: string): Promise<void>
}
