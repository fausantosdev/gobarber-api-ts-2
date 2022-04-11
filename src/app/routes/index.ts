import { Router } from 'express';

const routes = Router();

import appointmentRoutes from './appointments.routes'

routes.use('/appointments', appointmentRoutes)

export default routes
