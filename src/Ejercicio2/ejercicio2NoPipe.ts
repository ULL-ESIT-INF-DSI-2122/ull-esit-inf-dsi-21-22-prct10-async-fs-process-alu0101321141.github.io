import * as yargs from 'yargs';
import * as fs from 'fs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

/**
 * Comando CountWordStream.
 */
yargs.command({
  command: 'countNoPipe',
  describe: 'Cuenta las veces que se repite una palabra en un fichero Sin uso de pipe',
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
      const archiveRoute: string = './src/Ejercicio2/' + argv.file;
      fs.access(`${archiveRoute}`, fs.constants.F_OK, (err) => {
        if (err) {
          console.log(chalk.blackBright.bold.bgRedBright('El fichero no existe.'));
        } else {
          console.log(chalk.blackBright.bold.bgGreenBright('El fichero existe.'));
          // Creamos el proceso Grep. y a diferencia del anterior en vez de hacer una pipe
          // con el comando cat le damos la ruta del fichero.
          const cat = spawn('cat', [`${archiveRoute}`]);
          const grep = spawn('grep', [`${argv.word}`]);
          let resultComands: string = '';
          // Procedemos a enviarle la indormación del cat al proceso grep
          cat.stdout.on('data', (element) => {
            grep.stdin.write(element);
          });
          // Una vez se termine el proceso cat finalizamos el envio a grep.
          cat.stdout.on('end', () => {
            grep.stdin.end();
          });
          // Guerdamos el resutado del comando grep.
          grep.stdout.on('data', (element) => {
            resultComands += element;
          });
          grep.on('close', () => {
            // Utilizamos una expresión regular para contar las veces que aparece la palabra.
            const Regex = RegExp(`${argv.word}`, 'gm');
            const concurrencias = resultComands.match(Regex);
            let resultado: number = 0;
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
