import { container } from 'tsyringe'

import IStorageProvider from './models/IStorageProvider'
import DiscStoreProvider from './implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StoragePovider',
  DiscStoreProvider
)
