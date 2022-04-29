import chalk = require("chalk");
import * as fs from 'fs';

/**
 * Watcher class
 */
export class Watcher {
  /**
   * constructor
   * @param path Ruta de la carpeta a vigilar
   * @param nameUser nombre del usuario
   */
  constructor(private path: string, private nameUser: string) {
  }
  /**
   * watch
   */
  watch() {
    // Comprobamos si existe el archivo.
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`La ruta del usuario ${this.nameUser} no existe.`));
      } else {
        console.log(chalk.blackBright.bold.bgGreenBright(`La ruta del usuario ${this.nameUser} existe.`));
        // Creamos el proceso watch
        fs.watch(`${this.path}`, (eventType, filename) => {
          if (eventType == 'rename') {
            console.log(chalk.blackBright.bold.bgWhiteBright(`Se ha renombrado ${filename}`));
          } else if (eventType == 'change') {
            console.log(chalk.blackBright.bold.bgWhiteBright(`Se ha modificado ${filename}`));
          }
        });
      }
    });
  }
}
