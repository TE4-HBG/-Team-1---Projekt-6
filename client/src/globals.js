let _userId = null;
export default {
    set userId(value) {
        _userId = value;
        
    },
    get userId() {
        return _userId;
    }
}
