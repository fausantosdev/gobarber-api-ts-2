import { Router } from 'express';

const routes = Router();

import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes'
import userRoutes from '@modules/users/infra/http/routes/users.routes'
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes'

routes.use('/auth', sessionRoutes)
routes.use('/users', userRoutes)
routes.use('/appointments', appointmentRoutes)

export default routes
