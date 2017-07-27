(function () {
    const headers = ['first_name', 'last_name', 'age', 'email', 'skill', 'city'],
        list = new Collection(users),
        items = list.getList(),
        table = document.getElementById('table'),
        tHead = table.querySelector('thead'),
        tBody = table.querySelector('tbody'),
        select = document.getElementById('field'),
        filter = document.getElementById('filter'),
        span = document.querySelector('span'),
        tHeadHTML = '<th>' + headers.join('</th><th>') + '</th>',
        sortedClass = 'sorted',
        options = '<option>' + headers.join('</option><option>') + '</option>';

    tHead.innerHTML = tHeadHTML.replace(/_/g, ' ');
    select.innerHTML = options.replace(/_/g, ' ');
    createTBody(items);

    tHead.addEventListener('click', headerClickHandler);
    filter.addEventListener('input', filterChangeHandler);
    select.addEventListener('change', selectHandler);

    function selectHandler () {
        filter.value = '';
        reset();
    }

    function filterChangeHandler (e) {
        const text = e.target.value;

        if (text.length < 2 || !text) {
            reset();
        }

        const filteredList = list.findByValue(select.value.replace(/\s/g, '_'), text);

        if (filteredList.length == 0) {
            tBody.hidden = true;
            span.classList.remove('result');
        } else {
            createTBody(filteredList);
            markColumn();
        }
    }

    function reset () {
        tBody.hidden = false;
        span.classList.add('result');
        createTBody(items);
    }

    function markColumn () {
        for (let i = 0; i < tBody.rows.length; i++) {
            let row = tBody.rows[i],
                index = select.selectedIndex;

            row.cells[index].classList = 'mark';
        }
    }

    function headerClickHandler (e) {
        let target = e.target,
            newItems = items;

        if (target.tagName == 'TH') {
            if (!target.classList.contains(sortedClass)) {
                const anotherSorted = table.querySelector('.' + sortedClass);

                newItems = list.sortBy( target.textContent.replace(/\s/g, '_') );

                if (anotherSorted) {
                    anotherSorted.classList.remove(sortedClass);
                }
            }

            createTBody(newItems);
            target.classList.toggle(sortedClass);
        }
    }

    function createTr (user) {
        return '<tr>' + headers.map( el => '<td>' + user[el] + '</td>').join('') + '</tr>';
    }

    function createTBody (array) {
        const tBodyHTML = array
                .slice(1)
                .reduce( (prev, next) => prev + createTr(next), createTr(array[0]) )
                .replace(/undefined/g, 'none');

        tBody.innerHTML = tBodyHTML;
    }
})();