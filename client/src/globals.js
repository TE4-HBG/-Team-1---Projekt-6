let _userId = null;
export default {
    set userId(value) {
        _userId = value;
        if (value != null)
            window.alert(`You are logged in! :D`);

    },
    get userId() {
        return _userId;
    }
}
