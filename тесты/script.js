const buttons = document.querySelectorAll('button');
const queue = [null, null, null];

async function getData(ms) {
    return new Promise((resolved) => {
        setTimeout(() => {
            resolved('я пидор');
        }, ms);
    }) 
};

const result = await getData(3000);

console.log(result);