module.exports = {
    port: process.env.PORT,//7545
    files: ['.src/**/*.{html,htm,css,js}'],
    server:{
        baseDir: ["./src", "./build/contracts"]
    }
};
