import chalk from "chalk"
import chokidar, {FSWatcher} from 'chokidar'
import WebSocket from 'ws'
import Config from "./lib/config"
import {IncomingMessage} from "node:http";
import { glob } from "glob";

class Server {
    config: Config = new Config()
    server: WebSocket.Server<typeof WebSocket.WebSocket, typeof IncomingMessage>|null = null
    pingTimeout: NodeJS.Timeout | null = null
    watcher: FSWatcher|null = null

    // Load handlers
    
    // Watch for file changes
    async start() {
        await this.startWebsocket()

        this.watcher = chokidar.watch(await glob(this.config.watchDirs), {
            ignored: /(?<!\.(?:js|html|css))$/,
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 500,
                pollInterval: 200,
            }
        })

        this.watcher
            .on('add', (path: string) => console.log(`File ${path} has been added`))
            .on('change', (path: string) => {
                console.log(chalk.blue(`File ${path} has been changed`))
            })
            .on('unlink', (path: string) => console.log(`File ${path} has been removed`))
            .on('ready', () => console.log(chalk.blueBright('Server is running!')))

        this.watcher.on('unlink', (filePath) => {
            // handle file deletion
            console.log(chalk.red(`File ${filePath} has been removed`))
        });
    }
    
    // Open WS connection for client js
    async startWebsocket() {
        this.server = new WebSocket.Server({
            port: parseInt(this.config.PORT as string),
            host: this.config.HOST
        })
    }

    async stop() {
        if(this.server) {
            this.server.close()
            console.log(chalk.yellow('🔌 WebSocket server stopped'));
        }
    }
    
    // Stream the changes to the user
    async websocketConnected() {
        if(!this.server) return

        this.server.on('connection', (socket) => {
            console.log(chalk.yellow('✅ A new client has connected'))
        })

        this.server.on('disconnect', (socket) => {
            console.log(chalk.yellow('A client has disconnected'))
        })

        this.server.on('error', (err) => {
            console.error(err)
        })

        this.server.on('message', (message) => {
            console.log('SERVER RECEIVED: ' + message)
        })
    }
}

const server = new Server()

process.on('SIGINT', async () => {
    console.log(chalk.yellow('\n🛑 Received SIGINT, shutting down...'))
    await server.stop()
    process.exit(0)
});

process.on('SIGTERM', async () => {
    console.log(chalk.yellow('\n🛑 Received SIGTERM, shutting down...'))
    await server.stop()
    process.exit(0)
});

server.start().catch(error => {
    console.error(chalk.red.bold('❌ Failed to start server:'), chalk.red(error.message));
    process.exit(1);
})