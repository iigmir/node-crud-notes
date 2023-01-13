const json_format = r => r.json();

const main = () => {
    const ajax = fetch("/api").then(json_format);
    ajax.then( res => {
        document.querySelector("h1").innerText = res.message;
    });
};

main();

const form = document.querySelector("form#user-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const body = new FormData(event.target);
    const ajax = fetch("/api/users", {
        method: "POST",
        body: body
    }).then( json_format );
    ajax.then( res => {
        console.log(res);
    });
});
