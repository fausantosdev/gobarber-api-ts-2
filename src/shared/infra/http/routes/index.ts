import { Router } from 'express';

const routes = Router();

import sessionRoutes from './sessions.routes'
import appointmentRoutes from './appointments.routes'
import userRoutes from './users.routes'

routes.use('/auth', sessionRoutes)
routes.use('/users', userRoutes)
routes.use('/appointments', appointmentRoutes)

export default routes
