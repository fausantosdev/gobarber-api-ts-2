import { Router } from 'express';

const routes = Router();

import appointmentRoutes from './appointments.routes'
import userRoutes from './users.routes'

routes.use('/users', userRoutes)
routes.use('/appointments', appointmentRoutes)

export default routes
