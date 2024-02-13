const tests = [
    {
        id:1,
        name:'test1',
        descripton:'D1',
    },
    {
        id:2,
        name:'test2',
        descripton:'D2',
    },
];

const getTests = (cb) =>{
    cb(tests);
};

const getTestById = (id,cb) => {
    const test = tests.find(test => test.id == id)
    cb(test);
};

exports.getTestById = getTestById;
exports.getTests = getTests;