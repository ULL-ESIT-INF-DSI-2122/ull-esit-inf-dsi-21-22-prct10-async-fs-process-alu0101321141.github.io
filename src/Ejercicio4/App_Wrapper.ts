import * as yargs from 'yargs';
import {Wrapper} from './wrapper';

/**
 * Instancia de la clase Wrapper
 */
const wrapper = new Wrapper();

/**
 * Comando fileordir
 */
yargs.command({
  command: 'fileordir',
  describe: 'Comprueba si una ruta es un directorio o un archivo',
  builder: {
    path: {
      describe: 'Ruta a comprobar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.dirOrFile(argv.path);
    }
  },
});


/**
 * Comando createdir
 */
yargs.command({
  command: 'createdir',
  describe: 'Crea un directorio en una ruta dada',
  builder: {
    path: {
      describe: 'Ruta a crear la carpeta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.createDir(argv.path);
    }
  },
});

/**
 * Comando createdir spawn
 */
yargs.command({
  command: 'createdir2',
  describe: 'Crea un directorio en una ruta dada',
  builder: {
    path: {
      describe: 'Ruta a crear la carpeta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.createDirSpawn(argv.path);
    }
  },
});

/**
 * Comando listdir
 */
yargs.command({
  command: 'listdir',
  describe: 'Lista los ficheros de un directorio',
  builder: {
    path: {
      describe: 'Ruta a listar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.listDir(argv.path);
    }
  },
});

/**
 * Comando listdir
 */
yargs.command({
  command: 'listdir2',
  describe: 'Lista los ficheros de un directorio',
  builder: {
    path: {
      describe: 'Ruta a listar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.listDirSpawn(argv.path);
    }
  },
});

/**
 * Comando readfile
 */
yargs.command({
  command: 'readfile',
  describe: 'muestra el contenido de un fichero',
  builder: {
    path: {
      describe: 'Ruta fichero a mostrar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.readFile(argv.path);
    }
  },
});

/**
 * Comando readfile
 */
yargs.command({
  command: 'readfile2',
  describe: 'muestra el contenido de un fichero',
  builder: {
    path: {
      describe: 'Ruta fichero a mostrar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.readFileSpawn(argv.path);
    }
  },
});

/**
 * Comando delete dir or file
 */
yargs.command({
  command: 'deletedirorfile',
  describe: 'borra un fichero o un directorio',
  builder: {
    path: {
      describe: 'Ruta fichero a mostrar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.deleteDirOrFile(argv.path);
    }
  },
});

/**
 * Comando delete dir or file
 */
yargs.command({
  command: 'deletedirorfile2',
  describe: 'borra un fichero o un directorio',
  builder: {
    path: {
      describe: 'Ruta fichero a mostrar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string')) {
      wrapper.deleteDirOrFileSpawn(argv.path);
    }
  },
});

/**
 * move and copy
 */
yargs.command({
  command: 'mvcp',
  describe: 'mueve y copia un fichero o un directorio',
  builder: {
    path: {
      describe: 'Ruta fichero o directorio original',
      demandOption: true,
      type: 'string',
    },
    newpath: {
      describe: 'Ruta fichero o directorio nueva',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.path === 'string') && (typeof argv.newpath === 'string')) {
      wrapper.moveAndCopy(argv.path, argv.newpath);
    }
  },
});

yargs.parse();
