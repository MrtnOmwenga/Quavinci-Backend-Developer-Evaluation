import app from './App';
import config from './utils/config';
import log from './utils/logger';

const start = async (): Promise<void> => {
  try {
    // Start app
    app.listen(config.PORT, () => {
      log.info(`Server started on port ${config.PORT}`);
    });
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

void start();