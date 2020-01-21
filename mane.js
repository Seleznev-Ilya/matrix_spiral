let wrapping = () => {
    let arr, mas = [];

    function ask() {
        arr = prompt('Hey there!\nWrite down numbers for\nCells and Rows',);
        arr = arr.trim();
        if (!confirm("Are these numbers correct? :)\n" + `${arr}`)) {
            ask();
        } else {
            if (/\d,\s\d+$/.test(arr)
                || /\d\s\d+$/.test(arr)
                || /\d,\d+$/.test(arr)
                || /\d,\s\d+$/.test(arr)
                || /\d\s\d+$/.test(arr)
                || /\d,\d+$/.test(arr)) {
                alert(`Your numbers are:\n${arr}\nso Go!`);
            } else {
                alert('You write down else and string symbols\neither nothing or only one number.\nPlease enter only number symbols.\nThank you :)');
                ask();
            }
        }
        arr += ' ';
        search(mas);
    }

    ask();

    function search(a) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === ',' && arr[i + 1] === ' ') {
                a.push(arr.slice(0, i));
                for (let j = i + 2; j < arr.length; j++) {
                    if (arr[j] === ' ' || arr[j] === ',') {
                        a.push(arr.slice((i + 1), j));
                        break;
                    }
                }
            } else if (arr[i] === ',' || arr[i] === ' ') {
                a.push(arr.slice(0, i));
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[j] === ' ' || arr[j] === ',') {
                        a.push(arr.slice((i + 1), j));
                        break;
                    }
                }
            }
        }
        a.length = 2;
        return a;
    }

    let cell = +mas[0], row = +mas[1],
        parentHTML = document.querySelector('#parentTable');

    function createTable(parent, cells, rows) {

        let table = document.createElement('table');
        for (let i = 0; i < rows; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < cells; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        parent.appendChild(table);
        insertNumbers();
    }

    createTable(parentHTML, cell, row);

    function insertNumbers() {
        let tr = document.getElementsByTagName('tr');
        let lastTr = row - 1, lastTd = cell - 1;
        let r = 0, c = 0;
        let set = 1;
        otsudava:
        while (r <= lastTr && c <= lastTd) {

            // TOP ++>
            for (let i = c; i <= lastTd; i++) {
                if(set > cell * row) break otsudava;
                let td = tr[r].getElementsByTagName('td');
                td[i].textContent = set;
                set++;
            }
            r++;
            // RIGHT ++∨
            for (let i = r; i <= lastTr; i++) {
                if(set > cell * row) break otsudava;
                let td = tr[i].getElementsByTagName('td');
                td[lastTd].textContent = set;
                set++;
            }
            lastTd--;

            if (r <= lastTr) {
                // BOTTOM <--
                for (let i = lastTd; i >= c; i--) {
                    if(set > cell * row) break otsudava;
                    let td = tr[lastTr].getElementsByTagName('td');
                    td[i].textContent = set;
                    set++;
                }
                lastTr--;
                // LEFT ∧--
                for (let i = lastTr; i >= r; i--) {
                    if(set > cell * row) break otsudava;
                    let td = tr[i].getElementsByTagName('td');
                    td[c].textContent = set;
                    set++;
                }
                c++;
            }

        }

    }

};
wrapping();
