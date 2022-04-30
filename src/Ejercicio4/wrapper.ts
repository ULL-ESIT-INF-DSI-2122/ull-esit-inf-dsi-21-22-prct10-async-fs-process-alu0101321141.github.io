import chalk = require("chalk");
import * as fs from 'fs';

/**
 * clase Wrapper
 */
export class Wrapper {
  /**
   * Constructor de la clase.
   */
  constructor() {
  }
  /**
   * comprueba si una ruta es un directorio o un archivo
   * @param path ruta
   */
  dirOrFile(path: string) {
    fs.lstat(path, (err, stats) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`La ruta no existe.`));
      } else {
        if (stats.isDirectory()) {
          console.log(chalk.blackBright.bold.bgGreenBright(`La ruta existe y es un directorio.`));
        } else {
          console.log(chalk.blackBright.bold.bgBlueBright(`La ruta existe y es un archivo.`));
        }
      }
    });
  }

  /**
   * Crea un directorio en una ruta dada
   * @param path ruta a crear el directorio
   */
  createDir(path: string) {
    fs.mkdir(path, (err) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al crear el directorio:`));
        console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
      } else {
        console.log(chalk.blackBright.bold.bgGreenBright(`El directorio se ha creado correctamente.`));
      }
    });
  }

  /**
   * lista los ficheros de un directorio
   * @param path ruta a listar
   */
  listDir(path: string) {
    fs.readdir(path, (err, files) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al listar los ficheros:`));
        console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
      } else {
        console.log(chalk.blackBright.bold.bgGreenBright(`Listado de ficheros:`));
        files.forEach((file) => {
          console.log(chalk.blackBright.bold.bgMagentaBright(`${file}`));
        });
      }
    });
  }

  /**
   * muestra el contenido de un fichero
   * @param path ruta del fichero
   */
  readFile(path: string) {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al leer el fichero:`));
        console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
      } else {
        console.log(chalk.blackBright.bold.bgGreenBright(`Contenido del fichero:`));
        console.log(chalk.blackBright.bold.bgBlueBright(`${data}`));
      }
    });
  }

  /**
   * borra un directorio o un archivo
   * @param path ruta del directorio o archivo
   */
  deleteDirOrFile(path: string) {
    fs.rm(path, { recursive: true }, (err) => {
      if (err) {
        console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al borrar:`));
        console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
      } else {
        console.log(chalk.blackBright.bold.bgGreenBright(`Se ha borrado correctamente.`));
      }
    });
  }

  /**
   * mueve y copia los ficheros o directorios
   * @param path ruta actual
   * @param newPath ruta a copiar y mover.
   */
  moveAndCopy(path: string, newPath: string) {
    fs.stat(newPath, (err) => {
      if (err) console.log(chalk.blackBright.bold.bgRedBright(`La ruta destino no existe.`));
    });
    if (path === newPath) {
      console.log(chalk.blackBright.bold.bgRedBright(`Las rutas son iguales.`));
    } else {
      // comprobamos que la ruta origen existe y copiamos.
      fs.stat(path, (err, stats) => {
        if (err) {
          console.log(chalk.blackBright.bold.bgRedBright(`La ruta origen no existe.`));
        } else {
          // en caso de ser un directorio.
          if (stats.isDirectory()) {
            // creamos el directorio con el nombre.
            this.createDir(newPath + '/' + path.split('/').pop());
            // copiamos todo el contenido del directorio en el nuevo.
            fs.cp(path, newPath + '/' + path.split('/').pop(), { recursive: true }, (err) => {
              if (err) {
                console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al copiar:`));
                console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
              } else {
                console.log(chalk.blackBright.bold.bgGreenBright(`El fichero se ha copiado correctamente.`));
              }
            });
          // en caso de ser un fichero
          } else if (stats.isFile()) {
            // copiamos el fichero en el nuevo.
            fs.copyFile(path, newPath + '/' + path.split('/').pop(), (err) => {
              if (err) {
                console.log(chalk.blackBright.bold.bgRedBright(`Se ha producido un error al copiar:`));
                console.log(chalk.blackBright.bold.bgRedBright(`${err}`));
              } else {
                console.log(chalk.blackBright.bold.bgGreenBright(`El fichero se ha copiado correctamente.`));
              }
            });
          }
        }
      });
    }
  }
}
