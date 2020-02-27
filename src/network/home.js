import {request} from 'network/request'

export function homeMultiData() {
    return request({
        url: '/home/multidata'
    })
}

export function homeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}