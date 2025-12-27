import { Router } from 'express';
import { createMaintenanceRequest } from '../controller/maintenance.controller.js';

const maintenanceRouter = Router();

maintenanceRouter.post('/', createMaintenanceRequest);

export default maintenanceRouter;