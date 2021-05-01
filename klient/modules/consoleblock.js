with ((console && console._commandLineAPI) || {}) {
    Object.getOwnPropertyNames(console).filter(function (property) {
        return typeof console[property] == 'function';
    }).forEach(function (verb) {
        console[verb] = function () { return 'nie grzeb tu plis :C'; };
    });
}