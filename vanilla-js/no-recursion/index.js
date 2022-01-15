
getTree('main', (res) => {
  render(res.tree, document.body);
})

function getTree(sha, cb) {
  fetch(`https://api.github.com/repos/facebook/react/git/trees/${sha}`).then(res => res.json()).then(res => {
    cb(res)
  });
}

function render(arr, node) {
  var ul = document.createElement('ul');

  arr.forEach((item, i) => {
    var li = document.createElement('li');
    li.innerText = item.path;
    if (item.type === 'tree') {
        li.setAttribute('tree-sha', item.sha);
    }
    ul.appendChild(li);
  });

  node.appendChild(ul);
}

document.addEventListener('click', function(e) {
  if (e.target.getAttribute('tree-sha')) {
    getTree(e.target.getAttribute('tree-sha'), (res) => {
      render(res.tree, e.target);
    })
  }
});
