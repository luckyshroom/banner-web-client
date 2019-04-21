import * as moment from "moment";
import "moment/locale/ru";

export function distinct(value, index, self) {
    return self.indexOf(value) === index;
}

export function formatDate(timestamp) {
    return moment(timestamp).format("DD MMM YYYY")
}

export function formatDateTime(timestamp) {
    return moment(timestamp).local().format("DD MMM YYYY HH:MM")
}

export function fromNow(timestamp) {
    return moment(timestamp).fromNow()
}
