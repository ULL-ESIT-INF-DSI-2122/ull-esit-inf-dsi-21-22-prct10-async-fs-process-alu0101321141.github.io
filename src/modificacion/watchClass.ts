import * as fs from 'fs';
import * as chalk from 'chalk';
import { spawn } from 'child_process';
import { exit } from 'process';

/**
 * Clase watch.
 */
export class WatchClass {
  /**
   * Constructor de la clase
   * @param archiveRoute ruta del archivo a comprobar.
   * @param readComand leer conando.
   */
  constructor(private archiveRoute: string, private readComand: string, private comandosOpcional: string[]) {
    if (!fs.existsSync(this.archiveRoute)) {
      console.log(chalk.blackBright.bold.bgRedBright('El fichero no existe.'));
      exit(1);
    }
  }

  /**
   * Comprueba si el archivo existe.
   */
  watchMethod() {
    console.log(chalk.blackBright.bold.bgGreenBright('El fichero existe.'));
    // Creamos el proceso watch
    fs.watch(`${this.archiveRoute}`, (eventType, filename) => {
      if (filename) {
        console.log(chalk.blackBright.bold.bgGreenBright('El fichero ha sido modificado.'));
        // Ejecutamos el comando
        const routecommand: string = './src/modificacion/';
        let comando:string = `${routecommand}`;
        if (this.comandosOpcional.length > 0) {
          this.comandosOpcional.forEach((element) => {
            comando += `'` + `${element}` + `'` + ',';
          });
        }
        const command = spawn(`${this.readComand}`, [`${comando}`]);
        let resultComands: string = '';
        command.stdout.on('data', (data) => {
          resultComands += data;
        });
        console.log(chalk.blackBright.bold.bgGreenBright(`Se ha modificado ${filename}`));
        console.log(chalk.blackBright.bold.bgGreenBright(`Se ha producido ${eventType}`));
        // Comprobamos y notificamos que tipo de evento se produjo.
        if (eventType.toString() == 'rename') {
          console.log(chalk.blackBright.bold.bgWhiteBright(`Se ha renombrado ${filename}`));
          exit(1);
        } else if (eventType.toString() == 'change') {
          console.log(chalk.blackBright.bold.bgWhiteBright(`Se ha modificado ${filename}`));
          command.on('close', () => {
            console.log(chalk.blackBright.bold.bgGreenBright(`Resultado del comando: `));
            console.log(chalk.blackBright.bold.bgBlueBright(`${resultComands}`));
          });
        }
      }
    });
  }
}
