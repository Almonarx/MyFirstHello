function Collection (list) {
    if (!Array.isArray(list)) {
        throw 'You should pass an array!'
    }

    this.getList = function () {
        return list;
    }
}

Collection.checkFieldInCollection = function (array, field) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i][field]) {
            throw `Array doesn't have field ${field}`;
        } else {
            console.log(`Array has field ${field}`)
        }
    }
};

Collection.getCreator = function (value) {
    if (value instanceof Collection) {
        return 'Collection';
    } else {
        return 'Array';
    }
};

Collection.createCollection = function (users) {
    return new Collection(users);
};

Collection.prototype.getLength = function () {
    return this.getList().length;
};

Collection.prototype.getElementById = function (value) {
    let arr = this.getList();

    for (let i = 0; i < arr.length; i++ ) {
        if (arr[i].id == value) {
            return arr[i];
        }
    }
};

Collection.prototype.sortBy = function (field) {
    let arr = Array.prototype.slice.call( this.getList() );

    return arr.sort( (prev, next) => {
        if (prev[field] > next[field]) return 1;
        if (prev[field] < next[field]) return -1;
    });
};

Collection.prototype.filterBy = function () {
    let arr = this.getList(),
        list = arguments[0],
        filter = person => person[list] == arguments[1],
        reduce = (prev, obj) => {
            let key = Object.keys(obj)[0];

            return prev.filter( person => {
                return person[key] == obj[key];
            });
        };

    if (arguments.length == 2 && typeof (list) == 'string') {
        return arr.filter(filter);
    }

    if ( arguments.length == 1 && Array.isArray(list) ) {
        return list.reduce(reduce, arr);
    }

    if (arguments.length == 3) {
        let field = arguments[2];

        return arr
            .filter(filter)
            .sort((prev, next) => {
                if (prev[field] > next[field]) return 1;
                if (prev[field] < next[field]) return -1;
            });
    }

    if ( arguments.length == 2 && Array.isArray(list) ) {
        let field = arguments[1];

        return list
            .reduce(reduce, arr)
            .sort( (prev, next) => {
                if (prev[field] > next[field]) return 1;
                if (prev[field] < next[field]) return -1;
            });
    }

};

Collection.prototype.findByValue = function (field, string) {
    let arr = this.getList(),
        newCollection = [];

    if (string.length < 2) {
        throw 'The search string should have at least two characters';
    }

    for (let i = 0; i < arr.length; i++) {
        let userField = arr[i][field];

        if (!userField) {
            userField = 'none';
        }

        if ( userField.toString().includes(string) ) {
            newCollection.push(arr[i]);
        }
    }

    return newCollection;

};

Collection.prototype.deepClone = function () {
    let arr = this.getList(),
        newCollection = [];

    for (let i = 0; i < arr.length; i++) {
        newCollection[i] = Object.assign({}, arr[i]);
    }

    return newCollection;
};