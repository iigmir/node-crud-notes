const json_format = r => r.json();

const main = () => {
    const ajax = fetch("/api").then(json_format);
    ajax.then( res => {
        document.querySelector("h1").innerText = res.message;
    });
};

main();

const user_form = document.querySelector("form#user-form");
user_form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form_dom = event.target;
    const body = new FormData(form_dom);
    const ajax = fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": `${form_dom.enctype};charset=UTF-8`,
        },
        body: body
    }).then( json_format );
    ajax.then( res => {
        console.log(res);
    });
});
