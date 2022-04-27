import { WatchClass } from './watchClass';

const file:string = process.argv[2];
const readComand:string = process.argv[3];
let comandosOpcional:string[] = [];
if (process.argv.length > 4) {
  for (let i = 4; i < process.argv.length; i++) {
    comandosOpcional.push(process.argv[i]);
  }
}

const archiveRoute:string = './src/modificacion/' + file;

const watchFile: WatchClass = new WatchClass(archiveRoute, readComand, comandosOpcional);

watchFile.watchMethod();
