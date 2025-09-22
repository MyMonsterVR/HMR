import dotenv from "dotenv";
dotenv.config();

class Config {
    static PORT = process.env.PORT || 9270;
    static HOST = "localhost";

    static watchDirs: string[] = [
        "./examples/**/*.html",
        "./examples/**/*.js",
        "./examples/**/*.css",
    ]

    static excludedDirs: string[] = []
}