module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
};
