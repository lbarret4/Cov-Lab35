import * as baseService from './base';

function all() {
    return baseService.get('/api/tags');
}

function one(id) {
    return baseService.get(`/api/tags/${id}`);
}

function insert(data) {
    return baseService.post('/api/tags', data);
}

function update(id, data) {
    return baseService.put(`/api/tags/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/tags/${id}`);
}

export { all, one, insert, update, destroy };