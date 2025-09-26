import dotenv from "dotenv";
import path from "path";
dotenv.config();

class Config {
    PORT = process.env.PORT || 9270
    HOST = "localhost"

    watchDirs: string[] = [
        "./examples/**/*.*",
    ]

    excludedDirs: string[] = []
}

export default Config