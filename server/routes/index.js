import router from 'express';

import api from './api';

const PrimaryRoutes = router.Router();

PrimaryRoutes.use('/api', api);

PrimaryRoutes.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

export default PrimaryRoutes;
