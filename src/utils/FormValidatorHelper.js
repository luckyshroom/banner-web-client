
export function setStatus(ref) {
    let message = ref.lastElementChild;

    const danger = () => {
        message.classList.add("is-danger");
        message.classList.remove("is-success");
        message.classList.remove("is-hidden");
    };

    const success = () => {
        message.classList.add("is-hidden");
        message.classList.remove("is-danger");
    };

    return {danger, success}
}
