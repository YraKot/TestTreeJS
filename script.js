
const parentElement = document.querySelector('.wrp');

const it = window.TreeAPI.getData();

it.then(
     details => {
        const arr = details.data;

        const treeify = (arr) => {
            const tree = [];
            const lookup = {};
            arr.forEach((o) => {
                lookup[o.id] = o;
                lookup[o.id].children = [];
            });
            arr.forEach((o) => {
                if (o.parent !== null) {
                    lookup[o.parent].children.push(o);
                } else {
                    tree.push(o);
                }
            });
            return tree;
        };

        const arrF = treeify(arr);

        buildList(document.querySelector('.wrp'), arrF);

        function buildList(parentElement, items) {
            if (!items || !items.length) {
                return;
            }

            const list = document.createElement("ul");
            parentElement.appendChild(list);

            for (let i = 0; i < items.length; i++) {
                const p = document.createElement("p");
                p.classList.add('content');
                const li = document.createElement("li");
                p.textContent = items[i].id;
                buildList(li, items[i].children);
                li.prepend(p);
                list.appendChild(li);
            }
        }

        let el = document.querySelectorAll('.content');
        for (let i = 0; i < el.length; i++) {
            let randomColor = Math.random().toString(16).slice(2, 8);
            if (randomColor.toString() !== 'ffffff') {
                el[i].style.backgroundColor = '#' + randomColor;
            } else {
                el[i].style.backgroundColor = '#222';
            }
        }
    },
).catch(
    error => {
        const wrp = document.querySelector('.wrp');
        const msgEl = document.createElement('h2');
        msgEl.classList.add('error');
        wrp.appendChild(msgEl);
        msgEl.textContent = 'Something goes wrong';
        console.log(error);
    }
);



