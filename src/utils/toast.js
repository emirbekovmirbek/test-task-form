import M from "materialize-css/dist/js/materialize.min";

export const toast = (message) => {
    M.toast({html: message})
}