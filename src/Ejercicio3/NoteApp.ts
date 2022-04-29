import * as yargs from 'yargs';
import { GestorNotas } from './GestorNotas';
import { Notas } from './Notas';

/**
 * Comando add
 */
yargs.command({
  command: 'add',
  describe: 'Añade una nota nueva',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string') && (typeof argv.body === 'string') &&
      (typeof argv.color === 'string') ) {
      const newNote = new Notas(argv.title, argv.body, argv.color);
      const gestor = new GestorNotas();
      gestor.addNotes(argv.user, newNote);
    }
  },
});

/**
 * comando modify
 */
yargs.command({
  command: 'modify',
  describe: 'Modifica una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string') && (typeof argv.body === 'string') &&
      (typeof argv.color === 'string')) {
      const newNote = new Notas(argv.title, argv.body, argv.color);
      const gestor = new GestorNotas();
      gestor.modifyNote(argv.user, newNote);
    }
  },
});

/**
 * comando delete
 */
yargs.command({
  command: 'delete',
  describe: 'Elimina una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      const gestor = new GestorNotas();
      gestor.deleteNote(argv.user, argv.title);
    }
  },
});

/**
 * comando list
 */
yargs.command({
  command: 'list',
  describe: 'Muestra titulos de las notas',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string')) {
      const gestor = new GestorNotas();
      gestor.listTitles(argv.user);
    }
  },
});

/**
 * comando litNote
 */
yargs.command({
  command: 'listNote',
  describe: 'Muestra una nota que existia antes',
  builder: {
    user: {
      describe: 'name User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user === 'string') && (typeof argv.title === 'string')) {
      const gestor = new GestorNotas();
      gestor.listNote(argv.user, argv.title);
    }
  },
});


yargs.parse();
