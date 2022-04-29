import * as yargs from 'yargs';
import { Watcher } from './watcher';

/**
 * Comando watch
 */
yargs.command({
  command: 'watch',
  describe: 'Vigila la carpeta de un usuario',
  builder: {
    path: {
      describe: 'Ruta de la carpeta a vigilar',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string') && (typeof argv.user === 'string')) {
      const watch = new Watcher(argv.path, argv.user);
      watch.watch();
    }
  },
});

yargs.parse();
