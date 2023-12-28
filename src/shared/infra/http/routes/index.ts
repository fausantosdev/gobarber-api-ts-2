import { Router } from 'express'

import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes'
import userRoutes from '@modules/users/infra/http/routes/users.routes'
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes'
import passwordRoutes from '@modules/users/infra/http/routes/password.routes'

const routes = Router()

routes.use('/auth', sessionRoutes)
routes.use('/users', userRoutes)
routes.use('/appointments', appointmentRoutes)
routes.use('/password', passwordRoutes)

export default routes
