import { Router } from 'express'

import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes'
import userRoutes from '@modules/users/infra/http/routes/users.routes'
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes'

const routes = Router()

routes.use('/auth', sessionRoutes)
routes.use('/users', userRoutes)
routes.use('/appointments', appointmentRoutes)

export default routes
