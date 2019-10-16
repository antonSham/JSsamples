function onLoad() {
  fetch("/api/users")
    .then(res => res.json())
    .then(users => {
      const node = document
        .getElementById("users")
        .getElementsByTagName("tbody")[0];

      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      users.forEach(user => {
        const tableRow = document.createElement("tr");

        const tableDataName = document.createElement("td");
        tableDataName.appendChild(document.createTextNode(user.name));

        const tableDataAge = document.createElement("td");
        tableDataAge.appendChild(document.createTextNode(user.age));

        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataAge);

        node.appendChild(tableRow);
      });
    });
}

function onSend(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = +document.getElementById("age").value;

  fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age })
  }).then(res => {
    res.json().then(data => {
      if (res.status === 200) {
        alert("Success!");
      } else {
        alert(data.error);
      }
    });

    onLoad();
  });
}
