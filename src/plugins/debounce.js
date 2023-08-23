export function debounce(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

const DebouncePlugin = {
    install(app) {
        app.config.globalProperties.$debounce = debounce;
    }
};

export default DebouncePlugin;