const json_format = r => r.json();

const main = () => {
    const ajax = fetch("/api").then(json_format);
    const users = fetch("/api/users").then(json_format);
    ajax.then( res => {
        document.querySelector("#main-title").innerText = res.message;
    });
    users.then( (res = [{ gender: "", name: "", birthdate: "" }]) => {
        const list_items = (their) => {
            const birthdate = new Date(their.birthdate);
            return `<li>${their.name} (${their.gender}), born in ${birthdate.getFullYear()}.</li>`
        };
        document.querySelector("#user-list").innerHTML = res.map( list_items ).join( "" );
    });
};

main();

const user_form = document.querySelector("form#user-form");
user_form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form_dom = event.target;
    const form_body = new URLSearchParams(new FormData(form_dom));
    const ajax = fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`,
        },
        body: form_body.toString()
    }).then( json_format );
    ajax.then( res => {
        document.querySelector("#response-status").innerText = res.message;
        window.setTimeout( () => {
            document.querySelector("#response-status").innerText = "";
        }, 5000);
    });
});
