import * as yargs from 'yargs';
import * as fs from 'fs';
import * as chalk from 'chalk';
import { spawn } from 'child_process';

/**
 * Comando CountWordPipe.
 */
yargs.command({
  command: 'countWordPipe',
  describe: 'Cuenta las veces que se repite una palabra en un fichero (Usando Stream)',
  builder: {
    file: {
      describe: 'Nombre del fichero',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Palabra a contar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.word === 'string') {
      // Comprobamos el fichero dado se puede leer
      const archiveRoute:string = './src/Ejercicio2/' + argv.file;
      fs.access(`${archiveRoute}`, fs.constants.F_OK, (err) => {
        if (err) {
          console.log(chalk.blackBright.bold.bgRedBright('El fichero no existe.'));
        } else {
          console.log(chalk.blackBright.bold.bgGreenBright('El fichero existe.'));
          // Creamos los procesos Cat y Grep.
          const cat = spawn('cat', [`${archiveRoute}`]);
          const grep = spawn('grep', [`${argv.word}`]);
          let resultComands:string = '';
          // Procedemos a hacer la pipe entre cat y grep
          cat.stdout.pipe(grep.stdin);

          // Variable en la que guardaremos el resultado de Grep.
          grep.stdout.on('data', (element) => {
            resultComands += element;
          });

          // Una Vez finalice el proceso de los comandos y tengamos el resultado
          // procedemos a contar las veces que aparece la palabra.
          grep.on('close', () => {
            // Utilizamos una expresión regular para contar las veces que aparece la palabra.
            const Regex = RegExp(`${argv.word}`, 'gm');
            const concurrencias = resultComands.match(Regex);
            let resultado:number = 0;
            if (concurrencias) {
              resultado = concurrencias.length;
            }
            // Imprimimos el resultado.
            if (resultado === 0) {
              console.log(chalk.blackBright.bold.bgRedBright(`La palabra ${argv.word} no aparece en el fichero.`));
            } else {
              console.log(chalk.blackBright.bold.bgGreenBright(`La palabra ${argv.word} aparece ${resultado} veces.`));
            }
          });
        }
      });
    }
  },
});


yargs.parse();
